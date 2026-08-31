# AWS Easy Navigation

A Chrome extension to quickly bookmark and navigate to AWS console pages without relying on account-specific URLs. Perfect for federated authentication setups where direct URLs aren't available.

## Problem

With federated AWS logins, the console URL doesn't include your account information, making it impossible to bookmark specific AWS services like:
- VPC Console
- EC2 Instances
- Route53 Hosted Zones
- ENI Network Interfaces

This extension solves that by letting you bookmark the console path (ignoring the hostname) and navigate directly from the toolbar.

## Features

### Core Features
- **Bookmark Current Page**: Save any AWS console page with a custom name
- **Toolbar Navigation**: Click toolbar icon and select a bookmark to navigate
- **Path-based Bookmarks**: Bookmarks ignore the hostname, working across federated accounts

### Nice-to-Have Features
- **Rename Bookmarks**: Edit bookmark names at any time
- **Reorder Bookmarks**: Drag and drop to organize bookmarks
- **Hover Preview**: Hover over bookmarks to see the full path
- **Context Menu**: Right-click on AWS pages to add them quickly
- **Bulk Actions**: Clear all bookmarks at once

## Installation

### From Source (Development)

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd AWS-Easy-Navigation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist/` folder

### Development Mode

For active development with TypeScript:

```bash
npm run dev
```

This watches for TypeScript changes and rebuilds automatically.

## Project Structure

```
├── src/
│   ├── popup.ts           # Popup UI logic
│   ├── background.ts      # Service worker
│   ├── content-script.ts  # Content script for AWS pages
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── popup.html             # Popup UI markup
├── popup.css              # Popup styles
├── manifest.json          # Extension manifest
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies and scripts
└── build-script.js        # Build helper script
```

## Usage

### Adding Bookmarks

1. **From Popup**:
   - Visit an AWS console page
   - Click the extension icon
   - Click "+ Bookmark Current"
   - Enter a name and save

2. **From Context Menu**:
   - Right-click on any AWS console page
   - Select "Bookmark this AWS page"
   - Rename the bookmark in the popup

### Navigating to Bookmarks

1. Click the extension icon in the toolbar
2. Click "Go" next to any bookmark
3. The current page will navigate to that bookmark's path

### Managing Bookmarks

- **Rename**: Click "Rename" on a bookmark
- **Delete**: Click "✕" on a bookmark
- **Reorder**: Drag bookmarks to reorder them
- **Clear All**: Click "Clear All" in the footer

## Supported AWS URLs

The extension works with:
- `https://*.console.aws.amazon.com/*`
- `https://*.awsapps.com/*`

## Technical Details

### TypeScript

The extension is built entirely in TypeScript for type safety and better development experience.

### Build Process

1. TypeScript files are compiled to JavaScript
2. Manifest and assets are copied to the `dist/` folder
3. The `dist/` folder is ready to load as a Chrome extension

### Storage

Bookmarks are stored using Chrome's `chrome.storage.local` API, persisting across browser sessions.

## Browser Support

Currently supports Chrome and Chrome-based browsers (Edge, Brave, etc.) that support Manifest V3.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
