import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']);
const OUTPUT_DIR = 'public/uploads/assured-restoration';
const INVENTORY_PATH = join(OUTPUT_DIR, 'image-inventory.json');
const USER_AGENT = 'AssuredRestorationImageCrawler/1.0';
const FETCH_TIMEOUT_MS = 15000;
const MAX_PAGES = 100;

const startUrl = process.argv[2];

if (!startUrl) {
  console.error('Usage: node scripts/download-site-images.js https://example.com/');
  process.exit(1);
}

const origin = new URL(startUrl).origin;
const crawledPages = new Set();
const queuedPages = [normalizePageUrl(startUrl)];
const imageMap = new Map();
const textCache = new Map();
const failedDownloads = [];
let duplicateImagesSkipped = 0;

await mkdir(OUTPUT_DIR, { recursive: true });
const existingInventory = await loadExistingInventory();
const usedFilenames = new Set(existingInventory.map((item) => item.filename));

while (queuedPages.length > 0) {
  const pageUrl = queuedPages.shift();
  if (!pageUrl || crawledPages.has(pageUrl)) continue;
  if (crawledPages.size >= MAX_PAGES) break;

  crawledPages.add(pageUrl);
  console.error(`Crawling ${pageUrl}`);
  const html = await fetchText(pageUrl);
  if (!html) continue;

  for (const link of extractInternalLinks(html, pageUrl)) {
    if (!crawledPages.has(link) && !queuedPages.includes(link)) {
      queuedPages.push(link);
    }
  }

  collectImageCandidates(html, pageUrl, 'html');

  for (const cssUrl of extractAssetUrls(html, pageUrl, 'css')) {
    const css = await fetchText(cssUrl);
    if (css) collectImageCandidates(css, pageUrl, 'css');
  }

  for (const jsUrl of extractAssetUrls(html, pageUrl, 'js')) {
    const js = await fetchText(jsUrl);
    if (js) collectImageCandidates(js, pageUrl, 'js');
  }
}

const inventory = [];
let downloadedImages = 0;

