const userSchema              = require("./userData.models");
const userSessionSchema       = require("./userData.models");
const emailTemplateSchema     =require("./emailTemplate");
const category                =require("./Category.model")
const jobpost                 =require("./jobPost.model");
const proposals               =require("./proposals.model");
const usercatgory                 =require("./userCategory");


module.exports = {
    jobpost,
    proposals,
    userSchema,
    category,
    userSessionSchema,
    emailTemplateSchema,
    usercatgory
}