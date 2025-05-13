import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.politifact.com/'); 
await page.waitForSelector(".c-title--section");


 const _items = await page.$$eval(".m-togglist__list li", (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _items.map(item => ({
  title: item || "-"
}));

 const _itemsTitle = await page.$$eval(".m-togglist__label", (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItemsLabel = _itemsTitle.map(itemTitle => ({
  title: itemTitle || "-"
}));

const outputDir = './extracted_data/text';
const outputPath = `${outputDir}/politic_data_options_Title.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItemsLabel, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


