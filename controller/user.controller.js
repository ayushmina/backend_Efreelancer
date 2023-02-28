let universalFunctions=require("../utils/universalFunctions");
let Joi       =require("joi");
let models    = require("../Models/index"); 
const { ObjectId } = require('mongodb');


let curd={

    getuserProfile : async function (req, res) {
        try {

          let category=await models.category.find();
          if (!category) {
            return universalFunctions.sendError(
              {
                statusCode: 400,
                message: "NO category added in system or  add  category",
              },
              res
            )
          }
    
          return universalFunctions.sendSuccess(
             {
                  statusCode: 200,
                  message: "category get Successfull",
                  data: category,
                },
                res
              )
            }
           catch (error) {
            return universalFunctions.sendError(error, res)
          }
    },
}

module.exports=curd;


