# Development Guide

This guide explains how to set up, build, and test the AWS Easy Navigation Chrome extension.

## Prerequisites

- Node.js 16+ and npm
- Google Chrome or Chromium-based browser
- Git

## Setup

### 1. Install Dependencies

```bash
npm install
```

This installs TypeScript and Chrome type definitions.

### 2. Build the Extension

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript in `dist/`
- Copy manifest, HTML, CSS, and images to `dist/`

The extension is now ready to load!

### 3. Load in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` folder

The extension should now appear in your Chrome toolbar.

## Development Workflow

### Watch Mode

For development, use watch mode which automatically rebuilds on changes:

```bash
npm run dev
```

This will:
- Start TypeScript compiler in watch mode
- Automatically rebuild when files change
- You can then reload the extension in Chrome using the refresh button

### Manual Reload

After building changes:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the AWS Easy Navigation extension

## Project Structure

```
src/
├── popup.ts           # Main popup UI logic (TypeScript)
├── background.ts      # Service worker for storage & context menus
├── content-script.ts  # Injected into AWS console pages
├── types.ts           # TypeScript interfaces
└── utils.ts           # Shared utility functions

Other files:
├── popup.html         # Popup UI markup
├── popup.css          # Popup styles
├── manifest.json      # Extension configuration
├── images/            # SVG icons (16x16, 48x48, 128x128)
├── tsconfig.json      # TypeScript configuration
├── package.json       # NPM dependencies & scripts
└── build-script.js    # Helper to copy assets to dist/
```

## File Descriptions

### src/types.ts
Defines TypeScript interfaces used across the extension:
- `Bookmark`: Interface for bookmark objects
- `StorageData`: Structure for stored data
- `BookmarkOperation`: Types of bookmark operations

### src/utils.ts
Utility functions used throughout:
- `extractPathFromUrl()`: Extracts AWS path from URL (ignoring hostname)
- `isAwsConsoleUrl()`: Validates if URL is AWS console
- `navigateToBookmark()`: Navigates to a bookmarked path
- `loadBookmarks()` / `saveBookmarks()`: Storage operations
- `generateBookmarkId()`: Creates unique bookmark IDs

### src/popup.ts
Main UI logic for the popup:
- `BookmarkPopup` class handles all popup interactions
- Manages bookmark list rendering
- Handles drag-and-drop reordering
- Manages form for adding/editing bookmarks

### src/background.ts
Service worker that runs in the background:
- Listens for context menu clicks
- Manages chrome.storage
- Sets up right-click "Bookmark this page" menu
- Shows notifications for bookmark actions

### src/content-script.ts
Minimal content script:
- Injected into AWS console pages
- Can be expanded for in-page features

## Testing

### Testing Bookmarks

1. Open AWS Console (any AWS page)
2. Click extension icon → "+ Bookmark Current"
3. Enter a name and click Save
4. Bookmark appears in the list

### Testing Navigation

1. Go to a different AWS console section
2. Click extension icon
3. Click "Go" on any bookmark
4. Should navigate to the bookmarked path

### Testing Context Menu

1. Right-click on any AWS console page
2. Select "Bookmark this AWS page"
3. A default-named bookmark is created
4. Rename it in the popup if needed

### Testing Drag-and-Drop

1. Create multiple bookmarks
2. In the popup, drag bookmarks by the ⋮ handle
3. Drop to reorder
4. Order persists after closing popup

## Debugging

### View Logs

- **Popup logs**: Open popup, press F12 (DevTools)
- **Service worker logs**: 
  - Go to `chrome://extensions/`
  - Click "Service Worker" link under AWS Easy Navigation

### Common Issues

**"Cannot read property 'pathname' of undefined"**
- Usually means you're on a non-AWS page
- The extension checks with `isAwsConsoleUrl()`

**Extension not reloading changes**
- Make sure you ran `npm run build`
- Manually refresh the extension in `chrome://extensions/`

**Bookmarks not saving**
- Check Service Worker logs for storage errors
- Ensure `chrome.storage.local` permissions in manifest.json

## Building for Distribution

To prepare for distribution:

1. Ensure build is complete:
   ```bash
   npm run build
   ```

2. Create a ZIP file of the `dist/` folder:
   ```bash
   cd dist && zip -r ../aws-easy-navigation.zip . && cd ..
   ```

3. Upload `aws-easy-navigation.zip` to the Chrome Web Store

## TypeScript Configuration

The `tsconfig.json` is configured with:
- `target: ES2020` - Modern JavaScript support
- `strict: true` - All strict type checks enabled
- `moduleResolution: node` - Node.js module resolution
- Output to `dist/` directory

## Adding New Features

When adding new features:

1. Write TypeScript in `src/`
2. Add types to `src/types.ts`
3. Add utilities to `src/utils.ts`
4. Build: `npm run build`
5. Test in extension
6. Commit changes

## Performance Considerations

- Bookmarks are stored in `chrome.storage.local` (synchronous access)
- Popup only loads bookmarks when opened
- Drag-and-drop uses in-memory array, saves to storage on drop
- Service worker stays active for context menu

## Security Notes

- Extension only runs on AWS console URLs
- No external API calls
- All data stored locally in Chrome profile
- No tracking or analytics

## Further Reading

- [Chrome Extension Manifest V3 Docs](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