for (const candidate of imageMap.values()) {
  const existing = existingInventory.find((item) => item.original_url === candidate.original_url);
  const filename = existing?.filename ?? makeFilename(candidate, usedFilenames);
  const localPath = `/uploads/assured-restoration/${filename}`;
  const outputPath = join(OUTPUT_DIR, filename);

  try {
    const alreadyExists = await fileExists(outputPath);
    if (!alreadyExists) {
      console.error(`Downloading ${candidate.original_url}`);
      const response = await fetch(candidate.original_url, {
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'follow',
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const bytes = Buffer.from(await response.arrayBuffer());
      await writeFile(outputPath, bytes);
      downloadedImages += 1;
    }

    inventory.push({
      original_url: candidate.original_url,
      local_path: localPath,
      filename,
      page_found: new URL(candidate.page_found).pathname || '/',
      alt_text: candidate.alt_text,
    });
  } catch (error) {
    failedDownloads.push({
      original_url: candidate.original_url,
      page_found: new URL(candidate.page_found).pathname || '/',
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

for (const existing of existingInventory) {
  const alreadyIncluded = inventory.some((item) => item.original_url === existing.original_url);
  const localFile = join(OUTPUT_DIR, existing.filename);
  if (!alreadyIncluded && await fileExists(localFile)) {
    inventory.push(existing);
  }
}

inventory.sort((a, b) => a.local_path.localeCompare(b.local_path));
await writeFile(INVENTORY_PATH, `${JSON.stringify(inventory, null, 2)}\n`);

console.log(JSON.stringify({
  pages_crawled: crawledPages.size,
  images_found: imageMap.size,
  images_downloaded: downloadedImages,
  duplicate_images_skipped: duplicateImagesSkipped,
  output_dir: OUTPUT_DIR,
  inventory: INVENTORY_PATH,
  failed_downloads: failedDownloads,
}, null, 2));

async function loadExistingInventory() {
  try {
    return JSON.parse(await readFile(INVENTORY_PATH, 'utf8'));
  } catch {
    return [];
  }
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url) {
  if (textCache.has(url)) return textCache.get(url);

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) return '';
    const text = await response.text();
    textCache.set(url, text);
    return text;
  } catch {
    return '';
  }
}

function collectImageCandidates(text, pageUrl, source) {
  const candidates = [];

  for (const match of text.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const altText = getAttr(tag, 'alt');
    const src = getAttr(tag, 'src');
    const srcset = getAttr(tag, 'srcset');
    if (src) candidates.push({ url: src, altText });
    if (srcset) {
      for (const url of parseSrcset(srcset)) candidates.push({ url, altText });
    }
  }

  for (const match of text.matchAll(/<(?:meta|link)\b[^>]*(?:property|name|rel)=["'][^"']*(?:image|icon)[^"']*["'][^>]*>/gi)) {
    const content = getAttr(match[0], 'content') || getAttr(match[0], 'href');
    if (content) candidates.push({ url: content, altText: '' });
  }

  for (const match of text.matchAll(/(?:src|href|content)\s*=\s*["']([^"']+\.(?:jpe?g|png|webp|svg|gif|avif)(?:\?[^"']*)?)["']/gi)) {
    candidates.push({ url: match[1], altText: '' });
  }

  for (const match of text.matchAll(/url\(\s*["']?([^"')]+\.(?:jpe?g|png|webp|svg|gif|avif)(?:\?[^"')]+)?)["']?\s*\)/gi)) {
    candidates.push({ url: match[1], altText: '' });
  }

  for (const match of text.matchAll(/https?:\/\/[^\s"'`\\<>{}\[\]]+\.(?:jpe?g|png|webp|svg|gif|avif)(?:\?[^\s"'`\\<>{}\[\]]+)?/gi)) {
    candidates.push({ url: match[0], altText: '' });
  }

  for (const match of text.matchAll(/https?:\/\/readdy\.ai\/api\/search-image\?[^\s"'`\\<>{}\[\]]+/gi)) {
    candidates.push({ url: match[0], altText: inferAltTextFromReaddyUrl(match[0]) });
  }

  for (const { url, altText } of candidates) {
    addImageCandidate(url, pageUrl, altText, source);
  }
}

function addImageCandidate(rawUrl, pageUrl, altText, source) {
  if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:')) return;

  rawUrl = sanitizeRawUrl(rawUrl);

  let absoluteUrl;
  try {
    absoluteUrl = new URL(rawUrl.replace(/&amp;/g, '&'), pageUrl).href;
  } catch {
    return;
  }

  if (!isLikelyImageUrl(absoluteUrl)) return;
  if (isTrackingPixel(absoluteUrl)) return;
  if (isNonWebsiteAsset(absoluteUrl)) return;
  if (new URL(absoluteUrl).pathname.endsWith('/vite.svg')) return;

  if (imageMap.has(absoluteUrl)) {
    duplicateImagesSkipped += 1;
    const existing = imageMap.get(absoluteUrl);
    if (!existing.alt_text && altText) existing.alt_text = altText.trim();
    return;
  }

  imageMap.set(absoluteUrl, {
    original_url: absoluteUrl,
    page_found: pageUrl,
    alt_text: (altText || '').trim(),
    source,
  });
}

function sanitizeRawUrl(rawUrl) {
  return rawUrl
    .split('`')[0]
    .split('%60')[0]
    .split('\\u0060')[0]
    .replace(/[),;\]]+$/g, '');
}

function isLikelyImageUrl(url) {
  const parsed = new URL(url);
  const ext = extname(parsed.pathname).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext) || parsed.hostname === 'readdy.ai' && parsed.pathname.includes('/api/search-image');
}

function isTrackingPixel(url) {
  const parsed = new URL(url);
  const lower = url.toLowerCase();
  return lower.includes('facebook.com/tr') || lower.includes('google-analytics') || parsed.searchParams.get('width') === '1' && parsed.searchParams.get('height') === '1';
}

function isNonWebsiteAsset(url) {
  const parsed = new URL(url);
  return parsed.hostname === 'public.readdy.ai' && parsed.pathname.startsWith('/gen_page/');
}

function extractInternalLinks(html, baseUrl) {
  const links = new Set();

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;

    try {
      const url = new URL(href, baseUrl);
      if (url.origin !== origin) continue;
      if (IMAGE_EXTENSIONS.has(extname(url.pathname).toLowerCase())) continue;
      links.add(normalizePageUrl(url.href));
    } catch {
      continue;
    }
  }

  return [...links];
}

function extractAssetUrls(html, baseUrl, type) {
  const urls = new Set();
  const patterns = type === 'css'
    ? [/<link\b[^>]*href=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi]
    : [/<script\b[^>]*src=["']([^"']+\.js(?:\?[^"']*)?)["'][^>]*>/gi];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      try {
        const assetUrl = new URL(match[1], baseUrl);
        if (assetUrl.origin === origin) {
          urls.add(assetUrl.href);
        }
      } catch {
        continue;
      }
    }
  }

  return [...urls];
}

function getAttr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match ? match[2] : '';
}

function parseSrcset(srcset) {
  return srcset
    .split(',')
    .map((entry) => entry.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function normalizePageUrl(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  parsed.search = '';
  return parsed.href;
}

function makeFilename(candidate, used) {
  const url = new URL(candidate.original_url);
  const extension = getImageExtension(url);
  const originalBase = cleanBaseName(basename(url.pathname, extname(url.pathname)));
  const semanticBase = cleanBaseName(candidate.alt_text || inferAltTextFromReaddyUrl(candidate.original_url) || pageName(candidate.page_found));
  const hash = createHash('sha1').update(candidate.original_url).digest('hex').slice(0, 8);
  const base = semanticBase || originalBase || `image-${hash}`;
  let filename = `${base}${extension}`;
  let suffix = 2;

  while (used.has(filename)) {
    filename = `${base}-${suffix}${extension}`;
    suffix += 1;
  }

  used.add(filename);
  return filename;
}

function getImageExtension(url) {
  const pathExt = extname(url.pathname).toLowerCase();
  if (IMAGE_EXTENSIONS.has(pathExt)) return pathExt;

  const format = url.searchParams.get('format') || url.searchParams.get('fm');
  if (format && IMAGE_EXTENSIONS.has(`.${format.toLowerCase()}`)) return `.${format.toLowerCase()}`;

  return '.webp';
}

function cleanBaseName(value) {
  return decodeURIComponent(value || '')
    .replace(/\.(jpe?g|png|webp|svg|gif|avif)$/i, '')
    .replace(/[_()]+/g, ' ')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80);
}

function inferAltTextFromReaddyUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return url.searchParams.get('query') || url.searchParams.get('seq') || '';
  } catch {
    return '';
  }
}

function pageName(pageUrl) {
  const pathname = new URL(pageUrl).pathname;
  return pathname === '/' ? 'home' : pathname.split('/').filter(Boolean).join('-');
}
