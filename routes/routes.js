const express = require("express");
const router = express.Router();
const shopping = require("../Controller/shoppingScraperController");
const webStructure = require("../WebsiteStructure/structureController")
const hAndM = require("../Controller/HAndM");
const Zalando = require("../Controller/Zalando");
const Bershka = require("../Controller/Bershka");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/shoppingScraper", shopping.shoppingScraperController);
router.get("/webStructure", webStructure.structureController);
router.get("/hAndM", hAndM.HAndM);
router.get("/Zalando", Zalando.Zalando);
router.get("/Bershka", Bershka.Bershka);


module.exports = router;