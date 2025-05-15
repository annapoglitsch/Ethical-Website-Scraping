import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.bershka.com/gb/h-woman.html'); 
await page.waitForSelector(".esi-wrapper");

const _itemsMenu = await page.$$eval('.highlights-texts-section li a, .category-list a span, .section-title__content', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _itemsMenu.map(item => ({
  firstOption: item || "-"
}));

const testElement = await page.$('.esi-wrapper');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/BershkaMenuTwo.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


