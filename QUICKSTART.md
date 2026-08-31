# Quick Start Guide

Get the AWS Easy Navigation extension running in minutes!

## Installation (Development Mode)

### 1. Clone & Install

```bash
git clone <repository-url>
cd AWS-Easy-Navigation
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Load in Chrome

1. Open `chrome://extensions/`
2. Toggle **"Developer mode"** (top right)
3. Click **"Load unpacked"**
4. Select the `dist/` folder
5. ✅ Done! Extension appears in toolbar

## Quick Usage

### Adding a Bookmark

**Method 1: From Popup**
1. Visit any AWS console page
2. Click extension icon in toolbar
3. Click **"+ Bookmark Current"**
4. Enter a name
5. Click **"Save Bookmark"**

**Method 2: Context Menu**
1. Right-click on any AWS page
2. Select **"Bookmark this AWS page"**
3. Rename in popup if needed

### Navigating

1. Click extension icon
2. Click **"Go"** next to any bookmark
3. Page navigates to the bookmarked AWS path

### Managing Bookmarks

| Action | Steps |
|--------|-------|
| **Rename** | Click "Rename" button |
| **Delete** | Click "✕" button |
| **Reorder** | Drag by ⋮ handle |
| **Delete All** | Click "Clear All" |

## Troubleshooting

### Extension won't build
```bash
npm install  # Install dependencies first
npm run build
```

### Changes not appearing
```bash
npm run build      # Rebuild
# Then refresh extension at chrome://extensions/
```

### Not working on AWS pages
- Make sure you're on `*.console.aws.amazon.com` or `*.awsapps.com`
- Check browser console (F12) for errors

## For Development

Watch for changes and auto-rebuild:
```bash
npm run dev
```

Then manually refresh the extension after edits.

## File Structure

```
dist/              ← Load this folder in Chrome
├── manifest.json
├── popup.html
├── popup.css
├── popup.js       (compiled from src/popup.ts)
├── background.js  (compiled from src/background.ts)
└── images/        (SVG icons)

src/               ← Source TypeScript files
├── popup.ts
├── background.ts
├── content-script.ts
├── utils.ts
└── types.ts
```

## Next Steps

- See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed dev guide
- See [README.md](README.md) for feature documentation
- Check Chrome console (F12) for debugging

## Common Commands

```bash
npm run build     # Build once
npm run dev       # Build + watch for changes
npm run watch     # TypeScript watch only
npm run lint      # Check TypeScript
npm run format    # Format code
```

Happy bookmarking! 🔖
