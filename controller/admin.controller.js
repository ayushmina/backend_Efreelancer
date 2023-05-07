let universalFunctions=require("../utils/universalFunctions");
let Joi       =require("joi");
let models    = require("../Models/index"); 


let curd={
    addCategory : async function (req, res) {
        try {
            
            const schema = Joi.object().keys({
                Category: Joi.string().trim().required(),
            })
        
    
            await universalFunctions.validateRequestPayload(req.body, res, schema)
    
          let category=await models.category.find(req.body);
          if (category) {
            return universalFunctions.sendError(
              {
                statusCode: 400,
                message: "category already added in system add other category",
              },
              res
            )
          }
    
          category=await models.category.create(req.body);
    
    
    
        
              return universalFunctions.sendSuccess(
                {
                  statusCode: 200,
                  message: "category add Successfull",
                  data: category,
                },
                res
              )
            }
           catch (error) {
            return universalFunctions.sendError(error, res)
          }
    },
    getCategory : async function (req, res) {
        try {
            
            // const schema = Joi.object().keys({
            //     Category: Joi.string().trim().required(),
            // })
            // await universalFunctions.validateRequestPayload(req.body, res, schema)
    
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
    }
}

module.exports=curd;


