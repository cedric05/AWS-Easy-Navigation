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
 * Navigates to a bookmark path.
 * When `newTab` is true the bookmark opens in a new tab, keeping the current page.
 */
export async function navigateToBookmark(path: string, newTab = false): Promise<void> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];

  if (!currentTab?.url) {
    throw new Error('No active tab found');
  }

  try {
    const urlObj = new URL(currentTab.url);
    // Construct the full URL by replacing the path, keeping the hostname
    const newUrl = `${urlObj.origin}${path}`;

    if (newTab) {
      await chrome.tabs.create({ url: newUrl });
    } else if (currentTab.id) {
      await chrome.tabs.update(currentTab.id, { url: newUrl });
    }
  } catch {
    throw new Error('Failed to navigate to bookmark');
  }
}

/**
 * Common AWS regions for the quick region switcher
 */
export const AWS_REGIONS: { code: string; name: string }[] = [
  { code: 'us-east-1', name: 'N. Virginia' },
  { code: 'us-east-2', name: 'Ohio' },
  { code: 'us-west-1', name: 'N. California' },
  { code: 'us-west-2', name: 'Oregon' },
  { code: 'eu-west-1', name: 'Ireland' },
  { code: 'eu-west-2', name: 'London' },
  { code: 'eu-central-1', name: 'Frankfurt' },
  { code: 'ap-south-1', name: 'Mumbai' },
  { code: 'ap-southeast-1', name: 'Singapore' },
  { code: 'ap-southeast-2', name: 'Sydney' },
  { code: 'ap-northeast-1', name: 'Tokyo' },
  { code: 'sa-east-1', name: 'São Paulo' },
];

/**
 * Returns the current region for an AWS console URL, if any.
 * Checks the `region` query param first, then a `<region>.console.aws.amazon.com` host.
 */
export function getRegionFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const param = urlObj.searchParams.get('region');
    if (param) return param;

    const hostMatch = urlObj.hostname.match(/^([a-z]{2}-[a-z]+-\d)\.console\.aws\.amazon\.com$/);
    if (hostMatch) return hostMatch[1];

    // Some services keep the region in the hash, e.g. #Instances:region=us-west-2
    const hashMatch = urlObj.hash.match(/region=([a-z]{2}-[a-z]+-\d)/);
    if (hashMatch) return hashMatch[1];

    return null;
  } catch {
    return null;
  }
}

/**
 * Rewrites an AWS console URL to point at a different region, preserving the
 * current service/page. Updates the `region` query param, the regional host
 * (`<region>.console.aws.amazon.com`), and any `region=` value in the hash.
 */
export function switchRegionInUrl(url: string, region: string): string {
  const urlObj = new URL(url);

  // Query param (the canonical location for most consoles)
  urlObj.searchParams.set('region', region);

  // Regional host subdomain, if present
  urlObj.hostname = urlObj.hostname.replace(
    /^[a-z]{2}-[a-z]+-\d\.console\.aws\.amazon\.com$/,
    `${region}.console.aws.amazon.com`
  );

  // Region embedded in the hash (some older consoles)
  urlObj.hash = urlObj.hash.replace(/region=[a-z]{2}-[a-z]+-\d/g, `region=${region}`);

  return urlObj.toString();
}

/**
 * Switches the active tab to the given AWS region, keeping the current page.
 * When `newTab` is true the switched page opens in a new tab.
 */
export async function switchRegion(region: string, newTab = false): Promise<void> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];

  if (!currentTab?.url) {
    throw new Error('No active tab found');
  }

  const newUrl = switchRegionInUrl(currentTab.url, region);

  if (newTab) {
    await chrome.tabs.create({ url: newUrl });
  } else if (currentTab.id) {
    await chrome.tabs.update(currentTab.id, { url: newUrl });
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
