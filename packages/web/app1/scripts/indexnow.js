#!/usr/bin/env node

const DOMAIN = 'https://blankpane.com';
const KEY = 'a91affecc5787056653d5803573857d1';
const SITEMAP_URL = `${DOMAIN}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();

  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function submitToIndexNow(urls) {
  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: DOMAIN,
      key: KEY,
      keyLocation: `${DOMAIN}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  if (res.status === 200) {
    console.log('✓ IndexNow submission accepted');
  } else if (res.status === 202) {
    console.log('✓ IndexNow submission accepted (queued)');
  } else {
    const text = await res.text();
    throw new Error(`IndexNow rejected: ${res.status} - ${text}`);
  }
}

async function main() {
  try {
    console.log('Fetching URLs from sitemap...');
    const urls = await fetchSitemapUrls();
    console.log(`Found ${urls.length} URLs`);

    if (urls.length === 0) {
      console.log('No URLs found in sitemap');
      return;
    }

    await submitToIndexNow(urls);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
