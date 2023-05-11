const router = require("express").Router();
const { route } = require(".");
const checkAuth=require("../services/authServices/checkAuth");
// Controllers
const website=require("../controller/websites.controller");
const auth =require("../controller/customAuth.controller")
// website pannel
router.route("/addCategory").post(website.addCategory);
router.route("/adduser").post(auth.signup);
router.route("/signinuser").post(auth.signinUser);


router.route("/getCategory").get(website.getCategory);
router.route("/getProposals").get(checkAuth,website.getProposals);
router.route("/updateProfile").post(checkAuth,website.updateProfile);
router.route("/postProposals").post(checkAuth,website.postProposals);
router.route("/postjob").post(checkAuth,website.addJobPost);
router.route("/getJobPost").get(website.getJobPost);
router.route("/getUserInfo").get(checkAuth,website.getUserInfo);






module.exports = router;