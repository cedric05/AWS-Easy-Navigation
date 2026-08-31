# Setup Checklist

Follow these steps to get AWS Easy Navigation running:

## Step 1: Install Dependencies ✓

```bash
npm install
```

This installs:
- TypeScript compiler
- Chrome type definitions (@types/chrome)

**Expected output:** `added X packages in Ys`

---

## Step 2: Build the Extension ✓

```bash
npm run build
```

This will:
1. Compile TypeScript files in `src/` to JavaScript
2. Copy manifest, HTML, CSS, and images to `dist/`
3. Show: "Build completed: manifest, HTML, CSS, and images copied to dist/"

**Check:** Verify `dist/` folder was created with these files:
- ✅ manifest.json
- ✅ popup.html
- ✅ popup.css
- ✅ popup.js
- ✅ background.js
- ✅ content-script.js
- ✅ images/ (folder with SVG icons)

---

## Step 3: Load in Chrome ✓

1. **Open Chrome Extensions Page:**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode:**
   - Click toggle switch in top right corner (turns blue)

3. **Load Unpacked Extension:**
   - Click "Load unpacked" button
   - Browse to your project folder
   - Select the `dist/` folder
   - Click "Select Folder"

4. **Verify Installation:**
   - Extension appears in the list as "AWS Easy Navigation"
   - Icon appears in toolbar (AWS orange bookmark)
   - Status shows "Errors" section is empty

If you see errors, check [Troubleshooting](#troubleshooting) below.

---

## Step 4: Test the Extension ✓

### Test 1: Visit AWS Console

1. Go to any AWS console page:
   - `https://console.aws.amazon.com/ec2/` (EC2)
   - `https://console.aws.amazon.com/vpc/` (VPC)
   - Or any other AWS service

### Test 2: Add a Bookmark

**Method A: From Popup**
1. Click extension icon in toolbar
2. Click **"+ Bookmark Current"**
3. Name it (e.g., "EC2 Instances")
4. Click **"Save Bookmark"**
5. ✅ Bookmark appears in list

**Method B: Context Menu**
1. Right-click on AWS page
2. Select **"Bookmark this AWS page"**
3. Bookmark added with default name
4. Click extension icon to rename it

### Test 3: Navigate Using Bookmark

1. Go to a different AWS page
2. Click extension icon
3. Click **"Go"** next to your bookmark
4. ✅ Page navigates to bookmarked path

### Test 4: Manage Bookmarks

- **Rename:** Click "Rename" button
- **Delete:** Click "✕" button
- **Reorder:** Drag by ⋮ handle
- **Clear All:** Click "Clear All" button

All features working? ✅ **You're done!**

---

## Development Mode ✓

For active development:

```bash
npm run dev
```

This starts TypeScript in watch mode. Changes in `src/` files will auto-compile.

**After editing:**
1. File auto-compiles
2. Go to `chrome://extensions/`
3. Click refresh icon on AWS Easy Navigation
4. Changes appear

---

## Troubleshooting

### Extension doesn't appear in toolbar
- ✅ Reload the page (F5)
- ✅ Restart Chrome
- ✅ Check if extension is disabled (should be blue toggle)

### "Cannot read property 'pathname' of undefined"
- You're on a non-AWS page
- Extension only works on AWS console pages
- Try any page with `.console.aws.amazon.com` in URL

### Changes aren't appearing
- Run: `npm run build`
- Go to `chrome://extensions/`
- Click refresh icon on the extension
- Reload the web page

### Extension shows errors in chrome://extensions/
- Click "Errors" to see details
- Most common: Missing TypeScript compilation
- Solution: Run `npm run build` again

### Bookmarks not saving
- Check you're on an AWS page
- Click extension icon and check for error messages
- Try restarting Chrome

---

## File Locations to Know

| File | Purpose |
|------|---------|
| `src/` | TypeScript source files (edit these) |
| `dist/` | Compiled extension (load this in Chrome) |
| `popup.html` | Popup user interface |
| `popup.css` | Popup styling |
| `manifest.json` | Extension configuration |
| `images/` | SVG icons |

---

## Common Commands

```bash
# Build once
npm run build

# Watch for changes and rebuild
npm run dev

# Just TypeScript watch
npm run watch

# Format code (requires prettier)
npm run format

# Lint TypeScript (requires eslint)
npm run lint
```

---

## Next Steps

- 📖 Read [QUICKSTART.md](./QUICKSTART.md) for usage tips
- 📖 Read [DEVELOPMENT.md](./DEVELOPMENT.md) for advanced topics
- 📖 Check [README.md](./README.md) for feature details
- 💻 Explore `src/` to understand the codebase
- 🚀 Start customizing!

---

## Support

**If stuck:**
1. Check Chrome DevTools (F12) for error messages
2. Look at Service Worker logs: `chrome://extensions/` → Click "Service Worker"
3. Check console in popup: Open popup → Press F12
4. Read [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed debugging

---

## ✅ You're All Set!

The extension is ready to use. Start bookmarking your AWS pages and enjoy faster navigation!

Need help? See the documentation files:
- **Quick questions:** [QUICKSTART.md](./QUICKSTART.md)
- **Setup issues:** This file
- **Development:** [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Features:** [README.md](./README.md)
- **Architecture:** [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
