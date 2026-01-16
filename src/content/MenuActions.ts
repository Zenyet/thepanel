import { MenuItem, MenuConfig, Message } from '../types';
import {
  callAI,
  getTranslatePrompt,
  getSummarizePrompt,
  getExplainPrompt,
  getRewritePrompt,
  getCodeExplainPrompt,
  getSummarizePagePrompt,
  OnChunkCallback,
} from '../utils/ai';

export class MenuActions {
  private selectedText: string = '';
  private config: MenuConfig;

  constructor(config: MenuConfig) {
    this.config = config;
  }

  public setSelectedText(text: string): void {
    this.selectedText = text;
  }

  public setConfig(config: MenuConfig): void {
    this.config = config;
  }

  public async execute(
    item: MenuItem,
    onChunk?: OnChunkCallback
  ): Promise<{ type: string; result?: string; url?: string }> {
    switch (item.action) {
      case 'translate':
        return this.handleTranslate(onChunk);
      case 'summarize':
        return this.handleSummarize(onChunk);
      case 'explain':
        return this.handleExplain(onChunk);
      case 'rewrite':
        return this.handleRewrite(onChunk);
      case 'codeExplain':
        return this.handleCodeExplain(onChunk);
      case 'search':
        return this.handleSearch();
      case 'copy':
        return this.handleCopy();
      case 'sendToAI':
        return this.handleSendToAI();
      case 'aiChat':
        return this.handleAIChat();
      case 'summarizePage':
        return this.handleSummarizePage(onChunk);
      case 'switchTab':
        return this.handleSwitchTab();
      case 'history':
        return this.handleHistory();
      case 'screenshot':
        return this.handleScreenshot();
      case 'bookmark':
        return this.handleBookmark();
      case 'newTab':
        return this.handleNewTab();
      case 'settings':
        return this.handleSettings();
      default:
        return { type: 'error', result: 'Unknown action' };
    }
  }

  private async handleTranslate(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    if (!this.selectedText) {
      return { type: 'error', result: '请先选择要翻译的文字' };
    }

    return this.callAIAction('translate', this.selectedText, onChunk);
  }

  private async handleSummarize(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    if (!this.selectedText) {
      return { type: 'error', result: '请先选择要总结的文字' };
    }

    return this.callAIAction('summarize', this.selectedText, onChunk);
  }

  private async handleExplain(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    if (!this.selectedText) {
      return { type: 'error', result: '请先选择要解释的文字' };
    }

    return this.callAIAction('explain', this.selectedText, onChunk);
  }

  private async handleRewrite(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    if (!this.selectedText) {
      return { type: 'error', result: '请先选择要改写的文字' };
    }

    return this.callAIAction('rewrite', this.selectedText, onChunk);
  }

  private async handleCodeExplain(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    if (!this.selectedText) {
      return { type: 'error', result: '请先选择要解释的代码' };
    }

    return this.callAIAction('codeExplain', this.selectedText, onChunk);
  }

  private async handleSummarizePage(onChunk?: OnChunkCallback): Promise<{ type: string; result?: string }> {
    return this.callAIAction('summarizePage', document.body.innerText.slice(0, 10000), onChunk);
  }

  private async callAIAction(
    action: string,
    text: string,
    onChunk?: OnChunkCallback
  ): Promise<{ type: string; result?: string }> {
    let systemPrompt: string;

    switch (action) {
      case 'translate':
        systemPrompt = getTranslatePrompt(this.config.preferredLanguage || 'zh-CN');
        break;
      case 'summarize':
        systemPrompt = getSummarizePrompt();
        break;
      case 'explain':
        systemPrompt = getExplainPrompt();
        break;
      case 'rewrite':
        systemPrompt = getRewritePrompt();
        break;
      case 'codeExplain':
        systemPrompt = getCodeExplainPrompt();
        break;
      case 'summarizePage':
        systemPrompt = getSummarizePagePrompt();
        break;
      default:
        return { type: 'error', result: 'Unknown AI action' };
    }

    try {
      const response = await callAI(text, systemPrompt, this.config, onChunk);

      if (response.success) {
        return { type: 'ai', result: response.result };
      } else {
        return { type: 'error', result: response.error || 'AI 请求失败' };
      }
    } catch (error) {
      return { type: 'error', result: `请求失败: ${error}` };
    }
  }

  private handleSearch(): { type: string; url: string } {
    const query = encodeURIComponent(this.selectedText || '');
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, '_blank');
    return { type: 'redirect', url };
  }

  private handleCopy(): { type: string; result: string } {
    if (this.selectedText) {
      navigator.clipboard.writeText(this.selectedText);
      return { type: 'success', result: '已复制到剪贴板' };
    }
    return { type: 'error', result: '没有选中的文字' };
  }

  private handleSendToAI(): { type: string; url: string } {
    const text = encodeURIComponent(this.selectedText || '');
    const url = `https://chat.openai.com/?q=${text}`;
    window.open(url, '_blank');
    return { type: 'redirect', url };
  }

  private handleAIChat(): { type: string; url: string } {
    window.open('https://chat.openai.com/', '_blank');
    return { type: 'redirect', url: 'https://chat.openai.com/' };
  }

  private async handleSwitchTab(): Promise<{ type: string; result?: string }> {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_TABS',
      } as Message);

      if (response?.tabs) {
        // For now, just show tab info - in future, could show a sub-menu
        return { type: 'info', result: `打开了 ${response.tabs.length} 个标签页` };
      }
      return { type: 'error', result: '获取标签页失败' };
    } catch {
      return { type: 'error', result: '获取标签页失败' };
    }
  }

  private handleHistory(): { type: string; url: string } {
    chrome.runtime.sendMessage({ type: 'OPEN_URL', payload: 'chrome://history' } as Message);
    return { type: 'redirect', url: 'chrome://history' };
  }

  private async handleScreenshot(): Promise<{ type: string; result?: string }> {
    try {
      await chrome.runtime.sendMessage({ type: 'SCREENSHOT' } as Message);
      return { type: 'success', result: '截图已保存' };
    } catch {
      return { type: 'error', result: '截图失败' };
    }
  }

  private async handleBookmark(): Promise<{ type: string; result?: string }> {
    try {
      await chrome.runtime.sendMessage({
        type: 'ADD_BOOKMARK',
        payload: { title: document.title, url: window.location.href },
      } as Message);
      return { type: 'success', result: '已添加书签' };
    } catch {
      return { type: 'error', result: '添加书签失败' };
    }
  }

  private handleNewTab(): { type: string; result: string } {
    chrome.runtime.sendMessage({ type: 'NEW_TAB' } as Message);
    return { type: 'success', result: '已打开新标签页' };
  }

  private handleSettings(): { type: string; result: string } {
    chrome.runtime.openOptionsPage();
    return { type: 'redirect', result: '已打开设置页面' };
  }
}
