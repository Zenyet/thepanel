// Focus Read Mode - Immersive reading with AI enhancements
import { MenuConfig } from '../types';
import { callAI, OnChunkCallback } from '../utils/ai';
import { icons } from '../icons';

interface Heading {
  level: number;
  text: string;
  element: HTMLElement;
}

export class FocusReadMode {
  private container: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private config: MenuConfig;
  private originalContent: string = '';
  private headings: Heading[] = [];
  private isReading = false;
  private speechSynthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor(config: MenuConfig) {
    this.config = config;
    this.speechSynthesis = window.speechSynthesis;
  }

  public enter(): void {
    this.extractContent();
    this.render();
  }

  public exit(): void {
    this.stopReading();
    if (this.container) {
      this.container.classList.add('thecircle-read-exit');
      setTimeout(() => {
        this.container?.remove();
        this.container = null;
        this.shadowRoot = null;
      }, 300);
    }
  }

  private extractContent(): void {
    // Try to find the main content area
    const article = document.querySelector('article') ||
                   document.querySelector('[role="main"]') ||
                   document.querySelector('main') ||
                   document.querySelector('.post-content') ||
                   document.querySelector('.article-content') ||
                   document.querySelector('.entry-content') ||
                   document.body;

    // Clone and clean the content
    const clone = article.cloneNode(true) as HTMLElement;

    // Remove unwanted elements
    const selectorsToRemove = [
      'script', 'style', 'nav', 'header', 'footer', 'aside',
      '.sidebar', '.comments', '.advertisement', '.ad', '.ads',
      '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
      '.social-share', '.related-posts', '.newsletter'
    ];

    selectorsToRemove.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Extract headings for outline
    this.headings = [];
    clone.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent?.trim() || '';
      if (text) {
        heading.id = `thecircle-heading-${index}`;
        this.headings.push({
          level,
          text,
          element: heading as HTMLElement,
        });
      }
    });

    this.originalContent = clone.innerHTML;
  }

  private render(): void {
    this.container = document.createElement('div');
    this.container.id = 'thecircle-read-container';
    this.shadowRoot = this.container.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadowRoot.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = 'thecircle-read-wrapper';
    wrapper.innerHTML = this.getWrapperHTML();
    this.shadowRoot.appendChild(wrapper);

    document.body.appendChild(this.container);
    this.bindEvents();
    this.renderOutline();
  }

  private getWrapperHTML(): string {
    return `
      <div class="thecircle-read-toolbar">
        <div class="thecircle-read-toolbar-left">
          <button class="thecircle-read-btn thecircle-read-exit-btn" title="退出阅读模式">
            ${icons.x}
            <span>退出</span>
          </button>
        </div>
        <div class="thecircle-read-toolbar-center">
          <span class="thecircle-read-title">${this.escapeHtml(document.title)}</span>
        </div>
        <div class="thecircle-read-toolbar-right">
          <button class="thecircle-read-btn thecircle-read-tts-btn" title="朗读">
            ${icons.messageCircle}
            <span>朗读</span>
          </button>
          <button class="thecircle-read-btn thecircle-read-outline-btn" title="大纲">
            ${icons.summarize}
            <span>大纲</span>
          </button>
        </div>
      </div>
      <div class="thecircle-read-main">
        <aside class="thecircle-read-outline">
          <div class="thecircle-read-outline-header">
            <span>大纲</span>
            <button class="thecircle-read-outline-close">${icons.x}</button>
          </div>
          <div class="thecircle-read-outline-content"></div>
        </aside>
        <article class="thecircle-read-content">
          ${this.originalContent}
        </article>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    const exitBtn = this.shadowRoot.querySelector('.thecircle-read-exit-btn');
    const ttsBtn = this.shadowRoot.querySelector('.thecircle-read-tts-btn');
    const outlineBtn = this.shadowRoot.querySelector('.thecircle-read-outline-btn');
    const outlineClose = this.shadowRoot.querySelector('.thecircle-read-outline-close');
    const outline = this.shadowRoot.querySelector('.thecircle-read-outline');

    exitBtn?.addEventListener('click', () => this.exit());

    ttsBtn?.addEventListener('click', () => {
      if (this.isReading) {
        this.stopReading();
        ttsBtn.classList.remove('active');
      } else {
        this.startReading();
        ttsBtn.classList.add('active');
      }
    });

    outlineBtn?.addEventListener('click', () => {
      outline?.classList.toggle('visible');
      outlineBtn.classList.toggle('active');
    });

    outlineClose?.addEventListener('click', () => {
      outline?.classList.remove('visible');
      outlineBtn?.classList.remove('active');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.exit();
      }
    });
  }

  private renderOutline(): void {
    if (!this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.thecircle-read-outline-content');
    if (!container) return;

    if (this.headings.length === 0) {
      container.innerHTML = '<div class="thecircle-read-outline-empty">没有找到标题</div>';
      return;
    }

    container.innerHTML = this.headings.map((heading, index) => `
      <div
        class="thecircle-read-outline-item"
        data-index="${index}"
        style="padding-left: ${(heading.level - 1) * 12 + 12}px"
      >
        ${this.escapeHtml(heading.text)}
      </div>
    `).join('');

    // Bind click events
    container.querySelectorAll('.thecircle-read-outline-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-index') || '0');
        this.scrollToHeading(index);
      });
    });
  }

  private scrollToHeading(index: number): void {
    if (!this.shadowRoot) return;

    const content = this.shadowRoot.querySelector('.thecircle-read-content');
    const heading = content?.querySelector(`#thecircle-heading-${index}`);

    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private startReading(): void {
    if (!this.speechSynthesis || !this.shadowRoot) return;

    const content = this.shadowRoot.querySelector('.thecircle-read-content');
    if (!content) return;

    const text = content.textContent || '';
    if (!text.trim()) return;

    this.isReading = true;
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'zh-CN';
    this.currentUtterance.rate = 1;
    this.currentUtterance.pitch = 1;

    this.currentUtterance.onend = () => {
      this.isReading = false;
      const ttsBtn = this.shadowRoot?.querySelector('.thecircle-read-tts-btn');
      ttsBtn?.classList.remove('active');
    };

    this.currentUtterance.onerror = () => {
      this.isReading = false;
      const ttsBtn = this.shadowRoot?.querySelector('.thecircle-read-tts-btn');
      ttsBtn?.classList.remove('active');
    };

    this.speechSynthesis.speak(this.currentUtterance);
  }

  private stopReading(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
    this.isReading = false;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private getStyles(): string {
    return `
      :host {
        --bg-color: #1a1a1a;
        --text-color: #e0e0e0;
        --text-secondary: #888;
        --border-color: rgba(255, 255, 255, 0.1);
        --accent-color: #3b82f6;
        --toolbar-bg: rgba(30, 30, 30, 0.95);
      }

      .thecircle-read-wrapper {
        position: fixed;
        inset: 0;
        background: var(--bg-color);
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .thecircle-read-exit {
        animation: fadeOut 0.3s ease-out forwards;
      }

      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .thecircle-read-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: var(--toolbar-bg);
        border-bottom: 1px solid var(--border-color);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }

      .thecircle-read-toolbar-left,
      .thecircle-read-toolbar-right {
        display: flex;
        gap: 8px;
      }

      .thecircle-read-toolbar-center {
        flex: 1;
        text-align: center;
      }

      .thecircle-read-title {
        font-size: 14px;
        color: var(--text-color);
        font-weight: 500;
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }

      .thecircle-read-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 8px;
        color: var(--text-color);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s ease;
        font-family: inherit;
      }

      .thecircle-read-btn:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      .thecircle-read-btn.active {
        background: var(--accent-color);
        color: white;
      }

      .thecircle-read-btn svg {
        width: 16px;
        height: 16px;
      }

      .thecircle-read-main {
        flex: 1;
        display: flex;
        overflow: hidden;
        position: relative;
      }

      .thecircle-read-outline {
        width: 280px;
        background: rgba(30, 30, 30, 0.95);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
      }

      .thecircle-read-outline.visible {
        transform: translateX(0);
      }

      .thecircle-read-outline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border-color);
        font-size: 14px;
        font-weight: 600;
        color: var(--text-color);
      }

      .thecircle-read-outline-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .thecircle-read-outline-close svg {
        width: 16px;
        height: 16px;
      }

      .thecircle-read-outline-content {
        flex: 1;
        overflow-y: auto;
        padding: 12px 0;
      }

      .thecircle-read-outline-item {
        padding: 10px 20px;
        font-size: 13px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s ease;
        border-left: 2px solid transparent;
      }

      .thecircle-read-outline-item:hover {
        color: var(--text-color);
        background: rgba(255, 255, 255, 0.05);
        border-left-color: var(--accent-color);
      }

      .thecircle-read-outline-empty {
        padding: 20px;
        text-align: center;
        color: var(--text-secondary);
        font-size: 13px;
      }

      .thecircle-read-content {
        flex: 1;
        overflow-y: auto;
        padding: 40px;
        max-width: 800px;
        margin: 0 auto;
        color: var(--text-color);
        font-size: 18px;
        line-height: 1.8;
      }

      .thecircle-read-content h1,
      .thecircle-read-content h2,
      .thecircle-read-content h3,
      .thecircle-read-content h4,
      .thecircle-read-content h5,
      .thecircle-read-content h6 {
        color: var(--text-color);
        margin-top: 2em;
        margin-bottom: 0.5em;
        line-height: 1.4;
      }

      .thecircle-read-content h1 { font-size: 2em; }
      .thecircle-read-content h2 { font-size: 1.6em; }
      .thecircle-read-content h3 { font-size: 1.3em; }

      .thecircle-read-content p {
        margin-bottom: 1.5em;
      }

      .thecircle-read-content a {
        color: var(--accent-color);
        text-decoration: none;
      }

      .thecircle-read-content a:hover {
        text-decoration: underline;
      }

      .thecircle-read-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1em 0;
      }

      .thecircle-read-content pre {
        background: rgba(0, 0, 0, 0.3);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.5;
      }

      .thecircle-read-content code {
        background: rgba(0, 0, 0, 0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: "SF Mono", Monaco, monospace;
        font-size: 0.9em;
      }

      .thecircle-read-content pre code {
        background: none;
        padding: 0;
      }

      .thecircle-read-content blockquote {
        border-left: 3px solid var(--accent-color);
        margin: 1.5em 0;
        padding-left: 1em;
        color: var(--text-secondary);
        font-style: italic;
      }

      .thecircle-read-content ul,
      .thecircle-read-content ol {
        margin-bottom: 1.5em;
        padding-left: 1.5em;
      }

      .thecircle-read-content li {
        margin-bottom: 0.5em;
      }

      /* Scrollbar */
      .thecircle-read-content::-webkit-scrollbar,
      .thecircle-read-outline-content::-webkit-scrollbar {
        width: 8px;
      }

      .thecircle-read-content::-webkit-scrollbar-track,
      .thecircle-read-outline-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .thecircle-read-content::-webkit-scrollbar-thumb,
      .thecircle-read-outline-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }

      .thecircle-read-content::-webkit-scrollbar-thumb:hover,
      .thecircle-read-outline-content::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      @media (max-width: 768px) {
        .thecircle-read-content {
          padding: 24px 16px;
          font-size: 16px;
        }

        .thecircle-read-btn span {
          display: none;
        }

        .thecircle-read-btn {
          padding: 8px 12px;
        }
      }
    `;
  }
}
