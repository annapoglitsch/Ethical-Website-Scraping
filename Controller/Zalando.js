import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.zalando.co.uk/'); 
await page.waitForSelector("._2ZBgf");

 const _items = await page.$$eval('._4oK5GO > li[data-testid="top-category"] > span > a', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const _itemsMenu = await page.$$eval('._0xLoFW > li', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _itemsMenu.map(item => ({
  firstOption: item || "-"
}));

const testElement = await page.$('._8D09HN > li');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/Zalando_menuThree.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


