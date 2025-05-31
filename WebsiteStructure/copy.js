import puppeteer from "puppeteer";

const startUrl = 'https://www.bershka.com/';
const maxDepth = 3;

const visitedUrls = new Set();

const linkCounter = {};
const shortcutLinksArray = [];

const urlDepthKey = {};

const outboundLinks = {}

async function crawlPage(page, url, depth) {

  if (depth > maxDepth || visitedUrls.has(url)) {
    return;
  }

  visitedUrls.add(url)

  urlDepthKey[url] = depth

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(2000);

    console.log(`current site: ${url} (depth: ${depth})`);

   const { hostname: startDomain } = new URL(startUrl);

    const linksArray = await page.$$eval('a[href]', (anchors) =>
      anchors
        .map(a => a.href.split('#')[0])
        .filter(href => {
          try {
            const url = new URL(href, window.location.href);
            return url.hostname === window.location.hostname;
          } catch (e) {
            return false;
          }
        }),
        startDomain
    );

    if (!outboundLinks[url]) {
      outboundLinks[url] = new Set();
    }
    for (const link of linksArray) {
      outboundLinks[url].add(link);
    }

    const currentPathArray = new URL(url).pathname.split('/').filter(Boolean)
    const currentMain = currentPathArray[0] || '';

    for (const link of linksArray) {

      if (!urlDepthKey[link] || depth + 1 < urlDepthKey[link]) {
        urlDepthKey[link] = depth + 1
      }

      if (!linkCounter[link]) {
        linkCounter[link] = { count: 1, depth: urlDepthKey[link] ?? depth }
      } else {
        linkCounter[link].count += 1
      }

      const targetPathArray = new URL(link).pathname.split('/').filter(Boolean)
      const targetMain = targetPathArray[0] || '';

      const isSameRoot = currentMain === targetMain;
      const isHomepage = targetPathArray.length === 0
      const isFromHomepage = currentPathArray.length === 0

      const isShortcut = !isFromHomepage && !isSameRoot && !isHomepage;

      if (isShortcut) {
        shortcutLinksArray.push({
          from: url,
          to: link,
          fromDepth: depth,
          toDepth: urlDepthKey[link] ?? 'unbekannt',
        });
      }
    }

    for (const link of linksArray) {
      if (!visitedUrls.has(link)) {
        await crawlPage(page, link, depth + 1);
      }
    }
  } catch (error) {
    console.error(`error ${url}:`, error.message)
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36');

  await crawlPage(page, startUrl, 1);
  await browser.close();

  const sortedLinks = Object.entries(linkCounter)
  .map(([url, data]) => ({
    url,
    inboundCount: data.count,
    depth: data.depth,
    outboundCount: outboundLinks[url] ? outboundLinks[url].size : 0,
    totalHubScore: data.count + (outboundLinks[url] ? outboundLinks[url].size : 0),
  }))
  .sort((a, b) => b.totalHubScore - a.totalHubScore);

  console.log('\nBeliebte Hub-Seiten:');
  console.log(sortedLinks.slice(0, 20))

 /*const filteredShortcuts = shortcutLinksArray.filter(
    shortcut => shortcut.from.includes('/women/') || shortcut.to.includes('/women/')
  );

  const fromWShortcuts = filteredShortcuts
    .filter(shortcut => shortcut.from.includes('/women/'))
    .slice(0, 10);

  const toWShortcuts = filteredShortcuts
    .filter(shortcut => shortcut.to.includes('/women/'))
    .slice(0, 10);

  console.log('\nShortcuts FROM /women/:')
  console.log(fromWShortcuts)

  console.log('\nShortcuts TO /women/:')*/
  console.log(shortcutLinksArray.slice(0,50))
})();

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}