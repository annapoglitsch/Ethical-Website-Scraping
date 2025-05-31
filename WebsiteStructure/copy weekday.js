import puppeteer from "puppeteer";

const startUrl = 'https://www.weekday.com';
const maxDepth = 3;

const visitedUrls = new Set();

const linkCounter = {};
const shortcutLinksArray = [];

const urlDepthKey = {};

const outboundLinks = {}

async function crawlPage(page, url, depth) {

  if (depth > maxDepth || visitedUrls.has(normUrl)) {
    return;
  }

  visitedUrls.add(normUrl);

  urlDepthKey[normUrl] = depth;

  try {
    await page.goto(normUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(2000);

    console.log(`current site: ${normUrl} (depth: ${depth})`);

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

    if (!outboundLinks[normUrl]) {
      outboundLinks[normUrl] = new Set();
    }

     for (const link of linksArray) {
      outboundLinks[url].add(link);
      
    }

    const currentPathArray = new URL(normUrl).pathname.split('/').filter(Boolean);
    const currentMain = currentPathArray[0] || '';

    for (const link of linksArray) {
      const normLink = correctURL(link);

      if (!urlDepthKey[normLink] || depth + 1 < urlDepthKey[normLink]) {
        urlDepthKey[normLink] = depth + 1;
      }

      if (!linkCounter[normLink]) {
        linkCounter[normLink] = { count: 1, depth: urlDepthKey[normLink] ?? depth };
      } else {
        linkCounter[normLink].count += 1;
      }

      const targetPathArray = new URL(normLink).pathname.split('/').filter(Boolean);
      const targetMain = targetPathArray[0] || '';

      const isSameRoot = currentMain === targetMain;
      const isHomepage = targetPathArray.length === 0;
      const isFromHomepage = currentPathArray.length === 0;

      const isShortcut = !isFromHomepage && !isSameRoot && !isHomepage;

      if (isShortcut) {
        shortcutLinksArray.push({
          from: normUrl,
          to: normLink,
          fromDepth: depth,
          toDepth: urlDepthKey[normLink] ?? 'unbekannt',
        });
      }
    }

    for (const link of linksArray) {
      const normLink = correctURL(link);
      if (!visitedUrls.has(normLink)) {
        await crawlPage(page, normLink, depth + 1);
      }
    }
  } catch (error) {
    console.error(`error ${normUrl}:`, error.message);
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
      count: data.count,
      depth: data.depth,
      outboundCount: outboundLinks[url] ? outboundLinks[url].size : 0,
      totalHubScore: data.count + (outboundLinks[url] ? outboundLinks[url].size : 0),
    }))
    .sort((a, b) => b.totalHubScore - a.totalHubScore);

  console.log('\nBeliebte Hub-Seiten:');
  console.log(sortedLinks.slice(0, 20));

  // Shortcuts
  console.log(shortcutLinksArray.slice(0, 50));
})();

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
