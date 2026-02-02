// Browse Trail - Visual browsing history with semantic search
import { TrailEntry, BrowseSession } from '../types';

const TRAIL_STORAGE_KEY = 'thecircle_browse_trail';
const MAX_TRAIL_ENTRIES = 1000;

// Helper functions for CommandPalette to use

export async function loadBrowseTrailSessions(): Promise<BrowseSession[]> {
  try {
    const result = await chrome.storage.local.get(TRAIL_STORAGE_KEY);
    return result[TRAIL_STORAGE_KEY] || [];
  } catch {
    return [];
  }
}

export async function deleteTrailEntry(id: string): Promise<BrowseSession[]> {
  const sessions = await loadBrowseTrailSessions();

  for (const session of sessions) {
    session.entries = session.entries.filter(e => e.id !== id);
  }

  // Remove empty sessions
  const filtered = sessions.filter(s => s.entries.length > 0);
  await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: filtered });
  return filtered;
}

export async function clearTrailHistory(): Promise<void> {
  await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: [] });
}

export function exportTrailData(sessions: BrowseSession[]): void {
  const allEntries: TrailEntry[] = [];
  for (const session of sessions) {
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

/** Count total entries across all sessions */
function countEntries(sessions: BrowseSession[]): number {
  let count = 0;
  for (const session of sessions) {
    count += session.entries.length;
  }
  return count;
}

/** Trim oldest entries to stay within maxEntries limit */
function trimEntries(sessions: BrowseSession[], maxEntries: number): BrowseSession[] {
  let total = countEntries(sessions);
  if (total <= maxEntries) return sessions;

  // Sessions are newest-first, trim from the end (oldest sessions)
  for (let i = sessions.length - 1; i >= 0 && total > maxEntries; i--) {
    const session = sessions[i];
    const overflow = total - maxEntries;
    if (session.entries.length <= overflow) {
      total -= session.entries.length;
      sessions.splice(i, 1);
    } else {
      session.entries.splice(0, overflow);
      total -= overflow;
    }
  }
  return sessions.filter(s => s.entries.length > 0);
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
    // Record current page on load (no need for beforeunload)
    await this.recordPage();
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

      // Avoid duplicate entries: check recent entries across ALL sessions within 30 seconds
      const recentDuplicateTime = 30000; // 30 seconds
      const now = Date.now();
      outer: for (const s of sessions) {
        // Sessions are sorted newest-first, skip if entire session is too old
        if (s.entries.length > 0 && now - s.entries[s.entries.length - 1].visitedAt > recentDuplicateTime) {
          break; // All remaining sessions are older
        }
        for (let i = s.entries.length - 1; i >= 0; i--) {
          const e = s.entries[i];
          if (now - e.visitedAt > recentDuplicateTime) break;
          if (e.url === entry.url) return; // Skip duplicate
        }
      }

      session.entries.push(entry);

      // Keep only last 30 days of history
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      let filteredSessions = sessions.filter(s => s.startedAt > thirtyDaysAgo);

      // Enforce max entry count
      filteredSessions = trimEntries(filteredSessions, MAX_TRAIL_ENTRIES);

      await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: filteredSessions });
    } catch (error) {
      // On quota exceeded, auto-cleanup and retry
      if (this.isQuotaError(error)) {
        await this.emergencyCleanup();
        return;
      }
      console.error('Failed to record page:', error);
    }
  }

  private isQuotaError(error: unknown): boolean {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') return true;
    if (error instanceof Error && error.message.includes('QUOTA_BYTES')) return true;
    return false;
  }

  private async emergencyCleanup(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(TRAIL_STORAGE_KEY);
      const sessions: BrowseSession[] = result[TRAIL_STORAGE_KEY] || [];
      // Aggressively trim to half the max
      const trimmed = trimEntries(sessions, Math.floor(MAX_TRAIL_ENTRIES / 2));
      await chrome.storage.local.set({ [TRAIL_STORAGE_KEY]: trimmed });
    } catch {
      // Last resort: clear all trail data
      await clearTrailHistory();
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
