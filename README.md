# Calorie Tracker

**Version:** 1.2.0  
**Repository:** https://github.com/slimutebal/calorie-tracker

Calorie Tracker is a static, mobile-first **Progressive Web App (PWA)** for daily calorie and macronutrient tracking. It includes a built-in food library covering common **Indonesian, Western, Middle Eastern, and Asian** foods, plus optional online lookup through Open Food Facts. It has no server, no account system, and no telemetry. All personal food logs stay **only on the device/browser that uses the app**.

> **Nutrition disclaimer:** all nutrition values are estimates. Actual values may vary by brand, recipe, cooking method, oil amount, and portion size. This app is for personal tracking only and is not medical or dietary advice.

---

## What changed in v1.2.0

- Added optional **Online Food Lookup** using Open Food Facts.
- Added an explicit Settings toggle for Online Food Lookup.
- Added Search Online results on the Add screen with source, confidence, serving, calories, and macro preview.
- Online results can be used, edited, or saved as custom foods for offline reuse.
- Added privacy copy explaining that online lookup only sends the search keyword; logs, history, and settings remain local.
- Bumped the app version to `1.2.0` and the service worker cache to `calorietrack-shell-v9`.

---

## Features

- **Today dashboard** — calorie ring, consumed/remaining calories, macro progress, water tracker, meal sections, and top calorie contributors.
- **Quick Add** — food search, favorites, recent foods, quantity presets, and household units such as serving, bowl, glass, cup, tablespoon, teaspoon, piece, pack, skewer, and scoop.
- **Built-in food database** — about 112 foods across Indonesian, Western, Middle Eastern, and Asian cuisines.
- **Cuisine filter** — All / Indonesian / Western / Middle Eastern / Asian / Custom.
- **Custom foods** — create, edit, delete, search, favorite, and reuse your own foods.
- **Online Food Lookup** — optionally search Open Food Facts from the Add screen, then use, edit, or save selected results locally.
- **Meal templates** — combine multiple items and log them again with one tap.
- **History and trend view** — daily summaries, 7-day trend, weekly average, best/worst day, and target adherence.
- **Targets** — calories, protein, carbs, fat, and water.
- **Language** — English by default; Indonesian available in Settings.
- **Theme** — Light / Dark / Automatic.
- **Backup and restore** — export/import JSON and reset with confirmation.
- **Offline use** — app shell is cached after the first successful load.

---

## Privacy and local data

- No login.
- No backend.
- No analytics.
- No telemetry.
- No food log upload.
- No cloud sync.
- Optional Online Food Lookup sends only the typed search keyword to Open Food Facts when used.
- No third-party tracking.

User data is stored locally in the browser using `localStorage` under the `calorietrack_id_*` prefix.

This means:

- Your data does **not** appear in the GitHub repository.
- Each phone/browser has its **own separate data**.
- If two people install the same GitHub Pages link on different phones, their data does not mix.
- Clearing Safari website data, removing site data, or deleting the PWA may delete local data.
- Use **Settings → Export Backup (JSON)** regularly.
- Online results saved as custom foods are stored locally and included in backups.

---

## File structure

```text
index.html            # Main app: HTML + CSS + JavaScript + built-in food database
manifest.webmanifest  # PWA metadata for Add to Home Screen
service-worker.js     # Offline app-shell cache
assets/icons/         # icon-192.png, icon-512.png, apple-touch-icon.png
README.md             # Project notes and deployment guide
```

---

## Run locally

Because the app uses a service worker, run it through a local web server. Do not open `index.html` directly with `file://`.

