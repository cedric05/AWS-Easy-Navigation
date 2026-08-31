import type { Bookmark } from './types.js';

/**
 * Extracts the AWS console path from a URL
 * Ignores the hostname since it varies with federated auth
 */
export function extractPathFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Return pathname + search + hash (everything after the hostname)
    return urlObj.pathname + urlObj.search + urlObj.hash;
  } catch {
    return '';
  }
}

/**
 * Checks if a URL is an AWS console URL
 */
export function isAwsConsoleUrl(url: string): boolean {
  const awsConsolePatterns = [
    /console\.aws\.amazon\.com/,
    /awsapps\.com/,
  ];
  return awsConsolePatterns.some(pattern => pattern.test(url));
}

/**
 * Generates a unique ID for a bookmark
 */
export function generateBookmarkId(): string {
  return `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Gets the current tab's URL
 */
export async function getCurrentTabUrl(): Promise<string | null> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url ?? null;
}

/**
 * Navigates to a bookmark path
 */
export async function navigateToBookmark(path: string): Promise<void> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  
  if (!currentTab?.url) {
    throw new Error('No active tab found');
  }

  try {
    const urlObj = new URL(currentTab.url);
    // Construct the full URL by replacing the path, keeping the hostname
    const newUrl = `${urlObj.origin}${path}`;
    
    if (currentTab.id) {
      await chrome.tabs.update(currentTab.id, { url: newUrl });
    }
  } catch {
    throw new Error('Failed to navigate to bookmark');
  }
}

/**
 * Loads bookmarks from storage
 */
export async function loadBookmarks(): Promise<Bookmark[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get('bookmarks', (result) => {
      resolve((result.bookmarks as Bookmark[]) || []);
    });
  });
}

/**
 * Saves bookmarks to storage
 */
export async function saveBookmarks(bookmarks: Bookmark[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ bookmarks }, () => {
      resolve();
    });
  });
}

/**
 * Sorts bookmarks by order
 */
export function sortBookmarks(bookmarks: Bookmark[]): Bookmark[] {
  return [...bookmarks].sort((a, b) => a.order - b.order);
}
