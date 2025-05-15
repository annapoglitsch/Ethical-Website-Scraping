import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www2.hm.com/en_us/'); 
await page.waitForSelector(".b2ce26 > li > a");

 const _items = await page.$$eval(".b2ce26 > li > a", (elements) => { //text von .d00fe8 element holen
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _items.map(item => ({ //ins richtige format bringen
  firstOption: item || "-"
}));


const _menuItems = await page.$$eval('.d00fe8 > li[data-level="2"] > button', (elements) =>
    elements.map(el => el.textContent.trim())
);

//const uniqueItems = [...new Set(_menuItems)]; //doppelte entfernen

const dataMenu = _menuItems.map(item => ({ //ins richtige format bringen
  firstOption: item || "-"
}));
const testElement = await page.$('.d00fe8 > li[data-level="2"] > button');
console.log(testElement ? 'Element gefunden' : 'NICHT gefunden');

const outputDir = '../extracted_data/text';
const outputPath = `${outputDir}/HM_menu_menu.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataMenu, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


