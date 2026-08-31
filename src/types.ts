/**
 * Types for AWS Easy Navigation Extension
 */

export interface Bookmark {
  id: string;
  name: string;
  path: string;
  createdAt: number;
  order: number;
}

export interface StorageData {
  bookmarks: Bookmark[];
}

export type BookmarkOperation = 'save' | 'delete' | 'reorder' | 'clear';
