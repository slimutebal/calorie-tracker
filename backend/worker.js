const APP_VERSION = '2.2.6';
const ALLOWED_ORIGINS = new Set([
  'https://slimutebal.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
]);
const USER_AGENT = 'CalorieTracker/2.2.6 (https://github.com/slimutebal/calorie-tracker)';
const OFF_SEARCH_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const USDA_SEARCH_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const TIMEOUT_MS = 8500;
const AI_TIMEOUT_MS = 25000;
const MAX_IMAGE_BASE64_CHARS = 4_800_000;
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_FALLBACK_MODELS = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const WORKERS_AI_VISION_MODEL = '@cf/meta/llama-3.2-11b-vision-instruct';

const CURATED_RESTAURANTS = [
  // McDonald's / McD — Yogyakarta-relevant global chain. Values are practical estimates unless sourceUrl is provided.
  item('cur:mcd-cheeseburger','McDonald\'s Cheeseburger','McDonald\'s','lauk',313.9,15,33,13,114,'mcd cheeseburger mcdonald mcdonalds cheese burger chees burger burger keju','Curated Restaurant Pack'),
  item('cur:mcd-big-mac','McDonald\'s Big Mac','McDonald\'s','lauk',550,25,46,30,220,'mcd big mac mcdonalds bigmac burger','Curated Restaurant Pack'),
  item('cur:mcd-mcchicken','McDonald\'s McChicken','McDonald\'s','lauk',400,15,39,21,160,'mcd mcchicken chicken burger ayam','Curated Restaurant Pack'),
  item('cur:mcd-fries-med','McDonald\'s French Fries Medium','McDonald\'s','camilan',340,4,44,16,117,'mcd fries french fries kentang goreng medium mcdonalds','Curated Restaurant Pack'),
  item('cur:mcd-nuggets-6','McDonald\'s Chicken McNuggets 6 pcs','McDonald\'s','lauk',270,14,16,17,95,'mcd nugget nuggets chicken mcnuggets 6 pcs ayam','Curated Restaurant Pack'),
  item('cur:mcd-coke-med','McDonald\'s Coca-Cola Medium','McDonald\'s','minuman',210,0,53,0,500,'mcd coke coca cola coca-cola soft drink medium','Curated Restaurant Pack'),

  item('cur:kfc-original','KFC Original Recipe Chicken 1 pc','KFC','lauk',320,26,9,21,120,'kfc original chicken ayam original','Curated Restaurant Pack'),
  item('cur:kfc-crispy','KFC Crispy Chicken 1 pc','KFC','lauk',350,24,13,24,130,'kfc crispy chicken ayam crispy','Curated Restaurant Pack'),
  item('cur:kfc-rice','KFC Rice','KFC','pokok',175,4,39,0.5,150,'kfc rice nasi','Curated Restaurant Pack'),
  item('cur:kfc-fries','KFC French Fries Regular','KFC','camilan',280,4,36,13,100,'kfc fries french fries kentang goreng','Curated Restaurant Pack'),
  item('cur:kfc-zinger','KFC Zinger Burger','KFC','lauk',550,26,52,28,230,'kfc zinger burger chicken burger','Curated Restaurant Pack'),
  item('cur:kfc-colonel','KFC Colonel Burger','KFC','lauk',400,18,42,18,180,'kfc colonel burger','Curated Restaurant Pack'),

  item('cur:hokben-chicken-teriyaki','HokBen Chicken Teriyaki','HokBen','lauk',270,22,12,15,140,'hokben hoka hoka bento chicken teriyaki ayam teriyaki','Curated Restaurant Pack'),
  item('cur:hokben-beef-teriyaki','HokBen Beef Teriyaki','HokBen','lauk',300,21,15,17,140,'hokben hoka hoka bento beef teriyaki sapi teriyaki','Curated Restaurant Pack'),
  item('cur:hokben-egg-chicken-roll','HokBen Egg Chicken Roll','HokBen','lauk',320,16,20,20,120,'hokben egg chicken roll ecr hoka hoka bento','Curated Restaurant Pack'),
  item('cur:hokben-ekkado','HokBen Ekkado','HokBen','lauk',190,10,14,10,75,'hokben ekkado hoka hoka bento','Curated Restaurant Pack'),
  item('cur:hokben-rice','HokBen Rice','HokBen','pokok',175,4,39,0.5,150,'hokben rice nasi hoka hoka bento','Curated Restaurant Pack'),

  item('cur:bk-whopper','Burger King Whopper','Burger King','lauk',670,28,54,40,290,'burger king whopper burger','Curated Restaurant Pack'),
  item('cur:bk-cheeseburger','Burger King Cheeseburger','Burger King','lauk',310,16,30,15,120,'burger king cheeseburger cheese burger burger keju','Curated Restaurant Pack'),
  item('cur:bk-chicken-royale','Burger King Chicken Royale','Burger King','lauk',600,25,55,32,250,'burger king chicken royale ayam burger','Curated Restaurant Pack'),
  item('cur:bk-fries-med','Burger King French Fries Medium','Burger King','camilan',380,5,49,18,130,'burger king fries french fries kentang goreng medium','Curated Restaurant Pack'),

  item('cur:richeese-fire-chicken','Richeese Fire Chicken 1 pc','Richeese Factory','lauk',350,24,18,22,130,'richeese fire chicken ayam pedas','Curated Restaurant Pack'),
  item('cur:richeese-fire-wings','Richeese Fire Wings 4 pcs','Richeese Factory','lauk',480,28,22,32,180,'richeese fire wings sayap ayam','Curated Restaurant Pack'),
  item('cur:richeese-cheese-sauce','Richeese Cheese Sauce','Richeese Factory','camilan',100,3,5,8,30,'richeese cheese sauce saus keju','Curated Restaurant Pack'),

  item('cur:pizzahut-slice','Pizza Hut Pizza Slice','Pizza Hut','pokok',280,12,32,12,100,'pizza hut pizza slice pepperoni cheese','Curated Restaurant Pack'),
  item('cur:pizzahut-spaghetti','Pizza Hut Spaghetti Bolognese','Pizza Hut','pokok',550,23,78,17,350,'pizza hut spaghetti bolognese pasta','Curated Restaurant Pack'),
  item('cur:pizzahut-fettuccine','Pizza Hut Creamy Chicken Fettuccine','Pizza Hut','pokok',700,28,80,30,380,'pizza hut creamy chicken fettuccine pasta','Curated Restaurant Pack'),

  item('cur:starbucks-latte-tall','Starbucks Caffè Latte Tall','Starbucks','minuman',150,10,15,6,355,'starbucks latte caffe latte tall kopi susu','Curated Restaurant Pack'),
  item('cur:starbucks-caramel-macchiato','Starbucks Caramel Macchiato Tall','Starbucks','minuman',250,8,35,8,355,'starbucks caramel macchiato kopi','Curated Restaurant Pack'),
  item('cur:starbucks-frappuccino','Starbucks Frappuccino Tall','Starbucks','minuman',250,4,45,7,355,'starbucks frappuccino frappe','Curated Restaurant Pack'),

  item('cur:mixue-cone','Mixue Ice Cream Cone','Mixue','camilan',200,4,30,7,90,'mixue ice cream cone es krim cone','Curated Restaurant Pack'),
  item('cur:mixue-brown-sugar','Mixue Brown Sugar Pearl Milk Tea','Mixue','minuman',420,8,70,12,500,'mixue brown sugar pearl milk tea boba','Curated Restaurant Pack'),
  item('cur:mixue-lemonade','Mixue Fresh Squeezed Lemonade','Mixue','minuman',120,0,30,0,500,'mixue lemonade lemon tea fresh squeezed','Curated Restaurant Pack'),

  item('cur:jco-alcapone','J.CO Alcapone Donut','J.CO','camilan',260,5,32,13,70,'jco j.co alcapone donut donat','Curated Restaurant Pack'),
  item('cur:jco-jcoccino','J.CO Jcoccino','J.CO','minuman',200,7,28,7,300,'jco j.co jcoccino coffee kopi','Curated Restaurant Pack'),

  item('cur:solaria-nasi-goreng-seafood','Solaria Nasi Goreng Seafood','Solaria','pokok',650,25,85,24,450,'solaria nasi goreng seafood','Curated Restaurant Pack'),
  item('cur:solaria-cordon-bleu','Solaria Chicken Cordon Bleu','Solaria','lauk',780,40,55,44,420,'solaria chicken cordon bleu ayam','Curated Restaurant Pack'),
  item('cur:solaria-mie-ayam','Solaria Mie Ayam','Solaria','pokok',520,25,70,16,400,'solaria mie ayam noodle chicken','Curated Restaurant Pack'),

  item('cur:gacoan-mie-suit','Mie Gacoan Mie Suit','Mie Gacoan','pokok',420,12,70,10,350,'mie gacoan mie suit noodle','Curated Restaurant Pack'),
  item('cur:gacoan-mie-hompimpa','Mie Gacoan Mie Hompimpa','Mie Gacoan','pokok',480,14,75,14,360,'mie gacoan mie hompimpa pedas noodle','Curated Restaurant Pack'),
  item('cur:gacoan-udang-keju','Mie Gacoan Udang Keju','Mie Gacoan','camilan',250,9,24,13,100,'mie gacoan udang keju shrimp cheese','Curated Restaurant Pack'),
  item('cur:gacoan-pangsit','Mie Gacoan Pangsit Goreng','Mie Gacoan','camilan',230,8,28,10,100,'mie gacoan pangsit goreng fried wonton','Curated Restaurant Pack'),

  item('cur:olive-wing','Olive Fried Chicken Wing','Olive Fried Chicken','lauk',250,18,12,16,95,'olive fried chicken wing sayap ayam','Curated Restaurant Pack'),
  item('cur:olive-thigh','Olive Fried Chicken Thigh','Olive Fried Chicken','lauk',330,24,14,22,130,'olive fried chicken thigh paha ayam','Curated Restaurant Pack'),
  item('cur:olive-rice','Olive Fried Chicken Rice','Olive Fried Chicken','pokok',175,4,39,0.5,150,'olive fried chicken rice nasi','Curated Restaurant Pack'),
  item('cur:olive-paket','Olive Fried Chicken Paket Ayam Nasi','Olive Fried Chicken','lauk',520,28,55,22,300,'olive fried chicken paket ayam nasi','Curated Restaurant Pack'),

  // Tier 2 — additional Yogyakarta-relevant / common Indonesian chains and snacks.
  item('cur:aw-chicken','A&W Fried Chicken 1 pc','A&W','lauk',320,24,13,22,130,'aw a&w fried chicken ayam goreng','Curated Restaurant Pack'),
  item('cur:aw-beef-burger','A&W Beef Burger','A&W','lauk',430,19,44,20,190,'aw a&w beef burger hamburger','Curated Restaurant Pack'),
  item('cur:aw-curly-fries','A&W Curly Fries','A&W','camilan',320,4,42,15,120,'aw a&w curly fries kentang spiral kentang goreng','Curated Restaurant Pack'),
  item('cur:aw-rootbeer-float','A&W Root Beer Float','A&W','minuman',330,5,60,8,400,'aw a&w root beer float rootbeer soda ice cream','Curated Restaurant Pack'),

  item('cur:dominos-pepperoni-slice','Domino\'s Pepperoni Pizza Slice','Domino\'s Pizza','pokok',300,13,34,13,110,'dominos domino pizza pepperoni slice','Curated Restaurant Pack'),
  item('cur:dominos-cheese-slice','Domino\'s Cheese Pizza Slice','Domino\'s Pizza','pokok',270,12,33,10,105,'dominos domino pizza cheese slice keju','Curated Restaurant Pack'),
  item('cur:dominos-bbq-chicken-slice','Domino\'s BBQ Chicken Pizza Slice','Domino\'s Pizza','pokok',290,14,35,11,110,'dominos domino pizza bbq chicken slice ayam','Curated Restaurant Pack'),
  item('cur:dominos-garlic-bread','Domino\'s Garlic Bread','Domino\'s Pizza','camilan',200,5,30,7,80,'dominos domino garlic bread roti bawang','Curated Restaurant Pack'),

  item('cur:kopken-mantan','Kopi Kenangan Mantan','Kopi Kenangan','minuman',250,6,38,7,350,'kopi kenangan mantan es kopi susu gula aren','Curated Restaurant Pack'),
  item('cur:kopken-americano','Kopi Kenangan Americano','Kopi Kenangan','minuman',15,0,2,0,350,'kopi kenangan americano black coffee kopi hitam','Curated Restaurant Pack'),
  item('cur:kopken-avocado-coffee','Kopi Kenangan Avocado Coffee','Kopi Kenangan','minuman',420,8,62,13,400,'kopi kenangan avocado coffee alpukat kopi','Curated Restaurant Pack'),
  item('cur:kopken-thai-tea','Kopi Kenangan Thai Tea','Kopi Kenangan','minuman',320,5,55,8,400,'kopi kenangan thai tea teh susu','Curated Restaurant Pack'),

  item('cur:janji-es-kopi-susu','Janji Jiwa Es Kopi Susu','Janji Jiwa','minuman',240,6,35,7,350,'janji jiwa es kopi susu kopi susu gula aren','Curated Restaurant Pack'),
  item('cur:janji-americano','Janji Jiwa Americano','Janji Jiwa','minuman',15,0,2,0,350,'janji jiwa americano black coffee kopi hitam','Curated Restaurant Pack'),
  item('cur:janji-toast-ham-cheese','Jiwa Toast Ham & Cheese','Janji Jiwa','camilan',420,18,45,18,180,'janji jiwa jiwa toast ham cheese roti panggang keju','Curated Restaurant Pack'),
  item('cur:janji-matcha-latte','Janji Jiwa Matcha Latte','Janji Jiwa','minuman',300,8,45,8,350,'janji jiwa matcha latte green tea','Curated Restaurant Pack'),

  item('cur:chatime-pearl-milk-tea','Chatime Pearl Milk Tea Regular','Chatime','minuman',430,6,75,12,500,'chatime pearl milk tea boba bubble tea','Curated Restaurant Pack'),
  item('cur:chatime-thai-tea','Chatime Thai Tea Regular','Chatime','minuman',360,5,65,9,500,'chatime thai tea teh susu','Curated Restaurant Pack'),
  item('cur:chatime-taro-milk-tea','Chatime Taro Milk Tea Regular','Chatime','minuman',420,6,73,11,500,'chatime taro milk tea talas boba','Curated Restaurant Pack'),
  item('cur:chatime-grass-jelly','Chatime Grass Jelly Milk Tea Regular','Chatime','minuman',330,6,55,10,500,'chatime grass jelly milk tea cincau','Curated Restaurant Pack'),

  item('cur:fore-aren-latte','Fore Coffee Aren Latte','Fore Coffee','minuman',260,7,40,8,350,'fore coffee aren latte es kopi susu gula aren','Curated Restaurant Pack'),
  item('cur:fore-iced-latte','Fore Coffee Iced Latte','Fore Coffee','minuman',180,8,20,7,350,'fore coffee iced latte kopi susu','Curated Restaurant Pack'),
  item('cur:fore-americano','Fore Coffee Americano','Fore Coffee','minuman',10,0,2,0,350,'fore coffee americano black coffee kopi hitam','Curated Restaurant Pack'),
  item('cur:fore-matcha-latte','Fore Coffee Matcha Latte','Fore Coffee','minuman',300,8,45,8,350,'fore coffee matcha latte green tea','Curated Restaurant Pack'),

  item('cur:excelso-cappuccino','Excelso Cappuccino','Excelso','minuman',150,8,14,7,250,'excelso cappuccino kopi susu','Curated Restaurant Pack'),
  item('cur:excelso-avocado-coffee','Excelso Avocado Coffee','Excelso','minuman',420,8,60,14,400,'excelso avocado coffee alpukat kopi','Curated Restaurant Pack'),
  item('cur:excelso-club-sandwich','Excelso Club Sandwich','Excelso','pokok',600,28,60,26,300,'excelso club sandwich roti ayam telur','Curated Restaurant Pack'),
  item('cur:excelso-nasi-goreng','Excelso Nasi Goreng','Excelso','pokok',650,24,82,25,430,'excelso nasi goreng fried rice','Curated Restaurant Pack'),

  item('cur:rocket-wing','Rocket Chicken Wing','Rocket Chicken','lauk',250,18,12,16,95,'rocket chicken wing sayap ayam','Curated Restaurant Pack'),
  item('cur:rocket-thigh','Rocket Chicken Thigh','Rocket Chicken','lauk',330,24,14,22,130,'rocket chicken thigh paha ayam','Curated Restaurant Pack'),
  item('cur:rocket-burger','Rocket Chicken Burger','Rocket Chicken','lauk',430,20,45,19,180,'rocket chicken burger ayam','Curated Restaurant Pack'),
  item('cur:rocket-paket','Rocket Chicken Paket Ayam Nasi','Rocket Chicken','lauk',520,28,55,22,300,'rocket chicken paket ayam nasi','Curated Restaurant Pack'),

  item('cur:geprek-bensu-ayam','Geprek Bensu Ayam Geprek','Geprek Bensu','lauk',650,35,65,30,380,'geprek bensu ayam geprek sambal','Curated Restaurant Pack'),
  item('cur:geprek-sambal','Ayam Geprek Sambal','Ayam Geprek','lauk',600,32,60,28,350,'ayam geprek sambal nasi geprek','Curated Restaurant Pack'),
  item('cur:geprek-mozzarella','Ayam Geprek Mozzarella','Ayam Geprek','lauk',800,40,70,42,450,'ayam geprek mozzarella keju sambal','Curated Restaurant Pack'),
  item('cur:geprek-rice','Ayam Geprek Rice','Ayam Geprek','pokok',175,4,39,0.5,150,'ayam geprek rice nasi putih','Curated Restaurant Pack'),

  item('cur:bakpia-pathok','Bakpia Pathok 1 pc','Bakpia Jogja','camilan',100,2,18,3,35,'bakpia pathok jogja kacang hijau','Curated Restaurant Pack'),
  item('cur:bakpia-kukus','Bakpia Kukus 1 pc','Bakpia Jogja','camilan',170,3,28,5,60,'bakpia kukus jogja tugu','Curated Restaurant Pack'),
  item('cur:yangko','Yangko Jogja 1 pc','Snack Jogja','camilan',90,1,20,1,30,'yangko jogja snack oleh oleh','Curated Restaurant Pack'),
  item('cur:geplak','Geplak Jogja 1 pc','Snack Jogja','camilan',120,1,24,4,35,'geplak jogja kelapa gula snack','Curated Restaurant Pack')
];

