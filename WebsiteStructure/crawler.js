import puppeteer from "puppeteer";

async function crawl(startUrl, maxDepth = 3) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const visited = new Set();
  const urlsByDepth = {};

  const queue = [[startUrl, 1]];
  visited.add(startUrl);

  while (queue.length > 0) {
    const urldepth = queue.shift();
    const currentUrl = urldepth[0];
    const depth = urldepth[1];

    if (!urlsByDepth[depth]) {
      urlsByDepth[depth] = new Set();
    }

    urlsByDepth[depth].add(currentUrl);

    if (depth >= maxDepth) {
      continue;
    }

    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 20000 });

      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.href).filter(href => href.startsWith('http'))
      );

      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          queue.push([link, depth + 1]);
        }
      }
    } catch (err) {
      console.warn(`fehler beim laden ${currentUrl}:`, err.message);
      continue;
    }
  }

  await browser.close();

  for (let d = 1; d <= maxDepth; d++) {
    const count = urlsByDepth[d] ? urlsByDepth[d].size : 0;
    console.log(`tiefe ${d}: ${count} Seiten gefunden`);
  }

  console.log(`Menge an gefundenen seiten bis Tiefe ${maxDepth}: ${visited.size}`);
}

crawl('https://www.nike.com/gb/', 3);



/*async function crawl(startUrl, maxDepth = 2) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const visited = new Set();
  const urlsByDepth = {};

  const queue = [[startUrl, 1]];
  visited.add(startUrl);

  while (queue.length > 0) {
    const urldepth = queue.shift();
    const currentUrl = urldepth[0];
    const depth = urldepth[1];



    if (!urlsByDepth[depth]){
    urlsByDepth[depth] = new Set();
    } 
    urlsByDepth[depth].add(currentUrl);

 
    if (depth >= maxDepth){
    continue;
    } 

    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 20000 });

      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.href).filter(href => href.startsWith('http'))
      );

      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          queue.push([link, depth + 1]);
        }
      }
    } catch (err) {
      console.warn(`Fehler bei ${currentUrl}:`, err.message);
    }
  }

  await browser.close();


  const level = maxDepth;
  const count = urlsByDepth[level] ? urlsByDepth[level].size : 0;

  console.log(`Genau auf Tiefe ${level}: ${count} Seiten gefunden`);
}

crawl('https://www.nike.com/gb/', 3);*/
