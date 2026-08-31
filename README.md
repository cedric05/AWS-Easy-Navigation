# AWS Easy Navigation

A Chrome extension to quickly bookmark and navigate to AWS console pages without relying on account-specific URLs. Perfect for federated authentication setups where direct URLs aren't available.

## Problem

With federated AWS logins, the console URL doesn't include your account information, making it impossible to bookmark specific AWS services like:
- VPC Console
- EC2 Instances
- Route53 Hosted Zones
- S3 Buckets
- And many more AWS services

This extension solves that by letting you bookmark the console path (ignoring the hostname) and navigate directly from the toolbar.

## Features

✨ **Quick Access Presets** - One-click navigation to commonly used AWS services:
- Home (us-west-2, us-east-1, eu-west-1)
- EC2, S3, VPC, Route53, RDS, Lambda, DynamoDB, CloudFormation, IAM

📌 **Custom Bookmarks** - Save any AWS console page with a custom name

🔄 **Drag-to-Reorder** - Organize bookmarks in your preferred order

✏️ **Rename Bookmarks** - Edit bookmark names anytime

🗑️ **Delete Management** - Remove individual bookmarks or clear all at once

🔒 **Privacy-First** - All data stored locally, no external requests

## Installation

### From Chrome Web Store
[AWS Easy Navigation - Chrome Web Store](https://chrome.google.com/webstore) *(Coming soon)*

### From Source (Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/cedric05/AWS-Easy-Navigation.git
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
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist/` folder
   - Click the extension icon in your toolbar to start using it!

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

Outputs to `dist/` folder ready for loading into Chrome.

### Development Mode

```bash
npm run dev
```

Watches for changes and rebuilds automatically.

## Project Structure

```
├── src/
│   ├── Popup.svelte       # Main UI component (Svelte)
│   ├── popup.ts           # Popup entry point
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions (storage, navigation, URL parsing)
├── images/                # Extension icons (SVG)
│   ├── icon-16.svg
│   ├── icon-48.svg
│   └── icon-128.svg
├── popup.html             # Popup template
├── manifest.json          # Extension manifest (Chrome requirement)
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── build-script.js        # Post-build asset copying
```

## Tech Stack

- **Framework**: Svelte 4.2.8 (compiles to ~5KB vanilla JavaScript)
- **Language**: TypeScript 5.3.3 (strict mode)
- **Build Tool**: Vite 5.0.8
- **Storage**: Chrome Storage API (local)
- **Browser APIs**: chrome.tabs, chrome.storage

## Usage

### Adding a Bookmark

1. Navigate to any AWS console page (e.g., https://console.aws.amazon.com/vpc)
2. Click the extension icon in your toolbar
3. The "+ Bookmark" button will be active (if on an AWS page)
4. Enter a name for your bookmark
5. Click "Save"
6. Your bookmark appears in the list below "Quick Access"

### Using Quick Access Presets

The "Quick Access" section provides one-click navigation to popular AWS services:
- Click any preset button (e.g., "🖥️ EC2 Instances")
- You'll navigate to that service in the current tab
- Works from any AWS console page

### Managing Bookmarks

- **Go**: Navigate to a bookmarked AWS path
- **Rename**: Edit the bookmark name
- **Delete (✕)**: Remove a bookmark
- **Reorder**: Drag bookmarks to change their order
- **Clear All**: Delete all bookmarks at once

## Permissions

This extension requests minimal permissions:

- **`activeTab`**: Read current tab URL to extract AWS console path when saving bookmarks
- **`tabs`**: Navigate to bookmarked paths by updating tab URL
- **`storage`**: Store bookmarks locally using Chrome's storage API

**No network requests are made.** All data stays on your device.

## Privacy & Security

✅ No tracking or analytics  
✅ No personal data collection  
✅ No external API calls  
✅ All data stored locally on your device  
✅ Can delete all bookmarks instantly  
✅ Open source - review the code anytime

## Contributing

Contributions are welcome! Feel free to:
- Report issues
- Suggest features
- Submit pull requests

## License

MIT License - see LICENSE file for details

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/cedric05/AWS-Easy-Navigation/issues)
- **Email**: kesavarapu.siva@gmail.com

---

Made with ❤️ for AWS users navigating federated authentication
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
