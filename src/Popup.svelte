<script lang="ts">
  import { onMount } from 'svelte';
  import type { Bookmark } from './types';
  import {
    extractPathFromUrl,
    isAwsConsoleUrl,
    generateBookmarkId,
    getCurrentTabUrl,
    navigateToBookmark,
    loadBookmarks,
    saveBookmarks,
    sortBookmarks,
  } from './utils';

  let bookmarks: Bookmark[] = [];
  let currentPath: string | null = null;
  let showForm = false;
  let bookmarkName = '';
  let isAwsPage = false;

  // Preset quick-access bookmarks for common AWS services and regions
  const presets = [
    { name: 'Home (us-west-2)', path: '/console/home?region=us-west-2' },
    { name: 'Home (us-east-1)', path: '/console/home?region=us-east-1' },
    { name: 'Home (eu-west-1)', path: '/console/home?region=eu-west-1' },
    { name: 'EC2 Instances', path: '/ec2/v2/home' },
    { name: 'S3 Buckets', path: '/s3/home' },
    { name: 'VPC', path: '/vpc/' },
    { name: 'Route53', path: '/route53/hostedzonesV2/' },
    { name: 'RDS', path: '/rds/home' },
    { name: 'Lambda', path: '/lambda/home' },
    { name: 'DynamoDB', path: '/dynamodbv2/home' },
    { name: 'CloudFormation', path: '/cloudformation/home' },
    { name: 'IAM', path: '/iam/home' },
  ];

  onMount(async () => {
    await loadAndRenderBookmarks();
    await checkCurrentTab();
  });

  async function loadAndRenderBookmarks(): Promise<void> {
    bookmarks = sortBookmarks(await loadBookmarks());
  }

  async function checkCurrentTab(): Promise<void> {
    const url = await getCurrentTabUrl();
    if (!url || !isAwsConsoleUrl(url)) {
      isAwsPage = false;
      return;
    }

    isAwsPage = true;
    currentPath = extractPathFromUrl(url);
  }

  function showBookmarkForm(): void {
    if (!isAwsPage) return;
    showForm = true;
  }

  async function saveBookmark(): Promise<void> {
    if (!currentPath || !bookmarkName.trim()) {
      return;
    }

    const newBookmark: Bookmark = {
      id: generateBookmarkId(),
      name: bookmarkName.trim(),
      path: currentPath,
      createdAt: Date.now(),
      order: bookmarks.length,
    };

    bookmarks = [...bookmarks, newBookmark];
    await saveBookmarks(bookmarks);

    bookmarkName = '';
    showForm = false;
  }

  async function deleteBookmark(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      bookmarks = bookmarks.filter((b) => b.id !== id);
      await saveBookmarks(bookmarks);
    }
  }

  async function renameBookmark(id: string): Promise<void> {
    const bookmark = bookmarks.find((b) => b.id === id);
    if (!bookmark) return;

    const newName = prompt('Enter new bookmark name:', bookmark.name);
    if (newName && newName.trim()) {
      bookmark.name = newName.trim();
      bookmarks = bookmarks;
      await saveBookmarks(bookmarks);
    }
  }

  async function navigateBookmark(path: string): Promise<void> {
    try {
      await navigateToBookmark(path);
      window.close();
    } catch (error) {
      alert('Failed to navigate. Make sure you are on an AWS console page.');
      console.error(error);
    }
  }

  async function clearAllBookmarks(): Promise<void> {
    if (confirm('Are you sure you want to delete ALL bookmarks? This cannot be undone.')) {
      bookmarks = [];
      await saveBookmarks(bookmarks);
    }
  }

  function handleDragStart(e: DragEvent, id: string): void {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', id);
    }
  }

  function handleDragOver(e: DragEvent): void {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    e.preventDefault();
  }

  async function handleDrop(e: DragEvent, targetId: string): Promise<void> {
    e.preventDefault();
    const draggedId = e.dataTransfer?.getData('text/plain');

    if (!draggedId || draggedId === targetId) return;

    const draggedIdx = bookmarks.findIndex((b) => b.id === draggedId);
    const targetIdx = bookmarks.findIndex((b) => b.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const [dragged] = bookmarks.splice(draggedIdx, 1);
    bookmarks.splice(targetIdx, 0, dragged);

    bookmarks.forEach((b, i) => {
      b.order = i;
    });

    bookmarks = bookmarks;
    await saveBookmarks(bookmarks);
  }
</script>

<div class="container">
  <header>
    <h1>AWS Easy Navigation</h1>
    <button
      class="btn btn-primary"
      on:click={showBookmarkForm}
      disabled={!isAwsPage}
      title={isAwsPage ? 'Bookmark current AWS console path' : 'Not on AWS Console'}
    >
      + Bookmark
    </button>
  </header>

  {#if showForm}
    <div class="bookmark-form">
      <div class="form-group">
        <label for="bookmarkName">Bookmark Name:</label>
        <input
          id="bookmarkName"
          type="text"
          bind:value={bookmarkName}
          placeholder="e.g., VPC Console"
          maxlength="50"
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="bookmarkPath">Path:</label>
        <input
          id="bookmarkPath"
          type="text"
          value={currentPath || ''}
          readonly
        />
      </div>
      <div class="form-actions">
        <button class="btn btn-success" on:click={saveBookmark}>Save</button>
        <button class="btn btn-secondary" on:click={() => { showForm = false; bookmarkName = ''; }}>Cancel</button>
      </div>
    </div>
  {/if}

  <div class="presets-section">
    <div class="presets-label">Quick Access</div>
    <div class="presets-grid">
      {#each presets as preset (preset.path)}
        <button
          class="preset-btn"
          on:click={() => navigateBookmark(preset.path)}
          title={preset.path}
        >
          {preset.name}
        </button>
      {/each}
    </div>
  </div>

  <div class="bookmarks-list">
    {#if bookmarks.length === 0}
      <p class="empty-state">No bookmarks yet. Add one from an AWS console page!</p>
    {:else}
      {#each bookmarks as bookmark (bookmark.id)}
        <div
          class="bookmark-item"
          draggable="true"
          on:dragstart={(e) => handleDragStart(e, bookmark.id)}
          on:dragover={handleDragOver}
          on:drop={(e) => handleDrop(e, bookmark.id)}
        >
          <span class="bookmark-drag-handle">⋮</span>
          <div class="bookmark-info">
            <div class="bookmark-name" title={bookmark.path}>{bookmark.name}</div>
            <div class="bookmark-path" title={bookmark.path}>{bookmark.path}</div>
          </div>
          <div class="bookmark-actions">
            <button class="btn-go" on:click={() => navigateBookmark(bookmark.path)}>Go</button>
            <button class="btn-edit" on:click={() => renameBookmark(bookmark.id)}>Rename</button>
            <button class="btn-delete" on:click={() => deleteBookmark(bookmark.id)}>✕</button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <footer>
    <button class="btn btn-danger btn-small" on:click={clearAllBookmarks}>Clear All</button>
    <span class="bookmark-count">{bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}</span>
  </footer>
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      sans-serif;
    background: #f5f5f5;
    color: #333;
    width: 400px;
    max-height: 600px;
    overflow-y: auto;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  header {
    padding: 12px 16px;
    background: linear-gradient(135deg, #ff9900 0%, #ff9900 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 2px solid #f0a000;
  }

  header h1 {
    font-size: 16px;
    font-weight: 600;
    flex: 1;
    margin: 0;
  }

  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #ff9900;
    color: white;
    white-space: nowrap;
  }

  .btn-primary:hover:not(:disabled) {
    background: #f0a000;
  }

  .btn-success {
    background: #27ae60;
    color: white;
  }

  .btn-success:hover {
    background: #229954;
  }

  .btn-secondary {
    background: #95a5a6;
    color: white;
  }

  .btn-secondary:hover {
    background: #7f8c8d;
  }

  .btn-danger {
    background: #e74c3c;
    color: white;
    font-size: 11px;
  }

  .btn-danger:hover {
    background: #c0392b;
  }

  .btn-small {
    padding: 4px 8px;
    font-size: 11px;
  }

  .bookmark-form {
    padding: 12px 16px;
    background: white;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-group label {
    font-size: 12px;
    font-weight: 600;
    color: #555;
  }

  .form-group input {
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 12px;
    font-family: 'Courier New', monospace;
  }

  .form-group input:focus {
    outline: none;
    border-color: #ff9900;
    box-shadow: 0 0 3px rgba(255, 153, 0, 0.3);
  }

  .form-group input[readonly] {
    background: #f9f9f9;
    color: #666;
  }

  .form-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .form-actions .btn {
    flex: 1;
    padding: 8px 12px;
  }

  .bookmarks-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .empty-state {
    padding: 32px 16px;
    text-align: center;
    color: #999;
    font-size: 13px;
    line-height: 1.5;
  }

  .bookmark-item {
    display: flex;
    gap: 8px;
    padding: 10px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    align-items: center;
    transition: all 0.2s ease;
  }

  .bookmark-item:hover {
    border-color: #ff9900;
    box-shadow: 0 2px 4px rgba(255, 153, 0, 0.1);
  }

  .bookmark-drag-handle {
    cursor: grab;
    color: #ccc;
    font-size: 14px;
    flex-shrink: 0;
  }

  .bookmark-drag-handle:active {
    cursor: grabbing;
  }

  .bookmark-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .bookmark-name {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    word-break: break-word;
  }

  .bookmark-path {
    font-size: 11px;
    color: #999;
    font-family: 'Courier New', monospace;
    word-break: break-all;
    max-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookmark-item:hover .bookmark-path {
    white-space: normal;
    max-height: none;
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 2px;
    display: block;
  }

  .bookmark-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .bookmark-actions button {
    padding: 4px 6px;
    font-size: 11px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background: #f0f0f0;
    color: #666;
    transition: all 0.2s ease;
  }

  .bookmark-actions button:hover {
    background: #e0e0e0;
  }

  .btn-go {
    background: #ff9900;
    color: white;
    flex: 1;
    min-width: 60px;
  }

  .btn-go:hover {
    background: #f0a000;
  }

  .btn-edit {
    background: #3498db;
    color: white;
  }

  .btn-edit:hover {
    background: #2980b9;
  }

  .btn-delete {
    background: #e74c3c;
    color: white;
  }

  .btn-delete:hover {
    background: #c0392b;
  }

  footer {
    padding: 8px 16px;
    border-top: 1px solid #ddd;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .bookmark-count {
    font-size: 12px;
    color: #999;
  }

  .presets-section {
    padding: 10px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .presets-label {
    font-size: 11px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .presets-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .preset-btn {
    padding: 8px 10px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    color: #333;
    transition: all 0.2s ease;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .preset-btn:hover {
    background: #ff9900;
    color: white;
    border-color: #ff9900;
    box-shadow: 0 2px 4px rgba(255, 153, 0, 0.2);
  }

  .preset-btn:active {
    transform: scale(0.98);
  }
</style>