```bash
cd calorie-tracker
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Alternative Python command on some systems:

```bash
python3 -m http.server 8080
```

---

## Deploy to GitHub Pages

Target repository:

```text
https://github.com/slimutebal/calorie-tracker
```

### Manual upload method

1. Extract the project `.zip` file.
2. Open the GitHub repository.
3. Choose **Add file → Upload files**.
4. Upload the project files/folders directly into the repository root:

```text
README.md
index.html
manifest.webmanifest
service-worker.js
assets/
```

5. Commit the changes.
6. Go to **Settings → Pages**.
7. Set:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

8. Save.
9. Wait for GitHub Pages to publish.

Expected live URL:

```text
https://slimutebal.github.io/calorie-tracker/
```

---

## Updating an existing GitHub Pages/PWA install

This app uses a service worker cache. When you change app files, update the cache version in `service-worker.js`:

```js
const CACHE_VERSION = 'calorietrack-shell-v9';
```

For future releases, increase it again, for example:

```js
const CACHE_VERSION = 'calorietrack-shell-v10';
```

After uploading an update:

1. Commit the updated files.
2. Wait for GitHub Pages to redeploy.
3. On iPhone, close and reopen the app.
4. If the old layout still appears, open the GitHub Pages URL in Safari once, refresh, then reopen from Home Screen.
5. As a last resort, remove the Home Screen app and add it again after backing up data.

---

## Add to Home Screen on iPhone

1. Open this URL in **Safari**:

```text
https://slimutebal.github.io/calorie-tracker/
```

2. Tap **Share**.
3. Tap **Add to Home Screen**.
4. Confirm the name: **Calorie Tracker**.
5. Tap **Add**.
6. Launch it from the Home Screen icon.

The app should open in standalone/full-screen PWA mode and respect the iPhone safe area.

---

## Language

Calorie Tracker uses **English by default** for new installs. Indonesian is available in:

```text
Settings → Language
```

Notes:

- UI labels switch immediately.
- Built-in foods can be searched in both English and Indonesian aliases where available.
- Custom foods keep the name typed by the user.
- Already logged entries keep their saved snapshot and do not automatically rename retroactively.

---

## Cuisines and custom foods

The built-in food database includes common foods from:

- Indonesian
- Western
- Middle Eastern
- Asian

The Add screen includes cuisine filter chips:

```text
All / Indonesian / Western / Middle Eastern / Asian / Custom
```

All values are estimates. For better accuracy, create custom foods using actual nutrition labels or personally measured recipes.

---

## Backup and restore

Use:

```text
Settings → Data → Export Backup (JSON)
```

The backup includes local settings, logs, custom foods, templates, favorites, and recent foods.

To restore:

```text
Settings → Data → Import Backup
```

Keep backups before clearing Safari data, deleting the PWA, changing devices, or resetting app data.

---

## Known limitations

- Data is local only and does not sync across devices.
- iOS/Safari may remove site data under some conditions, especially if storage is cleared manually or the device is low on space.
- No push notifications.
- Online lookup depends on Open Food Facts availability, coverage, and data completeness.
- Restaurant/local foods may be missing or inaccurate in online results.
- No barcode scanner.
- No camera food recognition.
- No cloud account.
- No monthly analytics view yet.
- Nutrition values are estimates and not medical-grade data.

---

## Release notes

### v1.2.0

- Added optional Online Food Lookup powered by Open Food Facts.
- Added Search Online cards with source, confidence, serving, calories, and macro preview.
- Added Use / Edit / Save Custom actions for online results.
- Online lookup only sends the typed keyword to Open Food Facts when explicitly used.
- Updated app version to `1.2.0`.
- Service worker cache bumped to `calorietrack-shell-v9`.

### v1.1.4

- Redesigned the bottom navigation as an iOS Fitness-inspired pill dock.
- Integrated the center Add (+) button into the dock instead of making it feel overly detached.
- Added active capsule styling for non-Add tabs.
- Updated app version to `1.1.4`.
- Service worker cache bumped to `calorietrack-shell-v7`.

### v1.1.3

- Fine-tuned bottom navigation position after v1.1.2.
- Raised the glass dock slightly so bottom rounded corners are not clipped.
- Added breathing room above the iOS home indicator.
- App version updated to `1.1.3`.
- Service worker cache bumped to `calorietrack-shell-v6`.

### v1.1.2

- Lowered bottom navigation dock positioning for iPhone PWA.
- Adjusted center Add button alignment.
- Fixed History date strip default scroll so the newest date appears first/rightmost.
- Service worker cache bumped to `calorietrack-shell-v5`.

### v1.1.1

- Bottom navigation spacing fix for iPhone PWA.
- Center Add button vertical alignment fix.
- Service worker cache bumped to `calorietrack-shell-v4`.

### v1.1.0

- App renamed to **Calorie Tracker**.
- English set as default language for new installs.
- Updated PWA icons.
- Service worker cache bumped to `calorietrack-shell-v3`.

---

## License

Use, modify, and share freely for personal purposes.
