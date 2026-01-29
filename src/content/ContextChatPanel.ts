// Context Chat Panel - Multi-turn conversation with page context
import { MenuConfig, ChatMessage, ChatSession } from '../types';
import { callAI, OnChunkCallback } from '../utils/ai';
import { icons } from '../icons';

const CHAT_STORAGE_KEY = 'thecircle_chat_sessions';
const MAX_SESSIONS = 100;

export class ContextChatPanel {
  private container: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private config: MenuConfig;
  private session: ChatSession | null = null;
  private isStreaming = false;
  private currentRequestId: string | null = null;

  constructor(config: MenuConfig) {
    this.config = config;
  }

  public show(): void {
    this.loadOrCreateSession();
    this.render();
  }

  public hide(): void {
    if (this.container) {
      this.container.classList.add('thecircle-chat-panel-exit');
      setTimeout(() => {
        this.container?.remove();
        this.container = null;
        this.shadowRoot = null;
      }, 200);
    }
  }

  private async loadOrCreateSession(): Promise<void> {
    const url = window.location.href;
    const sessions = await this.loadSessions();

    // Find existing session for this URL
    const existing = sessions.find(s => s.url === url);
    if (existing) {
      this.session = existing;
    } else {
      // Create new session
      this.session = {
        id: this.generateId(),
        url,
        title: document.title,
        messages: [],
        pageContext: document.body.innerText.slice(0, 10000),
        updatedAt: Date.now(),
      };
    }
  }

  private async loadSessions(): Promise<ChatSession[]> {
    try {
      const result = await chrome.storage.local.get(CHAT_STORAGE_KEY);
      return result[CHAT_STORAGE_KEY] || [];
    } catch {
      return [];
    }
  }

  private async saveSessions(sessions: ChatSession[]): Promise<void> {
    // LRU: keep only the most recent MAX_SESSIONS
    const sorted = sessions.sort((a, b) => b.updatedAt - a.updatedAt);
    const trimmed = sorted.slice(0, MAX_SESSIONS);
    await chrome.storage.local.set({ [CHAT_STORAGE_KEY]: trimmed });
  }

  private async saveCurrentSession(): Promise<void> {
    if (!this.session) return;

    const sessions = await this.loadSessions();
    const index = sessions.findIndex(s => s.id === this.session!.id);

    this.session.updatedAt = Date.now();

    if (index >= 0) {
      sessions[index] = this.session;
    } else {
      sessions.push(this.session);
    }

    await this.saveSessions(sessions);
  }

  private render(): void {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'thecircle-chat-container';
    this.shadowRoot = this.container.attachShadow({ mode: 'closed' });

    // Add styles
    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'thecircle-chat-panel';
    panel.innerHTML = this.getPanelHTML();
    this.shadowRoot.appendChild(panel);

    document.body.appendChild(this.container);

    this.bindEvents();
    this.renderMessages();
    this.scrollToBottom();
  }

