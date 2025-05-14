import puppeteer from 'puppeteer';
import fs from 'fs';

const launchOptions = {
    headless: false,
    defaultViewport: null
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();

await page.goto('https://www.weekday.com/en-ww/?utm_source=google&utm_medium=cpc&utm_campaign=FF~pmax_CN~pmax_AN~weekday_PR~mix_MK~at_PL~google-ads_TT~mixed_CU~sek_PH~conversion&utm_id=17793500117&gad_source=1&gad_campaignid=17784293235&gbraid=0AAAAAC6SH3maJQWrirvvxlj0LkL7hDHfA&gclid=CjwKCAjw_pDBBhBMEiwAmY02Nj-LDOpa8GtT7bNxPLDvHM0W62SmanT5hmA8n6QJXPParNGVSDpHRxoCUY0QAvD_BwE'); 
await page.waitForSelector(".text-14");

 const _items = await page.$$eval("div.mb-2.cursor-default.text-14.leading-20, .mb-1", (elements) => { //text von .mb-2 element holen
  return elements.map((el) => el.textContent.trim());
});

const uniqueItems = [...new Set(_items)]; //doppelte entfernen

const dataItems = uniqueItems.map(item => ({ //ins richtige format bringen
  title: item || "-"
}));

//die einzelnen filteroptionen holen
const _filterOptions = await page.$$eval('a.text-14[href*="/women/"], a.text-14[href*="/zeitgeist/"], a.text-14[href*="/women-festival/"], a.text-14[href*="/limited-edition-womens-beachwear/"]', (elements) => { //text von .text-14 element holen
  return elements.map((el) => el.textContent.trim());
});

//const uniqueFilterOptions = [...new Set(_filterOptions)]; //doppelte entfernen

const dataFilterOpt = _filterOptions.map(filter => ({ //ins richtige format bringen
  title: filter || "-"
}));

const outputDir = './extracted_data/text';
const outputPath = `${outputDir}/shopping_data_options.json`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataItems, null, 2), 'utf-8');

console.log(`Daten erfolgreich gespeichert unter: ${outputPath}`);

await browser.close();


