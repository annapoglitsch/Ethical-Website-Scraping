import puppeteer from "puppeteer";

const startUrl = 'https://www.nike.com/gb/';
const maxDepth = 3;

const visitedUrls = new Set();

const linkCounter = {};
const shortcutLinksArray = [];

const urlDepthKey = {};

async function crawlPage(page, url, depth) {

  if (depth > maxDepth || visitedUrls.has(url)) {
    return;
  }

  visitedUrls.add(url)

  urlDepthKey[url] = depth

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(1000)

    /*await autoScroll(page);
    await wait(2000);*/

    console.log(`current site: ${url} (depth: ${depth})`);

    const linksArray = await page.$$eval('a', anchors =>
      Array.from(
        new Set(
          anchors
            .map(a => a.href.split('#')[0])
            .filter(href => href && href.startsWith(window.location.origin))
        )
      )
    )


    const currentPathArray = new URL(url).pathname.split('/').filter(Boolean)
    const currentMain = currentPathArray[0] || '';

    for (const link of linksArray) {

      if (!urlDepthKey[link]) {
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
    }))

  console.log('\nBeliebte Hub-Seiten:');
  console.log(sortedLinks.slice(0, 20))

 /* console.log('\nGefundene Shortcuts (mit Tiefen):');
  console.log(shortcutLinksArray)*/

   const filteredShortcuts = shortcutLinksArray.filter(
     shortcut => shortcut.from.includes('/w/') || shortcut.to.includes('/w/')
   );;
   console.log(filteredShortcuts);
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