function item(id, name, brand, category, kcal, protein, carbs, fat, servingGrams, aliases, source) {
  const perFactor = servingGrams ? 100 / servingGrams : 1;
  return {
    id, name, brand, category, cuisine: 'online', source, sourceId: id, sourceUrl: '',
    calories: kcal, calorieUnit: 'kcal', basis: 'per serving', basisLabel: 'per serving',
    servingSize: servingGrams ? `1 serving (${servingGrams} g)` : '1 serving', servingGrams,
    per100: {
      kcal: kcal * perFactor,
      protein: (protein || 0) * perFactor,
      carbs: (carbs || 0) * perFactor,
      fat: (fat || 0) * perFactor
    },
    estimated: true, editable: true, confidence: 'medium',
    aliases: String(aliases || '').split(/\s*,\s*/).concat(String(aliases || '').split(/\s+/)).filter(Boolean),
    sourceNote: 'Yogyakarta-adjusted curated restaurant estimate. Verify with the latest restaurant nutrition or portion information when accuracy matters.'
  };
}

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://slimutebal.github.io';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
  x = x.replace(/\bkfc ayam\b/g, 'kfc chicken');
  x = x.replace(/\bfrench fries\b/g, 'fries');
  x = x.replace(/\bnasi\b/g, 'rice');
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
  if (/mcdonalds/.test(n) && /cheeseburger|cheese burger|burger/.test(n)) arr.push('mcdonalds cheeseburger', 'mcdonalds cheese burger', 'cheeseburger');
  if (/cheeseburger/.test(n)) arr.push('cheese burger', 'cheeseburger');
  if (/kfc/.test(n) && /chicken|ayam/.test(n)) arr.push('kfc original chicken', 'kfc crispy chicken');
  if (/hokben|hoka/.test(n)) arr.push('hokben chicken teriyaki', 'hokben beef teriyaki');
  if (/gacoan/.test(n)) arr.push('mie gacoan', 'mie hompimpa', 'mie suit');
  if (/olive/.test(n)) arr.push('olive fried chicken');
  if (/burger/.test(n)) arr.push('burger');
  return unique(arr).slice(0, 8);
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
  if (/drink|milk|coffee|tea|juice|cola|water|soda|minuman|kopi|teh|latte|macchiato|frappuccino|lemonade/.test(n)) return 'minuman';
  if (/bread|rice|noodle|pasta|burger|pizza|cereal|oat|roti|nasi|mie|spaghetti|fettuccine/.test(n)) return 'pokok';
  if (/chicken|beef|fish|egg|tofu|tempe|meat|ayam|sapi|ikan|telur|wings/.test(n)) return 'lauk';
  if (/snack|chip|cookie|biscuit|chocolate|candy|kerupuk|donut|ice cream|fries|pangsit/.test(n)) return 'camilan';
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
function withTimeoutFetch(url, options = {}, timeoutMs = TIMEOUT_MS) {
  const timer = timeoutSignal(timeoutMs);
  return fetch(url, { ...options, signal: timer.signal }).finally(() => timer.cancel());
}
async function fetchJson(url, timeoutMs = TIMEOUT_MS, headers = {}) {
  const res = await withTimeoutFetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'User-Agent': USER_AGENT, ...headers }
  }, timeoutMs);
  if (!res.ok) throw new Error(`upstream_${res.status}`);
  return await res.json();
}
async function fetchJsonRequest(url, options = {}, timeoutMs = TIMEOUT_MS) {
  const res = await withTimeoutFetch(url, options, timeoutMs);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (_) { data = { raw: text.slice(0, 500) }; }
  if (!res.ok) {
    const msg = data && (data.error && data.error.message || data.error || data.message || data.raw) || `upstream_${res.status}`;
    throw new Error(`upstream_${res.status}:${String(msg).slice(0, 180)}`);
  }
  return data;
}
function mapOpenFoodProduct(p, i) {
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
    name, brand,
    category: inferCategory(name), cuisine: 'online', source: 'Open Food Facts',
    sourceId: p.code || '', sourceUrl: productUrl(p), calories: servG ? kcal100 * (servG / 100) : kcal100,
    calorieUnit: 'kcal', basis: servG ? 'per serving' : 'per 100 g', basisLabel: servG ? 'per serving' : 'per 100 g',
    servingSize: p.serving_size || p.quantity || '', servingGrams: servG,
    per100: { kcal: kcal100, protein: macro('proteins'), carbs: macro('carbohydrates'), fat: macro('fat') },
    estimated: true, editable: true
  };
  food.confidence = confidence(p, food, servG);
  return food;
}
async function openFoodFactsSearch(query) {
  const fields = ['code','product_name','product_name_en','generic_name','brands','serving_size','quantity','nutriments','url'].join(',');
  const url = `${OFF_SEARCH_URL}?search_simple=1&action=process&json=1&page_size=10&sort_by=popularity_key&fields=${encodeURIComponent(fields)}&search_terms=${encodeURIComponent(query)}`;
  const data = await fetchJson(url);
  const products = Array.isArray(data.products) ? data.products : [];
  return products.map(mapOpenFoodProduct).filter(Boolean).slice(0, 8);
}
function curatedScore(food, query) {
  const q = normalizeText(query);
  const name = normalizeText(`${food.brand} ${food.name}`);
  const aliases = [food.name, food.brand, ...(food.aliases || [])].map(normalizeText).join(' ');
  if (!q) return 0;
  if (name === q) return 100;
  if (name.includes(q) || q.includes(name)) return 88;
  const terms = q.split(' ').filter(Boolean);
  let hits = 0;
  for (const term of terms) if (aliases.includes(term) || name.includes(term)) hits++;
  const base = hits / Math.max(terms.length, 1);
  let score = Math.round(base * 70);
  if (hits >= 2) score += 15;
  if (normalizeText(food.brand).split(' ').some((b) => q.includes(b))) score += 10;
  return Math.min(score, 95);
}
function curatedSearch(query) {
  const variants = buildQueries(query);
  const best = new Map();
  for (const q of variants) {
    for (const food of CURATED_RESTAURANTS) {
      const score = curatedScore(food, q);
      if (score >= 45) {
        const current = best.get(food.id);
        if (!current || score > current.score) best.set(food.id, { ...food, confidence: score >= 75 ? 'high' : 'medium', providerRank: 1, score });
      }
    }
  }
  return [...best.values()].sort((a, b) => b.score - a.score).slice(0, 6);
}
function nutrientValue(food, names) {
  const list = Array.isArray(food.foodNutrients) ? food.foodNutrients : [];
  const wanted = names.map((x) => x.toLowerCase());
  for (const n of list) {
    const nm = String(n.nutrientName || n.name || '').toLowerCase();
    if (wanted.some((w) => nm.includes(w))) {
      const val = num(n.value || n.amount);
      if (val == null) continue;
      const unit = String(n.unitName || n.unit || '').toUpperCase();
      if (nm.includes('energy') && unit === 'KJ') return val / 4.184;
      return val;
    }
  }
  return null;
}
function mapUsdaFood(f, i) {
  const name = String(f.description || '').trim();
  if (!name) return null;
  const kcal100 = nutrientValue(f, ['energy']);
  if (kcal100 == null || kcal100 <= 0) return null;
  const protein = nutrientValue(f, ['protein']) ?? 0;
  const carbs = nutrientValue(f, ['carbohydrate']) ?? 0;
  const fat = nutrientValue(f, ['total lipid', 'fat']) ?? 0;
  const brand = String(f.brandOwner || f.brandName || '').trim();
  const fdcId = f.fdcId || `usda-${i}`;
  return {
    id: `usda:${fdcId}`,
    name: titleCase(name), brand,
    category: inferCategory(name), cuisine: 'online', source: 'USDA FoodData Central',
    sourceId: String(fdcId), sourceUrl: `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${fdcId}/nutrients`,
    calories: kcal100, calorieUnit: 'kcal', basis: 'per 100 g', basisLabel: 'per 100 g',
    servingSize: '100 g', servingGrams: 100,
    per100: { kcal: kcal100, protein, carbs, fat },
    estimated: true, editable: true, confidence: brand ? 'medium' : 'low', providerRank: 3
  };
}
function titleCase(s) {
  return String(s || '').toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase());
}
async function usdaSearch(query, env) {
  const key = env && env.USDA_API_KEY;
  if (!key) return [];
  const url = `${USDA_SEARCH_URL}?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(query)}&pageSize=8`;
  const data = await fetchJson(url, TIMEOUT_MS + 1500);
  const foods = Array.isArray(data.foods) ? data.foods : [];
  return foods.map(mapUsdaFood).filter(Boolean).slice(0, 6);
}
function dedupeResults(results) {
  const out = [];
  const seen = new Set();
  for (const r of results) {
    const key = normalizeText(`${r.source}:${r.brand}:${r.name}`).slice(0, 120);
    const softKey = normalizeText(`${r.brand}:${r.name}`).slice(0, 120);
    if (seen.has(key) || (r.source !== 'Curated Restaurant Pack' && seen.has(softKey))) continue;
    seen.add(key); seen.add(softKey);
    out.push(r);
  }
  return out;
}
function rankResults(results) {
  const rank = { 'Curated Restaurant Pack': 1, 'Open Food Facts': 2, 'USDA FoodData Central': 3 };
  const conf = { high: 1, medium: 2, low: 3 };
  return results.sort((a, b) => (rank[a.source] || 9) - (rank[b.source] || 9) || (conf[a.confidence] || 9) - (conf[b.confidence] || 9) || (b.calories || 0) - (a.calories || 0));
}
async function lookup(query, env) {
  const queries = buildQueries(query);
  const upstream = [];
  let lastError = null;
  const curated = curatedSearch(query);
  if (curated.length) upstream.push('Curated Restaurant Pack');

  let off = [];
  for (const q of queries) {
    try {
      off = await openFoodFactsSearch(q);
      if (off.length) { upstream.push('Open Food Facts'); break; }
    } catch (err) { lastError = err; }
  }

  let usda = [];
  if (env && env.USDA_API_KEY) {
    for (const q of queries.slice(0, 3)) {
      try {
        usda = await usdaSearch(q, env);
        if (usda.length) { upstream.push('USDA FoodData Central'); break; }
      } catch (err) { lastError = err; }
    }
  }

  const results = rankResults(dedupeResults([...curated, ...off, ...usda])).slice(0, 12);
  if (!results.length && lastError) throw lastError;
  return { matchedQuery: queries[0] || query, upstream, results, usdaEnabled: !!(env && env.USDA_API_KEY) };
}

