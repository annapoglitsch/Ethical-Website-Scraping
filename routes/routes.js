const express = require("express");
const router = express.Router();
const shopping = require("../Controller/shoppingScraperController");
const politicalScraper = require("../Controller/politicalScraperController");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/shoppingScraper", shopping.shoppingScraperController);
router.get("/politicalScraper", politicalScraper.shoppingScraperController);

module.exports = router;