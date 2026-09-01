# Privacy Policy

**Last Updated:** August 31, 2024

## Overview

AWS Easy Navigation is committed to protecting your privacy. This extension operates with **zero data collection**, **zero tracking**, and **zero external communication**.

## What We Collect

**Nothing.** This extension:
- ❌ Does NOT collect any personal data
- ❌ Does NOT track user behavior
- ❌ Does NOT send data to external servers
- ❌ Does NOT use analytics
- ❌ Does NOT use cookies
- ❌ Does NOT share data with third parties

## How We Store Data

All data is stored **locally on your device** using Chrome's `chrome.storage.local` API:
- AWS console path bookmarks
- Custom bookmark names
- Bookmark ordering preferences

**Data is never transmitted to any server or third party.**

## Permissions We Request

### `activeTab` Permission
- **Purpose**: Read the current tab's URL when you click "Bookmark"
- **Data Access**: Only reads the URL of the current tab
- **Data Usage**: Extracts the AWS path (e.g., `/ec2/v2/home`) and discards the hostname
- **Retention**: Only used during the bookmark save action

### `tabs` Permission
- **Purpose**: Navigate to bookmarked AWS paths
- **Data Access**: Can update the current tab's URL
- **Data Usage**: Only to navigate you to saved AWS paths
- **Retention**: Used only when you click "Go" on a bookmark

### `storage` Permission
- **Purpose**: Store bookmarks locally
- **Data Access**: Chrome's local storage
- **Data Usage**: Stores AWS console paths and bookmark metadata
- **Retention**: Until you manually delete bookmarks

## Data Deletion

You can delete all stored data at any time:
1. Click the extension icon
2. Click "Clear All" button
3. Confirm deletion

All bookmarks will be permanently removed from your device.

## Security

- ✅ No remote code execution
- ✅ No external dependencies
- ✅ No network requests
- ✅ All code is bundled locally
- ✅ Open source - code is available for review

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- GDPR (no personal data collection)
- CCPA (no personal data collection)
- All applicable privacy regulations

## Contact

For privacy concerns or questions:
- **Email**: kesavarapu.siva@gmail.com
- **GitHub Issues**: https://github.com/cedric05/AWS-Easy-Navigation/issues

## Changes to This Policy

We may update this privacy policy periodically. The "Last Updated" date above indicates when this policy was last modified. Your continued use of the extension after changes constitutes acceptance of the updated policy.
