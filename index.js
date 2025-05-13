const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/routes.js")

app.set("view engine", "ejs");

app.get("/", routes);
app.get("/shoppingScraper", routes);
app.get("/politicalScraper", routes);

app.listen(port, () => {
    console.log("SCraper listening on Port:", port)
})
/*import puppeteer from "puppeteer"

const getQuotes = async () => {
    const browser = await puppeteer.launch({ //session wird gestartet
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/", { //spezifische website öffnen
        waitUntil: "domcontentloaded"
    });

    const quotes = await page.evaluate(() => {
        const quote = document.querySelector(".quote");

        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;

        return {text, author};
    })

    console.log(quotes);

    await browser.close();
}

getQuotes(); //Scraping wird gestartet*/