import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.urbanoutfitters.com/en-gb/?gad_campaignid=687976754&gad_source=1&gbraid=0AAAAADvIJBYs3NKoyTz9N6telFUK8wOjO&gclid=CjwKCAjw24vBBhABEiwANFG7y1eXlSauzM1qNG0TsY5Z9OdlqqcfB9KoLGfhskNvf139tlmNSnI9iRoCnCcQAvD_BwE&language=en-GB&ref=languageSelect'); 
await page.waitForSelector(".c-pwa-header-navigation");


 const _items = await page.$$eval(".c-pwa-header-navigation li", (elements) => {
  return elements.map((el) => el.textContent.trim());
});

const dataItems = _items.map(item => ({
  title: item || "-"
}));

const outputDir = './extracted_data/text';
const outputPath = `${outputDir}/shopping_data_options.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


