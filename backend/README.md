# Calorie Tracker API Worker

Cloudflare Worker backend for Calorie Tracker online food lookup and optional AI image analysis.

## v1.4.1 providers

- Curated Restaurant Pack, focused on common Indonesian/Yogyakarta-relevant chains, now including Tier 2 brands and Jogja snack items.
- Open Food Facts, called from the Worker with the Calorie Tracker User-Agent.
- USDA FoodData Central, optional and enabled only when `USDA_API_KEY` is configured as a Cloudflare Worker secret.


## v2.2.6 AI scan notes

- `POST /analyze-image` uses Gemini as the primary vision provider when `GEMINI_API_KEY` is configured.
- Cloudflare Workers AI is used as fallback when the `AI` binding is configured.
- AI scan now distinguishes ready-to-eat portions from packaged products, jars, bottles, sachets, boxes, and drink mixes.
- Packaged products default to 1 serving and require serving confirmation instead of using the whole container/package weight.
- `GET /ai-status` reports AI configuration.
- `GET /gemini-models` lists Gemini models available to the configured API key.
- `GET /workers-ai-agree` submits the required Workers AI Llama Vision license agreement once before fallback use.

Required Cloudflare configuration:

```text
Secret: GEMINI_API_KEY
Binding: AI = Workers AI
```

Do not commit Gemini keys to GitHub or place them in frontend files.

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
https://calorie-tracker-api.illofiajie-ia.workers.dev/ai-status
https://calorie-tracker-api.illofiajie-ia.workers.dev/gemini-models
https://calorie-tracker-api.illofiajie-ia.workers.dev/workers-ai-agree
```

Only the search keyword is sent to this Worker. Food logs, history, targets, settings, custom foods, and backups remain local in the PWA.
