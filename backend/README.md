# Calorie Tracker API Worker

Copy `worker.js` into Cloudflare Workers dashboard for `calorie-tracker-api`.

Endpoint:

```text
GET /lookup?q=cheeseburger
```

Production URL configured in the PWA:

```text
https://calorie-tracker-api.illofiajie-ia.workers.dev/lookup
```

Personal food logs are not sent to this API. Only the explicit search keyword is sent when Online Food Lookup is used.
