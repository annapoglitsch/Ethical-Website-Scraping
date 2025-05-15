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

const _itemsMenu = await page.$$eval('.section-item a, .section-item button span', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _itemsMenu.map(item => ({
  firstOption: item || "-"
}));

const testElement = await page.$('.esi-wrapper');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/BershkaMenuOne.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