function aiPrompt(mode, lang = 'en') {
  const language = lang === 'id' ? 'Indonesian' : 'English';
  const common = `You are a cautious nutrition assistant for a calorie tracker. Return JSON only. Use ${language} food names when useful, but keep common restaurant/product names unchanged. Do not claim medical accuracy. If portion size is uncertain, use confidence low or medium. Numbers are estimates only. Never treat the physical weight of a package, bottle, jar, box, sachet, or container as the amount consumed.`;
  const schema = `Return exactly this JSON shape: {"mode":"meal|label","items":[{"name":"food/product name","itemType":"ready_to_eat|packaged_product|ingredient|drink_mix|nutrition_label|unknown","isPackagedProduct":false,"isConsumedPortionVisible":true,"estimatedQuantity":"1 serving / 1 glass / 150 g etc","estimatedGrams":100,"servingLabel":"1 serving","servingsPerContainer":null,"defaultServingCount":1,"requiresServingConfirmation":false,"calories":0,"protein":0,"carbs":0,"fat":0,"confidence":"low|medium|high","notes":"short note"}],"warnings":["..."]}.`;
  if (mode === 'label') {
    return `${common}\nTask: Read the nutrition label in the image. Extract one custom food entry from the label. ${schema} Use calories/macros per serving when visible. If serving size is visible, put it in servingLabel and estimatedQuantity. If servings per container is visible, put the number in servingsPerContainer. If serving size is not visible, set requiresServingConfirmation=true and say so in warnings. Use numbers only for calories/protein/carbs/fat. Use null for estimatedGrams if serving grams are not visible instead of inventing a package weight.`;
  }
  return `${common}\nTask: Analyze the meal or product photo. ${schema}\nCritical serving rules:\n- If the image shows a ready-to-eat portion on a plate, bowl, cup, or hand, estimate the consumed portion and grams.\n- If the image shows a product package/container/jar/bottle/box/sachet/tub/can, classify it as packaged_product, ingredient, or drink_mix. Set isPackagedProduct=true and isConsumedPortionVisible=false. Do NOT estimate consumed grams from the container size.\n- For packaged products, default to 1 serving only, not the whole package. Use servingLabel/estimatedQuantity such as "1 serving", "1 glass", "1 cup", or the visible serving text.\n- If the package says it makes 100 cups/glasses/servings, set servingsPerContainer=100 and defaultServingCount=1.\n- For coffee powder or drink mix such as Nescafe Classic, output a 1 prepared glass/cup serving and note that sugar, milk, or creamer changes calories. Do not output 200 g unless the user is clearly consuming 200 g.\n- If nutrition per serving is not visible, use calories/macros only if highly obvious; otherwise use 0 and requiresServingConfirmation=true.\nInclude hidden-oil/sauce/sugar uncertainty in warnings. Use numbers only for calories/protein/carbs/fat.`;
}
function stripJsonText(text) {
  let t = String(text || '').trim();
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  return t;
}
function normalizeAIResponse(obj, provider, mode) {
  const rawItems = Array.isArray(obj && obj.items) ? obj.items : [];
  const items = rawItems.slice(0, 8).map((it, idx) => {
    const itemType = String(it.itemType || it.type || '').toLowerCase().replace(/[^a-z_]/g, '') || 'unknown';
    const isPackagedProduct = Boolean(it.isPackagedProduct || it.packaged || ['packaged_product','drink_mix','ingredient','nutrition_label'].includes(itemType));
    const isConsumedPortionVisible = it.isConsumedPortionVisible === false ? false : !isPackagedProduct;
    const requiresServingConfirmation = Boolean(it.requiresServingConfirmation || isPackagedProduct || it.estimatedGrams == null || it.estimatedGrams === '');
    const gramsRaw = it.estimatedGrams ?? it.grams ?? it.weightGrams;
    const grams = Number(gramsRaw);
    const estimatedGrams = Number.isFinite(grams) && grams > 0 && !requiresServingConfirmation ? Math.round(grams) : null;
    let notes = String(it.notes || '').slice(0, 220);
    if (isPackagedProduct) {
      const packNote = 'Packaged product: default to 1 serving; do not log the whole container unless you actually consumed it.';
      notes = notes ? `${notes} ${packNote}` : packNote;
    }
    return {
      name: String(it.name || it.foodName || it.item || `AI item ${idx + 1}`).slice(0, 80),
      itemType,
      isPackagedProduct,
      isConsumedPortionVisible,
      estimatedQuantity: String(it.estimatedQuantity || it.quantity || it.serving || it.servingLabel || '1 serving').slice(0, 90),
      estimatedGrams,
      servingLabel: String(it.servingLabel || it.serving || it.estimatedQuantity || '1 serving').slice(0, 90),
      servingsPerContainer: safeNullableNumber(it.servingsPerContainer),
      defaultServingCount: safePositiveNumber(it.defaultServingCount, 1),
      requiresServingConfirmation,
      calories: safeNumber(it.calories ?? it.kcal),
      protein: safeNumber(it.protein),
      carbs: safeNumber(it.carbs ?? it.carbohydrates),
      fat: safeNumber(it.fat),
      confidence: ['low','medium','high'].includes(String(it.confidence || '').toLowerCase()) ? String(it.confidence).toLowerCase() : (isPackagedProduct ? 'low' : 'medium'),
      notes
    };
  }).filter((x) => x.name && (x.calories || x.estimatedGrams || x.isPackagedProduct));
  const warnings = Array.isArray(obj && obj.warnings) ? obj.warnings.map((x) => String(x).slice(0, 180)).slice(0, 5) : [];
  if (items.some((x) => x.isPackagedProduct)) warnings.push('Packaged products are logged as 1 serving by default. Confirm serving size before saving.');
  warnings.push('AI estimates can be wrong. Confirm portions and nutrition before saving.');
  return { ok: true, version: APP_VERSION, provider, mode, items, warnings: [...new Set(warnings)] };
}
function safeNullableNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 10) / 10 : null;
}
function safePositiveNumber(v, fallback = 1) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 10) / 10 : fallback;
}
function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 10) / 10 : 0;
}
function geminiModelPath(model) {
  const m = String(model || GEMINI_MODEL).trim();
  return m.startsWith('models/') ? m : `models/${m}`;
}
function geminiModelLabel(model) {
  return geminiModelPath(model).replace(/^models\//, '');
}
function geminiCandidateModels(env) {
  const values = [];
  if (env && env.GEMINI_MODEL) values.push(env.GEMINI_MODEL);
  values.push(GEMINI_MODEL, ...GEMINI_FALLBACK_MODELS);
  const seen = new Set();
  return values.filter((m) => {
    const label = geminiModelLabel(m);
    if (!label || seen.has(label)) return false;
    seen.add(label);
    return true;
  });
}
function isGeminiModelNotFoundError(err) {
  const msg = String(err && err.message || err || '').toLowerCase();
  return msg.includes('404') || msg.includes('not found') || msg.includes('not supported');
}
async function callGeminiAnalyze(env, payload) {
  if (!env || !env.GEMINI_API_KEY) throw new Error('gemini_not_configured');
  const models = geminiCandidateModels(env);
  const errors = [];
  for (const model of models) {
    const modelPath = geminiModelPath(model);
    const modelLabel = geminiModelLabel(model);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
      const body = {
        contents: [{ role: 'user', parts: [
          { text: aiPrompt(payload.mode, payload.lang) },
          { inline_data: { mime_type: payload.mimeType, data: payload.imageBase64 } }
        ]}],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1600, responseMimeType: 'application/json' }
      };
      const data = await fetchJsonRequest(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) }, AI_TIMEOUT_MS);
      const text = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.map((p) => p.text || '').join('\n');
      if (!text) throw new Error('gemini_empty');
      const parsed = JSON.parse(stripJsonText(text));
      return normalizeAIResponse(parsed, `Gemini (${modelLabel})`, payload.mode);
    } catch (e) {
      const msg = e && e.message ? e.message : String(e);
      errors.push(`${modelLabel}:${msg}`);
      // Keep trying only for model compatibility or transient upstream failures.
      // This avoids silently hiding permanent malformed-image or prompt errors behind obsolete model fallbacks.
      continue;
    }
  }
  const err = new Error('gemini_failed');
  err.providerErrors = errors.slice(0, 4);
  throw err;
}
async function handleGeminiModels(env, origin) {
  if (!env || !env.GEMINI_API_KEY) return json({ ok: false, version: APP_VERSION, error: 'gemini_not_configured' }, 501, origin);
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
  try {
    const data = await fetchJsonRequest(url, { method: 'GET', headers: { 'Accept': 'application/json' } }, TIMEOUT_MS);
    const models = (Array.isArray(data.models) ? data.models : []).map((m) => ({
      name: m.name,
      displayName: m.displayName || '',
      supportedGenerationMethods: m.supportedGenerationMethods || []
    })).filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'));
    return json({ ok: true, version: APP_VERSION, defaultModel: GEMINI_MODEL, candidateModels: geminiCandidateModels(env).map(geminiModelPath), generateContentModels: models.slice(0, 60) }, 200, origin);
  } catch (e) {
    return json({ ok: false, version: APP_VERSION, error: 'gemini_models_failed', message: String(e && e.message || e) }, 502, origin);
  }
}
async function handleWorkersAiAgree(env, origin) {
  if (!env || !env.AI) return json({ ok: false, version: APP_VERSION, error: 'workers_ai_not_configured' }, 501, origin);
  try {
    const result = await env.AI.run(WORKERS_AI_VISION_MODEL, { prompt: 'agree' });
    return json({ ok: true, version: APP_VERSION, message: 'Workers AI model license agreement submitted.', model: WORKERS_AI_VISION_MODEL, result }, 200, origin);
  } catch (e) {
    return json({ ok: false, version: APP_VERSION, error: 'workers_ai_agree_failed', message: String(e && e.message || e), model: WORKERS_AI_VISION_MODEL }, 502, origin);
  }
}
async function callWorkersAIAnalyze(env, payload) {
  if (!env || !env.AI) throw new Error('workers_ai_not_configured');
  const bytes = Uint8Array.from(atob(payload.imageBase64), c => c.charCodeAt(0));
  const result = await env.AI.run(WORKERS_AI_VISION_MODEL, {
    prompt: aiPrompt(payload.mode, payload.lang),
    image: Array.from(bytes),
    max_tokens: 1400,
    temperature: 0.2
  });
  const text = result && (result.response || result.text || result.result || (typeof result === 'string' ? result : ''));
  if (!text) throw new Error('workers_ai_empty');
  const parsed = JSON.parse(stripJsonText(text));
  return normalizeAIResponse(parsed, `Workers AI (${WORKERS_AI_VISION_MODEL})`, payload.mode);
}
async function parseJsonRequest(request) {
  try { return await request.json(); } catch (_) { return null; }
}
async function handleAnalyzeImage(request, env, ctx, origin) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, origin);
  const body = await parseJsonRequest(request);
  if (!body) return json({ ok: false, error: 'bad_json' }, 400, origin);
  const mode = body.mode === 'label' ? 'label' : 'meal';
  const imageBase64 = String(body.imageBase64 || '').replace(/^data:image\/[^;]+;base64,/, '');
  const mimeType = /^image\/(jpeg|jpg|png|webp)$/i.test(String(body.mimeType || '')) ? String(body.mimeType).replace('jpg','jpeg') : 'image/jpeg';
  if (!imageBase64 || imageBase64.length < 1000) return json({ ok: false, error: 'missing_image' }, 400, origin);
  if (imageBase64.length > MAX_IMAGE_BASE64_CHARS) return json({ ok: false, error: 'image_too_large', message: 'Compress the image and try again.' }, 413, origin);
  const payload = { mode, imageBase64, mimeType, lang: body.lang === 'id' ? 'id' : 'en' };
  const errors = [];
  try { return json(await callGeminiAnalyze(env, payload), 200, origin); }
  catch (e) {
    errors.push('gemini:' + (e && e.message ? e.message : String(e)));
    if (e && Array.isArray(e.providerErrors)) errors.push(...e.providerErrors.map((x) => 'gemini_model:' + x));
  }
  try { return json(await callWorkersAIAnalyze(env, payload), 200, origin); }
  catch (e) { errors.push('workers_ai:' + (e && e.message ? e.message : String(e))); }
  const notConfigured = errors.every((e) => e.includes('not_configured'));
  const workersAiNeedsAgree = errors.some((e) => e.toLowerCase().includes('prompt') && e.toLowerCase().includes('agree'));
  const message = notConfigured
    ? 'AI scan is not configured on the backend yet.'
    : workersAiNeedsAgree
      ? 'AI provider is not ready. Open /workers-ai-agree once, then try again.'
      : 'AI provider is not ready or the image could not be analyzed. Check /ai-status and try again.';
  return json({ ok: false, version: APP_VERSION, error: notConfigured ? 'AI_SCAN_NOT_CONFIGURED' : 'AI_SCAN_FAILED', provider: 'none', message, errors: errors.slice(0, 8) }, notConfigured ? 501 : 502, origin);
}

