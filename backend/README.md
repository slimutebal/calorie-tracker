# Calorie Tracker API Worker

Cloudflare Worker backend for Calorie Tracker online food lookup.

## v1.4.1 providers

- Curated Restaurant Pack, focused on common Indonesian/Yogyakarta-relevant chains, now including Tier 2 brands and Jogja snack items.
- Open Food Facts, called from the Worker with the Calorie Tracker User-Agent.
- USDA FoodData Central, optional and enabled only when `USDA_API_KEY` is configured as a Cloudflare Worker secret.

## Deploy

1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Open `calorie-tracker-api`.
4. Replace the Worker code with `backend/worker.js`.
5. Deploy.

## Optional USDA API key

Create a Cloudflare Worker secret named:

```text
USDA_API_KEY
```

Do not commit USDA keys to GitHub or place them in `index.html`.

## Test endpoints

```text
https://calorie-tracker-api.illofiajie-ia.workers.dev/
https://calorie-tracker-api.illofiajie-ia.workers.dev/lookup?q=mcd%20cheeseburger
https://calorie-tracker-api.illofiajie-ia.workers.dev/lookup?q=rice
```

Only the search keyword is sent to this Worker. Food logs, history, targets, settings, custom foods, and backups remain local in the PWA.
