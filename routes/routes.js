const express = require("express");
const router = express.Router();
const shopping = require("../Controller/shoppingScraperController");
const politicalScraper = require("../Controller/politicalScraperController");
const webStructure = require("../WebsiteStructure/structureController")

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/shoppingScraper", shopping.shoppingScraperController);
router.get("/politicalScraper", politicalScraper.shoppingScraperController);
router.get("/webStructure", webStructure.structureController);

module.exports = router;