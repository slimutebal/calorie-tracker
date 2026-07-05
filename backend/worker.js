const APP_VERSION = '1.3.0';
const ALLOWED_ORIGINS = new Set([
  'https://slimutebal.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
]);
const USER_AGENT = 'CalorieTracker/1.3.0 (https://github.com/slimutebal/calorie-tracker)';
const OFF_SEARCH_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const TIMEOUT_MS = 8500;

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://slimutebal.github.io';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8'
  };
}
function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data, null, 2), { status, headers: corsHeaders(origin) });
}
function normalizeText(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
function normalizeQuery(q) {
  let x = String(q || '').toLowerCase().trim();
  x = x.replace(/[’']/g, '').replace(/\s+/g, ' ');
  x = x.replace(/\bmcd\b/g, 'mcdonalds').replace(/\bmcdonald\b/g, 'mcdonalds');
  x = x.replace(/\bchees\s+burger\b/g, 'cheeseburger').replace(/\bcheese\s+burger\b/g, 'cheeseburger');
  x = x.replace(/\bchese\s*burger\b/g, 'cheeseburger');
  return x.trim();
}
function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const raw of arr) {
    const v = String(raw || '').trim();
    const k = normalizeText(v);
    if (v && !seen.has(k)) { seen.add(k); out.push(v); }
  }
  return out;
}
function buildQueries(q) {
  const raw = String(q || '').trim();
  const norm = normalizeQuery(raw);
  const n = normalizeText(norm);
  const arr = [raw, norm];
  if (/mcdonalds/.test(n) && /cheeseburger|cheese burger|burger/.test(n)) {
    arr.push('mcdonalds cheeseburger', 'mcdonalds cheese burger', 'cheeseburger');
  }
  if (/cheeseburger/.test(n)) arr.push('cheese burger', 'cheeseburger');
  if (/burger/.test(n)) arr.push('burger');
  return unique(arr).slice(0, 6);
}
function timeoutSignal(ms) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort('timeout'), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(id) };
}
function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function energyKcal(nutriments, suffix) {
  const kcal = num(nutriments && nutriments[`energy-kcal_${suffix}`]);
  if (kcal != null) return kcal;
  const kj = num(nutriments && nutriments[`energy_${suffix}`]);
  if (kj != null) return kj / 4.184;
  return null;
}
function servingGrams(text) {
  const m = String(text || '').toLowerCase().replace(',', '.').match(/(\d+(?:\.\d+)?)\s*(g|gr|gram|grams|ml)/);
  if (!m) return null;
  const v = Number(m[1]);
  return Number.isFinite(v) && v > 0 ? v : null;
}
function inferCategory(name) {
  const n = normalizeText(name);
  if (/drink|milk|coffee|tea|juice|cola|water|soda|minuman|kopi|teh/.test(n)) return 'minuman';
  if (/bread|rice|noodle|pasta|burger|pizza|cereal|oat|roti|nasi|mie/.test(n)) return 'pokok';
  if (/chicken|beef|fish|egg|tofu|tempe|meat|ayam|sapi|ikan|telur/.test(n)) return 'lauk';
  if (/snack|chip|cookie|biscuit|chocolate|candy|kerupuk/.test(n)) return 'camilan';
  return 'camilan';
}
function productUrl(p) {
  return p.url || (p.code ? `https://world.openfoodfacts.org/product/${encodeURIComponent(p.code)}` : 'https://world.openfoodfacts.org/');
}
function confidence(p, food, servG) {
  if (food.name && food.brand && food.per100.kcal && servG) return 'high';
  if (food.name && food.per100.kcal) return 'medium';
  return 'low';
}
function mapProduct(p, i) {
  const name = String(p.product_name_en || p.product_name || p.generic_name || '').trim();
  if (!name) return null;
  const brand = String(p.brands || '').split(',')[0].trim();
  const n = p.nutriments || {};
  let kcal100 = energyKcal(n, '100g');
  if (kcal100 == null) kcal100 = energyKcal(n, 'serving');
  if (kcal100 == null || !Number.isFinite(kcal100) || kcal100 <= 0) return null;
  const servG = servingGrams(p.serving_size || p.quantity || '');
  const macro = (k) => num(n[`${k}_100g`]) ?? num(n[`${k}_serving`]) ?? 0;
  const food = {
    id: `off:${p.code || i}`,
    name,
    brand,
    category: inferCategory(name),
    cuisine: 'online',
    source: 'Open Food Facts',
    sourceId: p.code || '',
    sourceUrl: productUrl(p),
    calories: kcal100,
    calorieUnit: 'kcal',
    basis: 'per 100 g',
    servingSize: p.serving_size || p.quantity || '',
    servingGrams: servG,
    per100: {
      kcal: kcal100,
      protein: macro('proteins'),
      carbs: macro('carbohydrates'),
      fat: macro('fat')
    },
    estimated: true,
    editable: true
  };
  food.confidence = confidence(p, food, servG);
  return food;
}
async function fetchJson(url, timeoutMs = TIMEOUT_MS) {
  const timer = timeoutSignal(timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': USER_AGENT
      },
      signal: timer.signal
    });
    if (!res.ok) throw new Error(`upstream_${res.status}`);
    return await res.json();
  } finally {
    timer.cancel();
  }
}
async function openFoodFactsSearch(query) {
  const fields = ['code','product_name','product_name_en','generic_name','brands','serving_size','quantity','nutriments','url'].join(',');
  const url = `${OFF_SEARCH_URL}?search_simple=1&action=process&json=1&page_size=10&sort_by=popularity_key&fields=${encodeURIComponent(fields)}&search_terms=${encodeURIComponent(query)}`;
  const data = await fetchJson(url);
  const products = Array.isArray(data.products) ? data.products : [];
  return products.map(mapProduct).filter(Boolean).slice(0, 8);
}
async function lookup(query) {
  const queries = buildQueries(query);
  let lastError = null;
  for (const q of queries) {
    try {
      const results = await openFoodFactsSearch(q);
      if (results.length) return { matchedQuery: q, results };
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  return { matchedQuery: queries[0] || query, results: [] };
}
async function handleLookup(request, env, ctx, origin) {
  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();
  if (!q || q.length < 2) return json({ ok: false, error: 'missing_query', results: [] }, 400, origin);
  if (q.length > 120) return json({ ok: false, error: 'query_too_long', results: [] }, 400, origin);

  const canonical = normalizeQuery(q);
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = '/__cache/lookup';
  cacheUrl.search = `?q=${encodeURIComponent(canonical)}`;
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) {
    const headers = new Headers(cached.headers);
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => headers.set(k, v));
    headers.set('X-Calorie-Tracker-Cache', 'HIT');
    return new Response(cached.body, { status: cached.status, headers });
  }

  const startedAt = Date.now();
  const result = await lookup(q);
  const body = {
    ok: true,
    version: APP_VERSION,
    provider: 'Calorie Tracker API',
    upstream: 'Open Food Facts',
    query: q,
    normalizedQuery: canonical,
    matchedQuery: result.matchedQuery,
    elapsedMs: Date.now() - startedAt,
    results: result.results
  };
  const response = json(body, 200, origin);
  response.headers.set('Cache-Control', `public, max-age=${CACHE_TTL_SECONDS}`);
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
    const url = new URL(request.url);
    try {
      if (url.pathname === '/' || url.pathname === '') {
        return json({ ok: true, service: 'Calorie Tracker API', version: APP_VERSION, endpoints: ['/lookup?q=cheeseburger'] }, 200, origin);
      }
      if (url.pathname === '/lookup') return await handleLookup(request, env, ctx, origin);
      return json({ ok: false, error: 'not_found' }, 404, origin);
    } catch (err) {
      return json({ ok: false, error: 'lookup_failed', message: String(err && err.message || err), results: [] }, 502, origin);
    }
  }
};
