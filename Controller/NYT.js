import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.nytimes.com/international/'); 
await page.waitForSelector(".css-17j7fe1");

const _itemsMenuOne = await page.$$eval('.css-1llhclm .css-13qj3r5 .css-j7qwjs h3.css-1nudrh3, .css-1llhclm .css-132p2yg h3.css-1nudrh3', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const _itemsMenu = await page.$$eval('.css-1llhclm .css-13qj3r5 .css-j7qwjs li a.css-kz1pwz, .css-1llhclm .css-132p2yg .css-1xpp3bj ', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

console.log("Items gefunden:", _itemsMenu.length);

const dataItems = _itemsMenu.map(item => ({
  firstOption: item || "-"
}));

/*const testElement = await page.$('.site-content');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');*/

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/NYTThree.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


