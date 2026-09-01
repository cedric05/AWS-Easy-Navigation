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
- **Region Switcher**: Change the AWS region of the current page in place — it only rewrites the `region` parameter (and regional host), so you stay on the same service page instead of being sent to the console home
- **Quick Access Presets**: One-click links to common services (EC2, S3, VPC, Route53, RDS, Lambda, DynamoDB, CloudFormation, IAM)

### Nice-to-Have Features
- **Open in New Tab**: `Ctrl`/`⌘`+click any bookmark's *Go* button or a preset to open it in a new tab (the region switcher has a dedicated ↗ button)
- **Search**: Filter bookmarks by name or path
- **Import / Export**: Back up or share bookmarks as a JSON file
- **Rename Bookmarks**: Edit bookmark names at any time
- **Reorder Bookmarks**: Drag and drop to organize bookmarks
- **Hover Preview**: Hover over bookmarks to see the full path
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

## Packaging & Releases

Build and zip the extension into a distributable bundle:

```bash
npm run package
```

This produces `aws-easy-navigation.zip` (the ZIP accepted by the Chrome Web Store) from the contents of `dist/`.

### Automated releases

Pushing a version tag triggers the [`Release`](.github/workflows/release.yml) GitHub Actions workflow, which builds the extension, attaches `aws-easy-navigation.zip` to a GitHub Release, and uploads it as a build artifact:

```bash
git tag v1.0.1
git push origin v1.0.1
```

**Signed `.crx` (optional):** if a `CRX_PRIVATE_KEY` repository secret is configured (the PEM contents of your extension signing key), the workflow also builds and attaches a signed `aws-easy-navigation.crx`. Without the secret, only the ZIP is produced. To generate a key locally:

```bash
openssl genrsa 2048 > key.pem   # paste the file contents into the CRX_PRIVATE_KEY secret
```

## Project Structure

```
├── src/
│   ├── Popup.svelte       # Popup UI (markup, logic, and styles)
│   ├── popup.ts           # Popup entry point (mounts the Svelte component)
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions (paths, region switching, storage)
├── popup.html             # Popup HTML shell
├── popup.css              # Base popup styles
├── manifest.json          # Extension manifest (Manifest V3)
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite build config
├── package.json           # Dependencies and scripts
└── build-script.js        # Copies manifest, HTML, and images into dist/
```

The UI is built with [Svelte](https://svelte.dev/) and bundled with [Vite](https://vitejs.dev/).

## Usage

### Adding Bookmarks

- Visit an AWS console page
- Click the extension icon
- Click "+ Bookmark"
- Enter a name and save

### Navigating to Bookmarks

1. Click the extension icon in the toolbar
2. Click "Go" next to any bookmark (or a Quick Access preset)
3. The current page navigates to that path — hold `Ctrl`/`⌘` while clicking to open it in a new tab instead

### Switching Region

- On an AWS console page, pick a region from the **Region** dropdown
- The current page reloads in that region, keeping the same service/view
- Use the ↗ button to open the selected region in a new tab

### Managing Bookmarks

- **Search**: Type in the search box to filter by name or path
- **Rename**: Click "Rename" on a bookmark
- **Delete**: Click "✕" on a bookmark
- **Reorder**: Drag bookmarks to reorder them (disabled while searching)
- **Import / Export**: Use the footer buttons to save bookmarks to, or load them from, a JSON file
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
