import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.weekday.com/en-ww/women/'); 
await page.waitForSelector(".relative");

 const _items = await page.$$eval(".flex > li >button", (elements) => { 
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _items.map(item => ({ 
  firstOption: item || "-"
}));


const _menuItems = await page.$$eval('span.mb-0',  (elements) => { 
  return elements.map((el) => el.textContent.trim());
});

const dataMenu = _menuItems.map(item => ({ 
  firstOption: item || "-"
}));

const testElement = await page.$('span.mb-0.text-10.uppercase');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/weekdayInputTwo.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataMenu, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