async function handleLookup(request, env, ctx, origin) {
  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();
  if (!q || q.length < 2) return json({ ok: false, error: 'missing_query', results: [] }, 400, origin);
  if (q.length > 120) return json({ ok: false, error: 'query_too_long', results: [] }, 400, origin);

  const canonical = normalizeQuery(q);
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = '/__cache/lookup-v140';
  cacheUrl.search = `?q=${encodeURIComponent(canonical)}&usda=${env && env.USDA_API_KEY ? '1' : '0'}`;
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
  const result = await lookup(q, env);
  const body = {
    ok: true,
    version: APP_VERSION,
    provider: 'Calorie Tracker API',
    upstream: result.upstream,
    usdaEnabled: result.usdaEnabled,
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
        return json({ ok: true, service: 'Calorie Tracker API', version: APP_VERSION, endpoints: ['/lookup?q=cheeseburger', 'POST /analyze-image', '/ai-status', '/gemini-models', '/workers-ai-agree'], providers: ['Curated Restaurant Pack', 'Open Food Facts', env && env.USDA_API_KEY ? 'USDA FoodData Central' : 'USDA FoodData Central (optional secret not configured)', env && env.GEMINI_API_KEY ? 'Gemini Vision' : 'Gemini Vision (optional secret not configured)', env && env.AI ? 'Cloudflare Workers AI Vision' : 'Cloudflare Workers AI Vision (optional binding not configured)'] }, 200, origin);
      }
      if (url.pathname === '/lookup') return await handleLookup(request, env, ctx, origin);
      if (url.pathname === '/ai-status') return json({ ok: true, version: APP_VERSION, geminiConfigured: !!(env && env.GEMINI_API_KEY), workersAiConfigured: !!(env && env.AI), geminiModel: env && env.GEMINI_MODEL || GEMINI_MODEL, geminiCandidates: geminiCandidateModels(env).map(geminiModelLabel), workersAiModel: WORKERS_AI_VISION_MODEL, workersAiAgreeEndpoint: '/workers-ai-agree' }, 200, origin);
      if (url.pathname === '/gemini-models') return await handleGeminiModels(env, origin);
      if (url.pathname === '/workers-ai-agree') return await handleWorkersAiAgree(env, origin);
      if (url.pathname === '/analyze-image') return await handleAnalyzeImage(request, env, ctx, origin);
      return json({ ok: false, error: 'not_found' }, 404, origin);
    } catch (err) {
      return json({ ok: false, error: 'api_failed', message: String(err && err.message || err), results: [] }, 502, origin);
    }
  }
};
