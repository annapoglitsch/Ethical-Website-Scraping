import puppeteer from "puppeteer";


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

async function crawl(startUrl, maxDepth = 2) {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  const visited = new Set();
  const urlsByDepth = {};
  const { hostname: startDomain } = new URL(startUrl);

  const queue = [[startUrl, 1]];
  visited.add(startUrl);

  while (queue.length > 0) {
    const [currentUrl, depth] = queue.shift();

    if (!urlsByDepth[depth]) urlsByDepth[depth] = new Set();
    urlsByDepth[depth].add(currentUrl);

    if (depth >= maxDepth) continue;

    try {
      await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });

      await autoScroll(page);
      await wait(2000);

      const links = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map(a => a.href)
          .filter(href =>
            href &&
            href.startsWith('http') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('javascript:')
          )
      );

      for (const link of links) {
        try {
          const url = new URL(link);
          if (
            url.hostname === startDomain &&
            !url.hash &&
            !visited.has(url.href)
          ) {
            visited.add(url.href);
            queue.push([url.href, depth + 1]);
          }
        } catch (err) {
          continue; 
        }
      }

    } catch (err) {
      console.warn(`Fehler bei ${currentUrl}:`, err.message);
    }
  }

  await browser.close();

  for (let d = 1; d <= maxDepth; d++) {
    const count = urlsByDepth[d] ? urlsByDepth[d].size : 0;
    console.log(`Tiefe ${d}: ${count} Seiten gefunden`);
  }

  console.log(`Gesamt: ${visited.size} Seiten besucht`);
}

crawl('https://www.nike.com/gb/', 3);
