# Calorie Tracker

## What changed in v2.2.3

- Fixed the AI scan backend request path so Gemini image analysis uses a real POST request instead of the lookup-only GET helper.
- Added a visible close button to the AI scan sheet so users can exit even after an analysis error.
- Improved AI scan error messages with backend diagnostics for setup/API issues.
- Bumped the app version to `2.2.3` and the service worker cache to `calorietrack-shell-v17`.


**Version:** 2.2.3  
**Repository:** https://github.com/slimutebal/calorie-tracker

Calorie Tracker is a static, mobile-first **Progressive Web App (PWA)** for daily calorie and macronutrient tracking. It includes a built-in food library covering common **Indonesian, Western, Middle Eastern, and Asian** foods, optional multi-source online lookup through the Calorie Tracker API backend proxy, and optional AI scan for meal photos and nutrition labels. It has no account system and no telemetry. All personal food logs stay **only on the device/browser that uses the app**.

> **Nutrition disclaimer:** all nutrition values are estimates. Actual values may vary by brand, recipe, cooking method, oil amount, and portion size. This app is for personal tracking only and is not medical or dietary advice.

---

## What changed in v2.2.1

- Fixed Scan Meal and Scan Label buttons so they now open the AI scan sheet and trigger the image picker/analyze flow.
- Added the missing frontend AI scan event handlers, image compression, analyze request, editable review form, Save Today, Save Template, and Save Custom actions.
- Bumped the app version to `2.2.1` and the service worker cache to `calorietrack-shell-v15`.

## What changed in v2.2.0

- Added **AI Meal Scan** from the Add screen: take/choose a meal photo, send it to the Calorie Tracker API, review/edit the AI estimate, then save it to today.
- Added **AI Nutrition Label Scan**: scan a packaged food label, review/edit the parsed result, then save it as a custom food.
- Added **Saved AI Meal Templates**: corrected AI meal results can be saved as reusable meal templates.
- Backend now includes `POST /analyze-image` with **Gemini primary** and **Cloudflare Workers AI fallback** when configured.
- Personal food logs, history, targets, settings, and backups remain local on the device. AI scan sends only the selected image for analysis and the backend does not store images.
- Bumped the app version to `2.2.0` and the service worker cache to `calorietrack-shell-v14`.

---

## Features

- **Today dashboard** — calorie ring, consumed/remaining calories, macro progress, water tracker, meal sections, and top calorie contributors.
- **Quick Add** — food search, favorites, recent foods, quantity presets, and household units such as serving, bowl, glass, cup, tablespoon, teaspoon, piece, pack, skewer, and scoop.
- **Built-in food database** — about 112 foods across Indonesian, Western, Middle Eastern, and Asian cuisines.
- **Cuisine filter** — All / Indonesian / Western / Middle Eastern / Asian / Custom.
- **Custom foods** — create, edit, delete, search, favorite, and reuse your own foods.
- **Online Food Lookup** — optionally search through the Calorie Tracker API backend proxy with curated restaurant data, Open Food Facts, and optional USDA results, then use, edit, or save selected results locally.
- **AI Meal Scan** — optional meal photo analysis through the backend. Results must be reviewed/edited before saving.
- **AI Nutrition Label Scan** — optional label photo parsing into a custom food draft.
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
- Backend lookup proxy is used only for optional online food search and AI scan when explicitly used.
- No analytics.
- No telemetry.
- No food log upload.
- No cloud sync.
- Optional Online Food Lookup sends only the typed search keyword to the Calorie Tracker API when used.
- Optional AI Scan sends only the selected image to the Calorie Tracker API/AI provider when used. The app backend is designed not to store images.
- Food logs, history, targets, settings, and backups remain local.
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
backend/worker.js     # Cloudflare Worker lookup proxy + AI scan endpoint
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
backend/
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
const CACHE_VERSION = 'calorietrack-shell-v17';
```

For future releases, increase it again, for example:

```js
const CACHE_VERSION = 'calorietrack-shell-v17';
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


### Backend provider notes

The Cloudflare Worker works without USDA. If you want USDA FoodData Central results, add a Worker secret named:

```text
USDA_API_KEY
```

For v2.2.0 AI scan, configure these optional backend resources in Cloudflare Worker settings:

```text
GEMINI_API_KEY   # Secret, primary AI vision provider
AI               # Workers AI binding, fallback provider
```

Do not commit API keys to GitHub or place them in `index.html`.

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
- Online lookup depends on the Cloudflare Worker lookup API, curated pack coverage, Open Food Facts availability, optional USDA configuration, rate limits, and data completeness.
- AI scan depends on Gemini configuration, Workers AI binding fallback, provider limits, network quality, and image clarity.
- AI scan estimates can be wrong, especially for hidden oil, sauces, mixed dishes, and portion sizes.
- The app caches successful online lookups locally, but first-time searches still require a working network/API response.
- Restaurant/local foods use curated estimates where official nutrition data is not available; verify portion and brand values when accuracy matters.
- No barcode scanner.
- No cloud account.
- No monthly analytics view yet.
- Nutrition values are estimates and not medical-grade data.

---

## Release notes

### v2.2.0

- Added AI Meal Scan from the Add screen.
- Added AI Nutrition Label Scan for packaged-food labels.
- Added option to save corrected AI meal results as reusable meal templates.
- Added backend `POST /analyze-image` endpoint with Gemini primary and Workers AI fallback.
- Updated app privacy copy for image-based AI analysis.
- Updated app version to `2.2.0`.
- Service worker cache bumped to `calorietrack-shell-v14`.

### v1.4.1

- Expanded the Yogyakarta-adjusted Curated Restaurant Pack with Tier 2 brands and Jogja-relevant snack items.
- Added curated estimates for A&W, Domino’s Pizza, Kopi Kenangan, Janji Jiwa, Chatime, Fore Coffee, Excelso, Rocket Chicken, Geprek Bensu / ayam geprek, and Bakpia/Jogja snacks.
- Kept the multi-source backend lookup architecture from v1.4.0.
- Updated app version to `1.4.1`.
- Service worker cache bumped to `calorietrack-shell-v13`.

### v1.4.0

- Added Multi-source Nutrition Lookup through the Cloudflare Worker backend.
- Added Yogyakarta-adjusted Curated Restaurant Pack for common chains.
- Added optional USDA FoodData Central provider support through the `USDA_API_KEY` Worker secret.
- Kept Open Food Facts as an online provider behind the backend proxy.
- Backend now ranks and deduplicates curated, Open Food Facts, and USDA results when available.
- Updated app version to `1.4.0`.
- Service worker cache bumped to `calorietrack-shell-v12`.

### v1.3.0

- Added Cloudflare Worker backend lookup proxy.
- Frontend Online Food Lookup now uses `https://calorie-tracker-api.illofiajie-ia.workers.dev/lookup`.
- Added `backend/worker.js` for manual Worker deployment through the Cloudflare dashboard.
- Backend sends a proper app User-Agent to Open Food Facts and returns normalized nutrition result cards.
- Updated app version to `1.3.0`.
- Service worker cache bumped to `calorietrack-shell-v11`.

### v1.2.1

- Improved Online Food Lookup stability.
- Added timeout handling, query normalization, fallback search terms, and clearer error states.
- Added local cache for successful online lookup results.
- Added alias cleanup for common terms such as `mcd`, `mcdonald`, `chees burger`, and `cheese burger`.
- Updated app version to `1.2.1`.
- Service worker cache bumped to `calorietrack-shell-v10`.

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
