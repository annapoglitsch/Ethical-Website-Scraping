import puppeteer from "puppeteer";

const startUrl = 'https://www.nytimes.com/';
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
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await wait(1000)

    /* await autoScroll(page);
     await wait(2000);*/

    console.log(`current site: ${url} (depth: ${depth})`);

    /* const linksArray = await page.$$eval('a', anchors =>
       Array.from(
         new Set(
           anchors
             .map(a => a.href.split('#')[0])
             .filter(href => href && href.startsWith(window.location.origin))
         )
       )
     )*/

    const { hostname: startDomain } = new URL(startUrl);

    const linksArray = await page.$$eval('a', (anchors) =>
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


    /* const linksArray = await page.$$eval('a', (anchors) =>
       anchors
         .map(a => a.href || a.getAttribute('href'))
         .filter(href => href)
     );
 
     const absoluteLinks = linksArray.map(link => {
       try {
         return new URL(link, page.url()).href;
       } catch (e) {
         return null;
       }
     }).filter(Boolean);*/

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
        if (linkCounter[link].depth === 'unbekannt' && urlDepthKey[link]) {
          linkCounter[link].depth = urlDepthKey[link]
        }
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
  await crawlPage(page, startUrl, 1);
  await browser.close();

  const sortedLinks = Object.entries(linkCounter)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([url, data]) => ({
      url,
      count: data.count,
      depth: data.depth,
      outboundCount: outboundLinks[url] ? outboundLinks[url].size : 0,
    }))

  console.log('\nBeliebte Hub-Seiten:');
  console.log(sortedLinks.slice(0, 20))

  /* console.log('\nGefundene Shortcuts (mit Tiefen):');
   console.log(shortcutLinksArray)*/

  const filteredShortcuts = shortcutLinksArray.filter(
    shortcut => shortcut.from.includes('/world/') || shortcut.to.includes('/world/')
  );

  const fromWShortcuts = filteredShortcuts
    .filter(shortcut => shortcut.from.includes('/world/'))
    .slice(0, 10);

  const toWShortcuts = filteredShortcuts
    .filter(shortcut => shortcut.to.includes('/world/'))
    .slice(0, 10);

  console.log('\nShortcuts FROM /world/:')
  console.log(fromWShortcuts)

  console.log('\nShortcuts TO /world/:')
  console.log(toWShortcuts)
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
