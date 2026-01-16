import { MenuConfig } from '../types';

// Provider configurations
interface ProviderConfig {
  apiUrl: string;
  model: string;
}

const PROVIDER_CONFIGS: Record<string, ProviderConfig> = {
  groq: {
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.2-90b-vision-preview',
  },
  openai: {
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
  },
  anthropic: {
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
  },
  gemini: {
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    model: 'gemini-1.5-flash',
  },
};

interface AIResponse {
  success: boolean;
  result?: string;
  error?: string;
}

export type OnChunkCallback = (chunk: string, fullText: string) => void;

export async function callAI(
  prompt: string,
  systemPrompt: string,
  config: MenuConfig,
  onChunk?: OnChunkCallback
): Promise<AIResponse> {
  const provider = config.apiProvider;
  const useStreaming = config.useStreaming && !!onChunk;

  // Validate API key requirement
  if (provider !== 'groq' && !config.apiKey) {
    return { success: false, error: `请配置 ${provider.toUpperCase()} API Key` };
  }

  // For custom provider, validate URL and model
  if (provider === 'custom') {
    if (!config.customApiUrl || !config.customModel) {
      return { success: false, error: '请配置自定义 API URL 和模型名称' };
    }
  }

  try {
    switch (provider) {
      case 'anthropic':
        return await callAnthropicAPI(prompt, systemPrompt, config, useStreaming, onChunk);
      case 'gemini':
        return await callGeminiAPI(prompt, systemPrompt, config, useStreaming, onChunk);
      case 'groq':
      case 'openai':
      case 'custom':
      default:
        return await callOpenAICompatibleAPI(prompt, systemPrompt, config, useStreaming, onChunk);
    }
  } catch (error) {
    return { success: false, error: `请求失败: ${error}` };
  }
}

// OpenAI compatible API (for Groq, OpenAI, and custom providers)
async function callOpenAICompatibleAPI(
  prompt: string,
  systemPrompt: string,
  config: MenuConfig,
  useStreaming: boolean,
  onChunk?: OnChunkCallback
): Promise<AIResponse> {
  const provider = config.apiProvider;
  let apiUrl: string;
  let model: string;
  let apiKey = config.apiKey;

  if (provider === 'custom') {
    apiUrl = config.customApiUrl!;
    model = config.customModel!;
  } else {
    const providerConfig = PROVIDER_CONFIGS[provider];
    apiUrl = providerConfig.apiUrl;
    model = providerConfig.model;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      stream: useStreaming,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { success: false, error: `API 错误: ${error}` };
  }

  if (useStreaming && onChunk) {
    return await processOpenAIStream(response, onChunk);
  }

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content;

  if (result) {
    return { success: true, result };
  }

  return { success: false, error: 'AI 无响应' };
}

async function processOpenAIStream(
  response: Response,
  onChunk: OnChunkCallback
): Promise<AIResponse> {
  const reader = response.body?.getReader();
  if (!reader) {
    return { success: false, error: '无法读取流' };
  }

  const decoder = new TextDecoder();
  let fullText = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              onChunk(content, fullText);
            }
          } catch {
            // Skip invalid JSON lines
          }
        }
      }
    }

    if (fullText) {
      return { success: true, result: fullText };
    }
    return { success: false, error: 'AI 无响应' };
  } finally {
    reader.releaseLock();
  }
}

// Anthropic API
async function callAnthropicAPI(
  prompt: string,
  systemPrompt: string,
  config: MenuConfig,
  useStreaming: boolean,
  onChunk?: OnChunkCallback
): Promise<AIResponse> {
  const providerConfig = PROVIDER_CONFIGS.anthropic;

  const response = await fetch(providerConfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey!,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: providerConfig.model,
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        { role: 'user', content: prompt },
      ],
      stream: useStreaming,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { success: false, error: `API 错误: ${error}` };
  }

  if (useStreaming && onChunk) {
    return await processAnthropicStream(response, onChunk);
  }

  const data = await response.json();
  const result = data.content?.[0]?.text;

  if (result) {
    return { success: true, result };
  }

  return { success: false, error: 'AI 无响应' };
}

async function processAnthropicStream(
  response: Response,
  onChunk: OnChunkCallback
): Promise<AIResponse> {
  const reader = response.body?.getReader();
  if (!reader) {
    return { success: false, error: '无法读取流' };
  }

  const decoder = new TextDecoder();
  let fullText = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              const content = parsed.delta.text;
              fullText += content;
              onChunk(content, fullText);
            }
          } catch {
            // Skip invalid JSON lines
          }
        }
      }
    }

    if (fullText) {
      return { success: true, result: fullText };
    }
    return { success: false, error: 'AI 无响应' };
  } finally {
    reader.releaseLock();
  }
}

// Gemini API
async function callGeminiAPI(
  prompt: string,
  systemPrompt: string,
  config: MenuConfig,
  useStreaming: boolean,
  onChunk?: OnChunkCallback
): Promise<AIResponse> {
  const providerConfig = PROVIDER_CONFIGS.gemini;
  const endpoint = useStreaming ? 'streamGenerateContent' : 'generateContent';
  const apiUrl = `${providerConfig.apiUrl}/${providerConfig.model}:${endpoint}?key=${config.apiKey}${useStreaming ? '&alt=sse' : ''}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\n${prompt}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { success: false, error: `API 错误: ${error}` };
  }

  if (useStreaming && onChunk) {
    return await processGeminiStream(response, onChunk);
  }

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (result) {
    return { success: true, result };
  }

  return { success: false, error: 'AI 无响应' };
}

async function processGeminiStream(
  response: Response,
  onChunk: OnChunkCallback
): Promise<AIResponse> {
  const reader = response.body?.getReader();
  if (!reader) {
    return { success: false, error: '无法读取流' };
  }

  const decoder = new TextDecoder();
  let fullText = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          try {
            const parsed = JSON.parse(data);
            const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) {
              fullText += content;
              onChunk(content, fullText);
            }
          } catch {
            // Skip invalid JSON lines
          }
        }
      }
    }

    if (fullText) {
      return { success: true, result: fullText };
    }
    return { success: false, error: 'AI 无响应' };
  } finally {
    reader.releaseLock();
  }
}

export function getTranslatePrompt(targetLang: string): string {
  return `You are a professional translator. Translate the following text to ${targetLang}. Only output the translation, nothing else.`;
}

export function getSummarizePrompt(): string {
  return `You are a summarization expert. Summarize the following text in a concise manner, keeping the key points. Use bullet points if appropriate. Output in the same language as the input.`;
}

export function getExplainPrompt(): string {
  return `You are a helpful teacher. Explain the following text in simple terms that anyone can understand. Output in the same language as the input.`;
}

export function getRewritePrompt(): string {
  return `You are a professional editor. Rewrite the following text to make it clearer, more engaging, and well-structured. Keep the same meaning. Output in the same language as the input.`;
}

export function getCodeExplainPrompt(): string {
  return `You are a senior software engineer. Explain the following code in detail, including what it does, how it works, and any important concepts. Output in the same language as the input text (if any) or in English.`;
}

export function getSummarizePagePrompt(): string {
  return `You are a summarization expert. Summarize the following webpage content in a comprehensive but concise manner. Include the main topic, key points, and any important details. Use bullet points for clarity. Output in the same language as the content.`;
}
