import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.nike.com/gb/'); 
await page.waitForSelector(".grid");

const _itemsMenu = await page.$$eval('.shopping-menu-grid .desktop-category .css-jq32a0 .drop-down-details-content .css-w3vz3o ul .dropdown__sub_list_item p.nds-text', (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _itemsMenu.map(item => ({
  firstOption: item || "-"
}));

const testElement = await page.$('.shopping-menu-grid .desktop-category .css-jq32a0 .drop-down-details-content .css-w3vz3o ul .dropdown__sub_list_title p.nds-text');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/NikeThree.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


