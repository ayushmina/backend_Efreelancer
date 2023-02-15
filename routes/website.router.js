const router = require("express").Router();
const { route } = require(".");

// Controllers
const website=require("../controller/websites.controller");

// website pannel
router.route("/addCategory").post(website.addCategory);
router.route("/getCategory").get(website.getCategory);




module.exports = router;