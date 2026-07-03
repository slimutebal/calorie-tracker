# Calorie Tracker

A daily calorie & macronutrient tracker built around **Indonesian and global foods**, with a built-in library covering common **Indonesian, Western, Middle Eastern, and Asian** foods — a static, mobile-first PWA with no server, no account, and no telemetry. All your data stays **only on your device**.

> ⚠️ **Nutrition disclaimer:** every nutrition value in this app is an **estimate** and may vary by brand, recipe, cooking method, and portion size. This app is for personal tracking only — it is **not medical or dietary advice**.

---

## Features

- **Today dashboard** — a calorie ring (consumed / remaining / over), protein–carb–fat progress bars, a water tracker (250 ml glasses), meals grouped by time of day (Breakfast, Lunch, Dinner, Snack), and a "biggest contributors" list.
- **Quick add** — search with aliases ("nasgor" → fried rice, "kopsus" → milk coffee), favorite and recently-logged chips, quantity presets, and Indonesian household units (serving, bowl, glass, cup, tbsp, tsp, piece, pack, skewer, scoop) mapped to grams per food.
- **Built-in database of ~112 foods across 4 cuisines** — Indonesian (rice, instant noodles, fried chicken, rendang, soto, meatballs, gado-gado, tempeh, milk coffee...), Western (oatmeal, sandwiches, burgers, pasta, steak, salads...), Middle Eastern (hummus, falafel, shawarma, biryani, kebab...), and Asian (sushi, ramen, curry, bibimbap, pad thai...). A **cuisine filter** on the Add screen (All / Indonesian / Western / Middle Eastern / Asian / Custom) makes it fast to browse just the region you want.
- **Custom foods** — enter nutrition per serving (e.g. per 250 ml glass); the app converts it to per-100 g automatically. Built-in foods can also be **copied and adjusted**. Adding or editing your own custom foods is the best way to get more accurate personal tracking for dishes, brands, or portions the built-in database doesn't capture exactly.
- **Meal templates** — combine several items ("Coffee with 8 g sugar", "Warteg breakfast") and log them all in one tap.
- **History & trends** — a 14-day date picker, per-day summaries, a 7-day bar chart with a target line, weekly average, best/worst day, and adherence within ±10% of target.
- **Daily targets** for calories, protein, carbs, fat, and water — all adjustable.
- **Language** — switch the interface between **Indonesian and English** anytime in Settings.
- **Theme** — Light / Dark / Automatic (follows system).
- **Backup** — export & import as JSON, reset with confirmation, plus a recovery mode if local data becomes unreadable (the app keeps running and lets you download the raw data).
- **Fully offline** after the first visit (service worker, cache-first).

## Language

Calorie Tracker ships with two interface languages: **English** (default) and **Indonesian**. Switch anytime from **Settings → Language** — the choice is saved on your device and applies immediately, no reload needed.

A few things to know about how translation works:
- **UI chrome** (navigation, buttons, labels, messages) is fully translated.
- **Built-in food names** have an English display name (e.g. "Nasi goreng" ⇄ "Fried rice") used only for what you see on screen; search matches both languages either way.
- **Custom foods and templates** keep whatever name you typed — the app doesn't auto-translate your own entries.
- **Already-logged entries** keep the food name as it was written at the time you logged it (the app snapshots values so past history never changes retroactively). If you log something in English and later switch to Indonesian, that entry still reads in English in your history — this is intentional and matches how amounts and calories are already snapshotted.

## Cuisines & custom foods

The built-in database mixes **Indonesian, Western, Middle Eastern, and Asian** common foods so it's useful beyond a single cuisine. On the **Add** screen, a row of filter chips (All / Indonesian / Western / Middle Eastern / Asian / Custom) lets you narrow the browse list to one region at a time — search still checks food name and aliases regardless of which filter is active. Each food card shows a small cuisine tag so you can tell at a glance where a dish is from. Favorites and recently-logged foods always show up regardless of the active filter, so quick-adds stay fast no matter what you've been eating.

**Every nutrition value in the app — built-in or custom — is an estimate.** Actual calories and macros vary by brand, specific recipe, portion size, and cooking method, sometimes significantly (a home-cooked dish and a restaurant version of the "same" food can differ a lot). For the built-in database this is a general reference, not a lab measurement.

If you want more accurate tracking for something you eat often — your usual coffee order, a specific packaged product, a family recipe — **add it as a custom food** (or copy a built-in food and adjust the numbers) with the nutrition info from the actual label or your own measurement. Custom foods are fully editable anytime from the **Foods** tab.

## Privacy

- No server, login, analytics, third-party cookies, or network requests beyond loading the app's own files.
- Data is stored in the browser's `localStorage` under the `calorietrack_id_*` prefix.
- Clearing Safari/Chrome site data or removing the app from the Home Screen **can delete your data** — export a backup regularly from **Settings → Data**.

## File structure

```
index.html            # the entire app (HTML + CSS + JS + food database)
manifest.webmanifest  # PWA metadata
service-worker.js     # offline cache (bump CACHE_VERSION on updates)
assets/icons/         # icon-192.png, icon-512.png, apple-touch-icon.png
```

## Running locally

Because the app uses a service worker, serve it over a local server (not `file://`):

```bash
cd calorietrack
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploying to GitHub Pages

1. Create a new repository, e.g. `calorietrack-id`, and push the contents of this folder to the `main` branch.
2. In GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / root**.
3. Wait about a minute; the app will be live at `https://<username>.github.io/calorietrack-id/`.
4. All app paths are relative (`./`), so it works fine when hosted in a Pages subfolder.

**When you update the app:** bump `CACHE_VERSION` in `service-worker.js` (e.g. `-v2`) so returning users get the new version.

## Add to Home Screen (iPhone)

1. Open the app's URL in **Safari**.
2. Tap the **Share** button (square with an arrow pointing up).
3. Choose **Add to Home Screen** → **Add**.
4. Launch it from the Home Screen icon — it runs full-screen (standalone), respects the notch/Dynamic Island safe areas, and works offline.

## Known limitations (iOS PWA)

- **iOS can clear site storage** if the app isn't opened for a while or the device is low on space. The app requests persistent storage, but the final decision is up to the OS — export a backup regularly.
- Data is **not synced across devices** (by design — everything is local-only). Moving to a new device means export → import.
- No reminder notifications.
- Exporting on iOS opens Safari's share/download sheet — save the file to the **Files** app.
- The 7-day trend chart doesn't yet support a monthly view.

## License

Use, modify, and share freely for personal purposes.
