const express = require("express");
const router = express.Router();
const webStructure = require("../WebsiteStructure/structureController")
const hAndM = require("../Controller/HAndM");
const nike = require("../Controller/nike");
const Bershka = require("../Controller/Bershka");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/webStructure", webStructure.structureController);
router.get("/hAndM", hAndM.HAndM);
router.get("/nike", nike.nike);
router.get("/Bershka", Bershka.Bershka);


module.exports = router;