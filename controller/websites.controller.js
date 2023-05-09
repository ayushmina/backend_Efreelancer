let universalFunctions=require("../utils/universalFunctions");
let Joi       =require("joi");
let models    = require("../Models/index"); 
const { ObjectId } = require('mongodb');


let curd={
  updateProfile : async function (req, res) {
    try {
        let playload=req.body;
        let id = req.params.id
        id=req.body.id;

         if(!id){
          return universalFunctions.sendError(
            {
              statusCode: 400,
              message: "id not found",
            },
            res
          )         } 

         let user= await  models.userSchema.findOneAndDelete(
          
          {
            _id:id
          },
             playload,
          {
          new: true,
        });


          return universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "post   Successfull",
            },
            res
          )
        }
       catch (error) {
        return universalFunctions.sendError(error, res)
      }
},
   
     addCategory : async function (req, res) {
        try {
            
            const schema = Joi.object().keys({
                Category: Joi.string().trim().required(),
            })
        
    
            await universalFunctions.validateRequestPayload(req.body, res, schema)
    
          let category=await models.category.find(req.body);
          if (!category) {
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
    }, 
    getJobPost : async function (req, res) {
      try {

        let jobPost=await models.jobpost.find().populate([
          {
            path: "clientId",
            model: "user",
            select: ["_id", "firstName", "lastName", "profilePic"],

          },{
            path: "category",
            model: "category",
          },
        ]);
        if (!jobPost) {
          return universalFunctions.sendError(
            {
              statusCode: 400,
              message: "NO jobPost added in system or plaese  add  jobPost",
            },
            res
          )
        }
  
            return universalFunctions.sendSuccess(
              {
                statusCode: 200,
                message: "jobPost get Successfull",
                data: jobPost,
              },
              res
            )
          }
         catch (error) {
          return universalFunctions.sendError(error, res)
        }
  },
    addJobPost : async function (req, res) {
      try {
          
        
            const schema = Joi.object().keys({
              
              title: Joi.string().trim().required(),
              description: Joi.string().trim().required(),
              category: Joi.array().required(),
              location: Joi.string().trim().required(),
              amount: Joi.string().trim().required(),
            })
            let clientId=req.user.id;
            let playload=req.body;
            await universalFunctions.validateRequestPayload(req.body, res, schema);
          
            playload.clientId=clientId;
            let jobPost=await models.jobpost.create(playload);

            return universalFunctions.sendSuccess(
              {
                statusCode: 200,
                message: "post   Successfull",
                data: jobPost,
              },
              res
            )
          }
         catch (error) {
          return universalFunctions.sendError(error, res)
        }
  },
 
 postProposals : async function (req, res) {
  try {
      
    
        const schema = Joi.object().keys({
          
          jobpostId: Joi.string().trim().required(),
          proposals: Joi.string().trim().required(),
          amount: Joi.string().trim().required(),
        })
        
         await universalFunctions.validateRequestPayload(req.body, res, schema);
         let clientId=req.user.id;
        let playload=req.body;
        playload.clientId=clientId;
        console.log(playload,"here is playload")
       let data = await models.proposals.create(playload);

       //  Notification
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "proposals add Successfull",
            data: data,
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},
getProposals : async function (req, res) {
  try {
        
        const schema = Joi.object().keys( {
            clientId: Joi.string().trim(),
            jobpostId: Joi.string().trim(),
          })

         await universalFunctions.validateRequestPayload(req.body, res, schema);

         let data = await models.proposals.find(req.body);

         // Notification
         
         return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Proposals Add Successfull",
            data: data,
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