  private getPanelHTML(): string {
    return `
      <div class="thecircle-chat-header">
        <div class="thecircle-chat-title">
          <span class="thecircle-chat-icon">${icons.messageCircle}</span>
          <span>上下文追问</span>
        </div>
        <div class="thecircle-chat-actions">
          <button class="thecircle-chat-clear" title="清空对话">
            ${icons.x}
          </button>
          <button class="thecircle-chat-close" title="关闭">
            ${icons.x}
          </button>
        </div>
      </div>
      <div class="thecircle-chat-messages"></div>
      <div class="thecircle-chat-input-area">
        <textarea
          class="thecircle-chat-input"
          placeholder="输入问题... 使用 @&quot;文本&quot; 引用页面内容"
          rows="1"
        ></textarea>
        <button class="thecircle-chat-send" title="发送">
          ${icons.sendToAI}
        </button>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    const closeBtn = this.shadowRoot.querySelector('.thecircle-chat-close');
    const clearBtn = this.shadowRoot.querySelector('.thecircle-chat-clear');
    const sendBtn = this.shadowRoot.querySelector('.thecircle-chat-send');
    const input = this.shadowRoot.querySelector('.thecircle-chat-input') as HTMLTextAreaElement;

    closeBtn?.addEventListener('click', () => this.hide());
    clearBtn?.addEventListener('click', () => this.clearChat());
    sendBtn?.addEventListener('click', () => this.sendMessage());

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    input?.addEventListener('input', () => {
      this.autoResizeInput(input);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
  }

  private autoResizeInput(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  private renderMessages(): void {
    if (!this.shadowRoot || !this.session) return;

    const container = this.shadowRoot.querySelector('.thecircle-chat-messages');
    if (!container) return;

    container.innerHTML = '';

    if (this.session.messages.length === 0) {
      container.innerHTML = `
        <div class="thecircle-chat-empty">
          <div class="thecircle-chat-empty-icon">${icons.messageCircle}</div>
          <div class="thecircle-chat-empty-text">开始提问，AI 将基于当前页面内容回答</div>
        </div>
      `;
      return;
    }

    for (const msg of this.session.messages) {
      const msgEl = document.createElement('div');
      msgEl.className = `thecircle-chat-message thecircle-chat-message-${msg.role}`;

      if (msg.references && msg.references.length > 0) {
        const refsHtml = msg.references.map(r =>
          `<div class="thecircle-chat-reference">"${this.escapeHtml(r.text)}"</div>`
        ).join('');
        msgEl.innerHTML = `
          <div class="thecircle-chat-references">${refsHtml}</div>
          <div class="thecircle-chat-content">${this.escapeHtml(msg.content)}</div>
        `;
      } else {
        msgEl.innerHTML = `<div class="thecircle-chat-content">${this.formatMessage(msg.content)}</div>`;
      }

      container.appendChild(msgEl);
    }
  }

  private formatMessage(content: string): string {
    // Simple markdown-like formatting
    return this.escapeHtml(content)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private scrollToBottom(): void {
    if (!this.shadowRoot) return;
    const container = this.shadowRoot.querySelector('.thecircle-chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  private async sendMessage(): Promise<void> {
    if (!this.shadowRoot || !this.session || this.isStreaming) return;

    const input = this.shadowRoot.querySelector('.thecircle-chat-input') as HTMLTextAreaElement;
    const content = input.value.trim();
    if (!content) return;

    // Parse references from @"text" syntax
    const references: { text: string }[] = [];
    const refRegex = /@"([^"]+)"/g;
    let match;
    while ((match = refRegex.exec(content)) !== null) {
      references.push({ text: match[1] });
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      content: content.replace(refRegex, '').trim() || content,
      timestamp: Date.now(),
      references: references.length > 0 ? references : undefined,
    };

    this.session.messages.push(userMessage);
    input.value = '';
    this.autoResizeInput(input);
    this.renderMessages();
    this.scrollToBottom();

    // Generate AI response
    await this.generateResponse(userMessage);
  }

  private async generateResponse(userMessage: ChatMessage): Promise<void> {
    if (!this.session || !this.shadowRoot) return;

    this.isStreaming = true;
    this.currentRequestId = this.generateId();

    // Add placeholder for assistant message
    const assistantMessage: ChatMessage = {
      id: this.generateId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    this.session.messages.push(assistantMessage);
    this.renderMessages();

    // Build conversation context
    const systemPrompt = `You are a helpful assistant answering questions about a webpage.

Page Title: ${this.session.title}
Page URL: ${this.session.url}

Page Content (truncated):
${this.session.pageContext}

Instructions:
- Answer questions based on the page content above
- If the answer is not in the content, say so
- Be concise but thorough
- Use the same language as the user's question
- If the user references specific text with @"...", pay special attention to that text`;

    // Build messages for context
    const conversationHistory = this.session.messages
      .slice(0, -1) // Exclude the empty assistant message
      .map(m => {
        let content = m.content;
        if (m.references && m.references.length > 0) {
          content = `[Referenced text: ${m.references.map(r => `"${r.text}"`).join(', ')}]\n${content}`;
        }
        return `${m.role === 'user' ? 'User' : 'Assistant'}: ${content}`;
      })
      .join('\n\n');

    const prompt = conversationHistory;

    try {
      const onChunk: OnChunkCallback = (chunk, fullText) => {
        if (!this.session) return;
        const lastMsg = this.session.messages[this.session.messages.length - 1];
        if (lastMsg.role === 'assistant') {
          lastMsg.content = fullText;
          this.updateLastMessage(fullText);
        }
      };

      const response = await callAI(prompt, systemPrompt, this.config, onChunk);

      if (response.success && response.result) {
        const lastMsg = this.session.messages[this.session.messages.length - 1];
        if (lastMsg.role === 'assistant') {
          lastMsg.content = response.result;
        }
      } else {
        const lastMsg = this.session.messages[this.session.messages.length - 1];
        if (lastMsg.role === 'assistant') {
          lastMsg.content = response.error || 'AI 请求失败';
        }
      }

      this.renderMessages();
      this.scrollToBottom();
      await this.saveCurrentSession();
    } catch (error) {
      const lastMsg = this.session.messages[this.session.messages.length - 1];
      if (lastMsg.role === 'assistant') {
        lastMsg.content = `错误: ${error}`;
      }
      this.renderMessages();
    } finally {
      this.isStreaming = false;
      this.currentRequestId = null;
    }
  }

  private updateLastMessage(content: string): void {
    if (!this.shadowRoot) return;
    const messages = this.shadowRoot.querySelectorAll('.thecircle-chat-message');
    const lastMsg = messages[messages.length - 1];
    if (lastMsg) {
      const contentEl = lastMsg.querySelector('.thecircle-chat-content');
      if (contentEl) {
        contentEl.innerHTML = this.formatMessage(content);
      }
    }
    this.scrollToBottom();
  }

  private async clearChat(): Promise<void> {
    if (!this.session) return;

    this.session.messages = [];
    this.renderMessages();
    await this.saveCurrentSession();
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
        --input-bg: rgba(255, 255, 255, 0.08);
        --user-msg-bg: rgba(59, 130, 246, 0.2);
        --assistant-msg-bg: rgba(255, 255, 255, 0.05);
      }

      .thecircle-chat-panel {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 400px;
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

      .thecircle-chat-panel-exit {
        animation: slideOut 0.2s ease-out forwards;
      }

      @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      }

      .thecircle-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--glass-border);
      }

      .thecircle-chat-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .thecircle-chat-icon svg {
        width: 20px;
        height: 20px;
      }

      .thecircle-chat-actions {
        display: flex;
        gap: 8px;
      }

      .thecircle-chat-clear,
      .thecircle-chat-close {
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

      .thecircle-chat-clear:hover,
      .thecircle-chat-close:hover {
        background: var(--button-hover);
        color: var(--text-primary);
      }

      .thecircle-chat-clear svg,
      .thecircle-chat-close svg {
        width: 16px;
        height: 16px;
      }

      .thecircle-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .thecircle-chat-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: var(--text-secondary);
      }

      .thecircle-chat-empty-icon svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
      }

      .thecircle-chat-empty-text {
        font-size: 14px;
        text-align: center;
        max-width: 250px;
      }

      .thecircle-chat-message {
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 85%;
      }

      .thecircle-chat-message-user {
        background: var(--user-msg-bg);
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .thecircle-chat-message-assistant {
        background: var(--assistant-msg-bg);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }

      .thecircle-chat-content {
        font-size: 14px;
        line-height: 1.6;
        color: var(--text-primary);
        word-break: break-word;
      }

      .thecircle-chat-content code {
        background: rgba(0, 0, 0, 0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: "SF Mono", Monaco, monospace;
        font-size: 13px;
      }

      .thecircle-chat-references {
        margin-bottom: 8px;
      }

      .thecircle-chat-reference {
        font-size: 12px;
        color: var(--text-secondary);
        font-style: italic;
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        margin-bottom: 4px;
      }

      .thecircle-chat-input-area {
        display: flex;
        gap: 8px;
        padding: 16px;
        border-top: 1px solid var(--glass-border);
      }

      .thecircle-chat-input {
        flex: 1;
        background: var(--input-bg);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 12px 16px;
        color: var(--text-primary);
        font-size: 14px;
        resize: none;
        outline: none;
        font-family: inherit;
        min-height: 44px;
        max-height: 120px;
      }

      .thecircle-chat-input::placeholder {
        color: var(--text-secondary);
      }

      .thecircle-chat-input:focus {
        border-color: rgba(59, 130, 246, 0.5);
      }

      .thecircle-chat-send {
        background: #3b82f6;
        border: none;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }

      .thecircle-chat-send:hover {
        background: #2563eb;
      }

      .thecircle-chat-send svg {
        width: 18px;
        height: 18px;
      }

      /* Scrollbar */
      .thecircle-chat-messages::-webkit-scrollbar {
        width: 6px;
      }

      .thecircle-chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      .thecircle-chat-messages::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }

      .thecircle-chat-messages::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;
  }
}
