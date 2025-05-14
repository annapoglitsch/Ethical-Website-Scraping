import puppeteer from 'puppeteer';

const visitedSites = new Set();
const maxDepth = 3;
const baseUrl = "https://www.amazon.de/";

async function websiteCrawl(page, url, depth) {

    if (depth > maxDepth || visitedSites.has(url)) {
        return;
    }

    console.log(`Depth: ${depth} ` + url)
    try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 }); //damit webseiten mich nicht "blockieren"


        const links = await page.$$eval('a[href]', anchors =>
            anchors
                .map(a => a.href)
                .filter(href => href.startsWith(location.origin) || href.startsWith('/'))
        );

        for (const link of links) {
            await websiteCrawl(page, link, depth + 1);
        }
    } catch (err) {
        console.error(`Fehler bei ${url}:`, err.message);
    }
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await websiteCrawl(page, baseUrl, 0);

    await browser.close();

    console.log(`Gefundene Seiten: ${visitedSites.size}`);
})();