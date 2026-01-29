// Smart Clip Panel - Save page knowledge with AI summary
import { MenuConfig, SmartClip, Message } from '../types';
import { callAI, OnChunkCallback } from '../utils/ai';
import { icons } from '../icons';

const CLIPS_STORAGE_KEY = 'thecircle_smart_clips';

export class SmartClipPanel {
  private container: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private config: MenuConfig;
  private currentClip: Partial<SmartClip> = {};
  private isGenerating = false;

  constructor(config: MenuConfig) {
    this.config = config;
  }

  public async show(): Promise<void> {
    await this.initializeClip();
    this.render();
    this.generateAISummary();
  }

  public hide(): void {
    if (this.container) {
      this.container.classList.add('thecircle-clip-panel-exit');
      setTimeout(() => {
        this.container?.remove();
        this.container = null;
        this.shadowRoot = null;
      }, 200);
    }
  }

  private async initializeClip(): Promise<void> {
    // Capture screenshot
    let screenshot: string | undefined;
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'CAPTURE_VISIBLE_TAB',
      } as Message);
      if (response?.success && response.dataUrl) {
        screenshot = response.dataUrl;
      }
    } catch {
      // Screenshot failed, continue without it
    }

    this.currentClip = {
      id: this.generateId(),
      url: window.location.href,
      title: document.title,
      content: document.body.innerText.slice(0, 15000),
      screenshot,
      createdAt: Date.now(),
      summary: '',
      keyPoints: [],
      userNote: '',
    };
  }

  private render(): void {
    this.container = document.createElement('div');
    this.container.id = 'thecircle-clip-container';
    this.shadowRoot = this.container.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'thecircle-clip-panel';
    panel.innerHTML = this.getPanelHTML();
    this.shadowRoot.appendChild(panel);

    document.body.appendChild(this.container);
    this.bindEvents();
  }

  private getPanelHTML(): string {
    return `
      <div class="thecircle-clip-header">
        <div class="thecircle-clip-title">
          <span class="thecircle-clip-icon">${icons.bookmark}</span>
          <span>智能剪藏</span>
        </div>
        <button class="thecircle-clip-close" title="关闭">
          ${icons.x}
        </button>
      </div>
      <div class="thecircle-clip-content">
        ${this.currentClip.screenshot ? `
          <div class="thecircle-clip-preview">
            <img src="${this.currentClip.screenshot}" alt="Page preview" />
          </div>
        ` : ''}
        <div class="thecircle-clip-info">
          <div class="thecircle-clip-page-title">${this.escapeHtml(this.currentClip.title || '')}</div>
          <div class="thecircle-clip-url">${this.escapeHtml(this.currentClip.url || '')}</div>
        </div>
        <div class="thecircle-clip-section">
          <div class="thecircle-clip-section-title">AI 摘要</div>
          <div class="thecircle-clip-summary">
            <div class="thecircle-clip-loading">
              <div class="thecircle-clip-spinner"></div>
              <span>正在生成摘要...</span>
            </div>
          </div>
        </div>
        <div class="thecircle-clip-section">
          <div class="thecircle-clip-section-title">核心观点</div>
          <div class="thecircle-clip-keypoints">
            <div class="thecircle-clip-loading">
              <div class="thecircle-clip-spinner"></div>
              <span>正在提取...</span>
            </div>
          </div>
        </div>
        <div class="thecircle-clip-section">
          <div class="thecircle-clip-section-title">我的备注</div>
          <textarea
            class="thecircle-clip-note"
            placeholder="添加你的备注..."
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="thecircle-clip-actions">
        <button class="thecircle-clip-btn thecircle-clip-btn-secondary thecircle-clip-view-all">
          查看全部剪藏
        </button>
        <button class="thecircle-clip-btn thecircle-clip-btn-primary thecircle-clip-save">
          保存剪藏
        </button>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    const closeBtn = this.shadowRoot.querySelector('.thecircle-clip-close');
    const saveBtn = this.shadowRoot.querySelector('.thecircle-clip-save');
    const viewAllBtn = this.shadowRoot.querySelector('.thecircle-clip-view-all');
    const noteInput = this.shadowRoot.querySelector('.thecircle-clip-note') as HTMLTextAreaElement;

    closeBtn?.addEventListener('click', () => this.hide());
    saveBtn?.addEventListener('click', () => this.saveClip());
    viewAllBtn?.addEventListener('click', () => this.showAllClips());

    noteInput?.addEventListener('input', () => {
      this.currentClip.userNote = noteInput.value;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
  }

  private async generateAISummary(): Promise<void> {
    if (!this.shadowRoot || this.isGenerating) return;

    this.isGenerating = true;

    const systemPrompt = `You are a content summarization expert. Analyze the webpage content and provide:
1. A concise summary (2-3 sentences)
2. 3-5 key points as bullet points

Format your response exactly like this:
SUMMARY:
[Your summary here]

KEY POINTS:
- [Point 1]
- [Point 2]
- [Point 3]

Use the same language as the content.`;

    const prompt = `Title: ${this.currentClip.title}\nURL: ${this.currentClip.url}\n\nContent:\n${this.currentClip.content?.slice(0, 8000)}`;

    try {
      let fullText = '';
      const onChunk: OnChunkCallback = (chunk, text) => {
        fullText = text;
        this.updateSummaryPreview(text);
      };

      const response = await callAI(prompt, systemPrompt, this.config, onChunk);

      if (response.success && response.result) {
        this.parseAIResponse(response.result);
      } else {
        this.showError(response.error || 'AI 请求失败');
      }
    } catch (error) {
      this.showError(`生成失败: ${error}`);
    } finally {
      this.isGenerating = false;
    }
  }

  private updateSummaryPreview(text: string): void {
    if (!this.shadowRoot) return;

    const summaryEl = this.shadowRoot.querySelector('.thecircle-clip-summary');
    const keypointsEl = this.shadowRoot.querySelector('.thecircle-clip-keypoints');

    if (summaryEl) {
      // Extract summary part
      const summaryMatch = text.match(/SUMMARY:\s*([\s\S]*?)(?=KEY POINTS:|$)/i);
      if (summaryMatch) {
        summaryEl.innerHTML = `<div class="thecircle-clip-text">${this.escapeHtml(summaryMatch[1].trim())}</div>`;
      } else {
        summaryEl.innerHTML = `<div class="thecircle-clip-text">${this.escapeHtml(text)}</div>`;
      }
    }

    if (keypointsEl) {
      // Extract key points
      const keypointsMatch = text.match(/KEY POINTS:\s*([\s\S]*?)$/i);
      if (keypointsMatch) {
        const points = keypointsMatch[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().slice(1).trim());

        if (points.length > 0) {
          keypointsEl.innerHTML = `
            <ul class="thecircle-clip-points-list">
              ${points.map(p => `<li>${this.escapeHtml(p)}</li>`).join('')}
            </ul>
          `;
        }
      }
    }
  }

  private parseAIResponse(text: string): void {
    // Extract summary
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]*?)(?=KEY POINTS:|$)/i);
    if (summaryMatch) {
      this.currentClip.summary = summaryMatch[1].trim();
    }

    // Extract key points
    const keypointsMatch = text.match(/KEY POINTS:\s*([\s\S]*?)$/i);
    if (keypointsMatch) {
      this.currentClip.keyPoints = keypointsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().slice(1).trim());
    }

    this.updateSummaryPreview(text);
  }

  private showError(message: string): void {
    if (!this.shadowRoot) return;

    const summaryEl = this.shadowRoot.querySelector('.thecircle-clip-summary');
    const keypointsEl = this.shadowRoot.querySelector('.thecircle-clip-keypoints');

    if (summaryEl) {
      summaryEl.innerHTML = `<div class="thecircle-clip-error">${this.escapeHtml(message)}</div>`;
    }
    if (keypointsEl) {
      keypointsEl.innerHTML = `<div class="thecircle-clip-error">无法提取</div>`;
    }
  }

  private async saveClip(): Promise<void> {
    if (!this.currentClip.id) return;

    const clip: SmartClip = {
      id: this.currentClip.id,
      url: this.currentClip.url || '',
      title: this.currentClip.title || '',
      summary: this.currentClip.summary || '',
      keyPoints: this.currentClip.keyPoints || [],
      screenshot: this.currentClip.screenshot,
      userNote: this.currentClip.userNote,
      content: this.currentClip.content || '',
      createdAt: this.currentClip.createdAt || Date.now(),
    };

    try {
      const clips = await this.loadClips();
      clips.unshift(clip);
      await this.saveClips(clips);

      // Show success feedback
      if (this.shadowRoot) {
        const saveBtn = this.shadowRoot.querySelector('.thecircle-clip-save');
        if (saveBtn) {
          saveBtn.textContent = '已保存!';
          saveBtn.classList.add('saved');
          setTimeout(() => this.hide(), 1000);
        }
      }
    } catch (error) {
      console.error('Failed to save clip:', error);
    }
  }

  private async loadClips(): Promise<SmartClip[]> {
    try {
      const result = await chrome.storage.local.get(CLIPS_STORAGE_KEY);
      return result[CLIPS_STORAGE_KEY] || [];
    } catch {
      return [];
    }
  }

  private async saveClips(clips: SmartClip[]): Promise<void> {
    // Keep only the most recent 200 clips
    const trimmed = clips.slice(0, 200);
    await chrome.storage.local.set({ [CLIPS_STORAGE_KEY]: trimmed });
  }

  private async showAllClips(): Promise<void> {
    const clips = await this.loadClips();

    if (!this.shadowRoot) return;

    const content = this.shadowRoot.querySelector('.thecircle-clip-content');
    if (!content) return;

    if (clips.length === 0) {
      content.innerHTML = `
        <div class="thecircle-clip-empty">
          <div class="thecircle-clip-empty-icon">${icons.bookmark}</div>
          <div class="thecircle-clip-empty-text">还没有保存任何剪藏</div>
        </div>
      `;
      return;
    }

    content.innerHTML = `
      <div class="thecircle-clip-list">
        ${clips.map(clip => `
          <div class="thecircle-clip-item" data-id="${clip.id}">
            ${clip.screenshot ? `
              <div class="thecircle-clip-item-thumb">
                <img src="${clip.screenshot}" alt="" />
              </div>
            ` : ''}
            <div class="thecircle-clip-item-info">
              <div class="thecircle-clip-item-title">${this.escapeHtml(clip.title)}</div>
              <div class="thecircle-clip-item-summary">${this.escapeHtml(clip.summary.slice(0, 100))}...</div>
              <div class="thecircle-clip-item-date">${new Date(clip.createdAt).toLocaleDateString()}</div>
            </div>
            <button class="thecircle-clip-item-delete" data-id="${clip.id}" title="删除">
              ${icons.x}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    // Bind click events for items
    const items = content.querySelectorAll('.thecircle-clip-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.thecircle-clip-item-delete')) {
          e.stopPropagation();
          const id = target.closest('.thecircle-clip-item-delete')?.getAttribute('data-id');
          if (id) this.deleteClip(id);
        } else {
          const id = item.getAttribute('data-id');
          const clip = clips.find(c => c.id === id);
          if (clip) {
            window.open(clip.url, '_blank');
          }
        }
      });
    });
  }

  private async deleteClip(id: string): Promise<void> {
    const clips = await this.loadClips();
    const filtered = clips.filter(c => c.id !== id);
    await this.saveClips(filtered);
    this.showAllClips();
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  private getStyles(): string {
    return `
      :host {
        --glass-bg: rgba(30, 30, 30, 0.95);
        --glass-border: rgba(255, 255, 255, 0.15);
        --text-primary: rgba(255, 255, 255, 0.95);
        --text-secondary: rgba(255, 255, 255, 0.7);
        --button-bg: rgba(255, 255, 255, 0.1);
        --button-hover: rgba(255, 255, 255, 0.2);
      }

      .thecircle-clip-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        max-width: 90vw;
        max-height: 85vh;
        background: var(--glass-bg);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 2147483647;
        animation: fadeIn 0.25s ease-out;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }

      .thecircle-clip-panel-exit {
        animation: fadeOut 0.2s ease-out forwards;
      }

      @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      }

      .thecircle-clip-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--glass-border);
      }

      .thecircle-clip-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .thecircle-clip-icon svg {
        width: 20px;
        height: 20px;
      }

      .thecircle-clip-close {
        background: var(--button-bg);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all 0.15s ease;
      }

      .thecircle-clip-close:hover {
        background: var(--button-hover);
        color: var(--text-primary);
      }

      .thecircle-clip-close svg {
        width: 16px;
        height: 16px;
      }

      .thecircle-clip-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }

      .thecircle-clip-preview {
        margin-bottom: 16px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--glass-border);
      }

      .thecircle-clip-preview img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }

      .thecircle-clip-info {
        margin-bottom: 20px;
      }

      .thecircle-clip-page-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .thecircle-clip-url {
        font-size: 12px;
        color: var(--text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .thecircle-clip-section {
        margin-bottom: 16px;
      }

      .thecircle-clip-section-title {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }

      .thecircle-clip-summary,
      .thecircle-clip-keypoints {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 12px;
        min-height: 60px;
      }

      .thecircle-clip-text {
        font-size: 14px;
        line-height: 1.6;
        color: var(--text-primary);
      }

      .thecircle-clip-points-list {
        margin: 0;
        padding-left: 20px;
        font-size: 14px;
        line-height: 1.8;
        color: var(--text-primary);
      }

      .thecircle-clip-loading {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--text-secondary);
        font-size: 14px;
      }

      .thecircle-clip-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-top-color: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .thecircle-clip-error {
        color: #ef4444;
        font-size: 14px;
      }

      .thecircle-clip-note {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        border-radius: 8px;
        padding: 12px;
        color: var(--text-primary);
        font-size: 14px;
        resize: none;
        outline: none;
        font-family: inherit;
      }

      .thecircle-clip-note::placeholder {
        color: var(--text-secondary);
      }

      .thecircle-clip-note:focus {
        border-color: rgba(59, 130, 246, 0.5);
      }

      .thecircle-clip-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 20px;
        border-top: 1px solid var(--glass-border);
      }

      .thecircle-clip-btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        font-family: inherit;
      }

      .thecircle-clip-btn-secondary {
        background: var(--button-bg);
        color: var(--text-primary);
        border: 1px solid var(--glass-border);
      }

      .thecircle-clip-btn-secondary:hover {
        background: var(--button-hover);
      }

      .thecircle-clip-btn-primary {
        background: #3b82f6;
        color: white;
      }

      .thecircle-clip-btn-primary:hover {
        background: #2563eb;
      }

      .thecircle-clip-btn-primary.saved {
        background: #22c55e;
      }

      /* Clips list */
      .thecircle-clip-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .thecircle-clip-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        position: relative;
      }

      .thecircle-clip-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .thecircle-clip-item-thumb {
        width: 80px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
        flex-shrink: 0;
      }

      .thecircle-clip-item-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .thecircle-clip-item-info {
        flex: 1;
        min-width: 0;
      }

      .thecircle-clip-item-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 4px;
      }

      .thecircle-clip-item-summary {
        font-size: 12px;
        color: var(--text-secondary);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .thecircle-clip-item-date {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 4px;
      }

      .thecircle-clip-item-delete {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(239, 68, 68, 0.2);
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ef4444;
        opacity: 0;
        transition: all 0.15s ease;
      }

      .thecircle-clip-item:hover .thecircle-clip-item-delete {
        opacity: 1;
      }

      .thecircle-clip-item-delete:hover {
        background: rgba(239, 68, 68, 0.3);
      }

      .thecircle-clip-item-delete svg {
        width: 14px;
        height: 14px;
      }

      .thecircle-clip-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: var(--text-secondary);
      }

      .thecircle-clip-empty-icon svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
        margin-bottom: 12px;
      }

      /* Scrollbar */
      .thecircle-clip-content::-webkit-scrollbar {
        width: 6px;
      }

      .thecircle-clip-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .thecircle-clip-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
    `;
  }
}
