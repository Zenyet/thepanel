// Browse Trail Panel - Visual browsing history with semantic search
import { TrailEntry, BrowseSession } from '../types';
import { icons } from '../icons';

const TRAIL_STORAGE_KEY = 'thecircle_browse_trail';
const SESSION_STORAGE_KEY = 'thecircle_current_session';

export class BrowseTrailPanel {
  private container: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private sessions: BrowseSession[] = [];
  private searchQuery = '';

  constructor() {}

  public async show(): Promise<void> {
    await this.loadSessions();
    this.render();
  }

  public hide(): void {
    if (this.container) {
      this.container.classList.add('thecircle-trail-exit');
      setTimeout(() => {
        this.container?.remove();
        this.container = null;
        this.shadowRoot = null;
      }, 200);
    }
  }

  private async loadSessions(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(TRAIL_STORAGE_KEY);
      this.sessions = result[TRAIL_STORAGE_KEY] || [];
    } catch {
      this.sessions = [];
    }
  }

  private render(): void {
    this.container = document.createElement('div');
    this.container.id = 'thecircle-trail-container';
    this.shadowRoot = this.container.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'thecircle-trail-panel';
    panel.innerHTML = this.getPanelHTML();
    this.shadowRoot.appendChild(panel);

    document.body.appendChild(this.container);
    this.bindEvents();
    this.renderSessions();
  }

  private getPanelHTML(): string {
    return `
      <div class="thecircle-trail-header">
        <div class="thecircle-trail-title">
          <span class="thecircle-trail-icon">${icons.history}</span>
          <span>浏览轨迹</span>
        </div>
        <button class="thecircle-trail-close" title="关闭">
          ${icons.x}
        </button>
      </div>
      <div class="thecircle-trail-search">
        <span class="thecircle-trail-search-icon">${icons.search}</span>
        <input
          type="text"
          class="thecircle-trail-search-input"
          placeholder="搜索浏览历史..."
        />
      </div>
      <div class="thecircle-trail-content"></div>
      <div class="thecircle-trail-footer">
        <button class="thecircle-trail-btn thecircle-trail-clear">
          清空历史
        </button>
        <button class="thecircle-trail-btn thecircle-trail-export">
          导出
        </button>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    const closeBtn = this.shadowRoot.querySelector('.thecircle-trail-close');
    const searchInput = this.shadowRoot.querySelector('.thecircle-trail-search-input') as HTMLInputElement;
    const clearBtn = this.shadowRoot.querySelector('.thecircle-trail-clear');
    const exportBtn = this.shadowRoot.querySelector('.thecircle-trail-export');

    closeBtn?.addEventListener('click', () => this.hide());

    searchInput?.addEventListener('input', () => {
      this.searchQuery = searchInput.value.toLowerCase().trim();
      this.renderSessions();
    });

    clearBtn?.addEventListener('click', () => this.clearHistory());
    exportBtn?.addEventListener('click', () => this.exportHistory());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
  }

  private renderSessions(): void {
    if (!this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.thecircle-trail-content');
    if (!container) return;

    // Flatten all entries from all sessions
    const allEntries: TrailEntry[] = [];
    for (const session of this.sessions) {
      allEntries.push(...session.entries);
    }

    // Sort by visit time (most recent first)
    allEntries.sort((a, b) => b.visitedAt - a.visitedAt);

    // Filter by search query
    const filteredEntries = this.searchQuery
      ? allEntries.filter(entry =>
          entry.title.toLowerCase().includes(this.searchQuery) ||
          entry.url.toLowerCase().includes(this.searchQuery) ||
          (entry.summary?.toLowerCase().includes(this.searchQuery))
        )
      : allEntries;

    if (filteredEntries.length === 0) {
      container.innerHTML = `
        <div class="thecircle-trail-empty">
          <div class="thecircle-trail-empty-icon">${icons.history}</div>
          <div class="thecircle-trail-empty-text">
            ${this.searchQuery ? '没有找到匹配的记录' : '还没有浏览记录'}
          </div>
          <div class="thecircle-trail-empty-hint">
            ${this.searchQuery ? '试试其他关键词' : '浏览网页时会自动记录'}
          </div>
        </div>
      `;
      return;
    }

    // Group by date
    const groupedByDate = this.groupByDate(filteredEntries);

    container.innerHTML = Object.entries(groupedByDate).map(([date, entries]) => `
      <div class="thecircle-trail-group">
        <div class="thecircle-trail-date">${date}</div>
        <div class="thecircle-trail-entries">
          ${entries.map(entry => this.renderEntry(entry)).join('')}
        </div>
      </div>
    `).join('');

    // Bind click events
    container.querySelectorAll('.thecircle-trail-entry').forEach(el => {
      el.addEventListener('click', () => {
        const url = el.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      });
    });

    container.querySelectorAll('.thecircle-trail-entry-delete').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.getAttribute('data-id');
        if (id) {
          this.deleteEntry(id);
        }
      });
    });
  }

  private renderEntry(entry: TrailEntry): string {
    const time = new Date(entry.visitedAt).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const domain = new URL(entry.url).hostname;

    return `
      <div class="thecircle-trail-entry" data-url="${this.escapeHtml(entry.url)}">
        <div class="thecircle-trail-entry-thumb">
          ${entry.thumbnail
            ? `<img src="${entry.thumbnail}" alt="" />`
            : `<div class="thecircle-trail-entry-thumb-placeholder">${icons.fileText}</div>`
          }
        </div>
        <div class="thecircle-trail-entry-info">
          <div class="thecircle-trail-entry-title">${this.escapeHtml(entry.title)}</div>
          <div class="thecircle-trail-entry-meta">
            <span class="thecircle-trail-entry-domain">${this.escapeHtml(domain)}</span>
            <span class="thecircle-trail-entry-time">${time}</span>
          </div>
          ${entry.summary ? `
            <div class="thecircle-trail-entry-summary">${this.escapeHtml(entry.summary)}</div>
          ` : ''}
        </div>
        <button class="thecircle-trail-entry-delete" data-id="${entry.id}" title="删除">
          ${icons.x}
        </button>
      </div>
    `;
  }

  private groupByDate(entries: TrailEntry[]): Record<string, TrailEntry[]> {
    const groups: Record<string, TrailEntry[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    for (const entry of entries) {
      const date = new Date(entry.visitedAt).toDateString();
      let label: string;

      if (date === today) {
        label = '今天';
      } else if (date === yesterday) {
        label = '昨天';
      } else {
        label = new Date(entry.visitedAt).toLocaleDateString('zh-CN', {
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        });
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(entry);
    }

    return groups;
  }

  private async deleteEntry(id: string): Promise<void> {
    for (const session of this.sessions) {
      session.entries = session.entries.filter(e => e.id !== id);
    }

    // Remove empty sessions
    this.sessions = this.sessions.filter(s => s.entries.length > 0);

    await this.saveSessions();
    this.renderSessions();
  }

  private async clearHistory(): Promise<void> {
    if (!confirm('确定要清空所有浏览记录吗？')) return;

    this.sessions = [];
    await this.saveSessions();
    this.renderSessions();
  }

  private async saveSessions(): Promise<void> {
    await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: this.sessions });
  }

  private exportHistory(): void {
    const allEntries: TrailEntry[] = [];
    for (const session of this.sessions) {
      allEntries.push(...session.entries);
    }

    const data = allEntries.map(entry => ({
      title: entry.title,
      url: entry.url,
      visitedAt: new Date(entry.visitedAt).toISOString(),
      summary: entry.summary,
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `browse-trail-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private getStyles(): string {
    return `
      :host {
        --glass-bg: rgba(30, 30, 30, 0.95);
        --glass-border: rgba(255, 255, 255, 0.15);
        --text-primary: rgba(255, 255, 255, 0.95);
        --text-secondary: rgba(255, 255, 255, 0.6);
        --button-bg: rgba(255, 255, 255, 0.1);
        --button-hover: rgba(255, 255, 255, 0.15);
        --input-bg: rgba(255, 255, 255, 0.08);
      }

      .thecircle-trail-panel {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 420px;
        max-width: 100vw;
        background: var(--glass-bg);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border-left: 1px solid var(--glass-border);
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 2147483647;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }

      .thecircle-trail-exit {
        animation: slideOut 0.2s ease-out forwards;
      }

      @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      }

      .thecircle-trail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--glass-border);
      }

      .thecircle-trail-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .thecircle-trail-icon svg {
        width: 20px;
        height: 20px;
      }

      .thecircle-trail-close {
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

      .thecircle-trail-close:hover {
        background: var(--button-hover);
        color: var(--text-primary);
      }

      .thecircle-trail-close svg {
        width: 16px;
        height: 16px;
      }

      .thecircle-trail-search {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        border-bottom: 1px solid var(--glass-border);
      }

      .thecircle-trail-search-icon {
        color: var(--text-secondary);
      }

      .thecircle-trail-search-icon svg {
        width: 18px;
        height: 18px;
      }

      .thecircle-trail-search-input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        outline: none;
        font-family: inherit;
      }

      .thecircle-trail-search-input::placeholder {
        color: var(--text-secondary);
      }

      .thecircle-trail-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      .thecircle-trail-group {
        margin-bottom: 24px;
      }

      .thecircle-trail-date {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
        padding-left: 4px;
      }

      .thecircle-trail-entries {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .thecircle-trail-entry {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.15s ease;
        position: relative;
      }

      .thecircle-trail-entry:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .thecircle-trail-entry-thumb {
        width: 64px;
        height: 48px;
        border-radius: 6px;
        overflow: hidden;
        flex-shrink: 0;
        background: rgba(255, 255, 255, 0.05);
      }

      .thecircle-trail-entry-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .thecircle-trail-entry-thumb-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
      }

      .thecircle-trail-entry-thumb-placeholder svg {
        width: 24px;
        height: 24px;
        opacity: 0.5;
      }

      .thecircle-trail-entry-info {
        flex: 1;
        min-width: 0;
      }

      .thecircle-trail-entry-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 4px;
      }

      .thecircle-trail-entry-meta {
        display: flex;
        gap: 8px;
        font-size: 12px;
        color: var(--text-secondary);
      }

      .thecircle-trail-entry-domain {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .thecircle-trail-entry-summary {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .thecircle-trail-entry-delete {
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

      .thecircle-trail-entry:hover .thecircle-trail-entry-delete {
        opacity: 1;
      }

      .thecircle-trail-entry-delete:hover {
        background: rgba(239, 68, 68, 0.3);
      }

      .thecircle-trail-entry-delete svg {
        width: 14px;
        height: 14px;
      }

      .thecircle-trail-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: var(--text-secondary);
      }

      .thecircle-trail-empty-icon svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
        margin-bottom: 16px;
      }

      .thecircle-trail-empty-text {
        font-size: 14px;
        margin-bottom: 8px;
      }

      .thecircle-trail-empty-hint {
        font-size: 12px;
        opacity: 0.7;
      }

      .thecircle-trail-footer {
        display: flex;
        justify-content: space-between;
        padding: 16px 20px;
        border-top: 1px solid var(--glass-border);
      }

      .thecircle-trail-btn {
        padding: 8px 16px;
        background: var(--button-bg);
        border: 1px solid var(--glass-border);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s ease;
        font-family: inherit;
      }

      .thecircle-trail-btn:hover {
        background: var(--button-hover);
      }

      /* Scrollbar */
      .thecircle-trail-content::-webkit-scrollbar {
        width: 6px;
      }

      .thecircle-trail-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .thecircle-trail-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }

      .thecircle-trail-content::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;
  }
}

// Trail Recorder - Records browsing activity in background
export class TrailRecorder {
  private currentSessionId: string;
  private recordingEnabled = true;

  constructor() {
    this.currentSessionId = this.generateId();
    this.startRecording();
  }

  private async startRecording(): Promise<void> {
    // Record current page
    await this.recordPage();

    // Listen for navigation events
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.recordPage();
      });
    }
  }

  public async recordPage(): Promise<void> {
    if (!this.recordingEnabled) return;

    const entry: TrailEntry = {
      id: this.generateId(),
      url: window.location.href,
      title: document.title,
      visitedAt: Date.now(),
      sessionId: this.currentSessionId,
    };

    // Skip certain URLs
    if (this.shouldSkip(entry.url)) return;

    try {
      const result = await chrome.storage.local.get(TRAIL_STORAGE_KEY);
      const sessions: BrowseSession[] = result[TRAIL_STORAGE_KEY] || [];

      // Find or create current session
      let session = sessions.find(s => s.id === this.currentSessionId);
      if (!session) {
        session = {
          id: this.currentSessionId,
          startedAt: Date.now(),
          entries: [],
        };
        sessions.unshift(session);
      }

      // Avoid duplicate entries for the same URL in quick succession
      const lastEntry = session.entries[session.entries.length - 1];
      if (lastEntry && lastEntry.url === entry.url && Date.now() - lastEntry.visitedAt < 5000) {
        return;
      }

      session.entries.push(entry);

      // Keep only last 30 days of history
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const filteredSessions = sessions.filter(s => s.startedAt > thirtyDaysAgo);

      await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: filteredSessions });
    } catch (error) {
      console.error('Failed to record page:', error);
    }
  }

  private shouldSkip(url: string): boolean {
    const skipPatterns = [
      /^chrome:/,
      /^chrome-extension:/,
      /^about:/,
      /^data:/,
      /^blob:/,
      /^javascript:/,
    ];

    return skipPatterns.some(pattern => pattern.test(url));
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
