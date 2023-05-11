let universalFunctions=require("../utils/universalFunctions");
let Joi       =require("joi");
let models    = require("../Models/index"); 
const { ObjectId } = require('mongodb');


let curd={
  getUserInfo : async function (req, res) {
    try {
        
        let id = req.user.id;
         if(!id){
          return universalFunctions.sendError(
            {
              statusCode: 400,
              message: "id not found",
            },
            res
          )         } 

         let user= await  models.userSchema.findOne({_id:id});
         user = JSON.parse(JSON.stringify(user))
         delete user.password
         delete user.salt
         delete user.resetPasswordOtp
         delete user.resetPasswordExpires

          return universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "post   Successfull",
              data:user,
            },
            res
          )
        }
       catch (error) {
        return universalFunctions.sendError(error, res)
      }
},
  updateProfile : async function (req, res) {
    try {
        let playload=req.body;
        let id = req.user.id;
         if(!id){
          return universalFunctions.sendError(
            {
              statusCode: 400,
              message: "id not found",
            },
            res
          )         } 
          console.log(id,playload)
          let data=playload.data
          
         let user= await  models.userSchema.findOneAndUpdate(
           {
            _id:id
          },
             {$set:data},
             { new: true }
         );


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
        let searchText = req.query._id
        console.log(req.query,"here is ")
        let playload={};
        if(searchText){
          playload._id=searchText;
        }
        console.log(playload,"here is ")
        let jobPost=await models.jobpost.find(playload).populate([
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
          deliveryTime: Joi.string().trim().required(),
          address: Joi.string().trim().required(),
          clientId:Joi.string().trim().required(),
        })
        
         await universalFunctions.validateRequestPayload(req.body, res, schema);
         let freelancerId=req.user.id;
        let playload=req.body;
        playload.freelancerId=freelancerId;
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
        
        // const schema = Joi.object().keys( {
        //     clientId: Joi.string().trim(),
        //     jobpostId: Joi.string().trim(),
        //   })

        //  await universalFunctions.validateRequestPayload(req.body, res, schema);
        let payload=req.body;
        console.log(payload,"inside getproposals");
         let data = await models.proposals.find(payload);

         // Notification
         
         return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Proposals get Successfull",
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


