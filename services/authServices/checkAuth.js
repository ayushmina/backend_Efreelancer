
import Jwt, { decode } from "jsonwebtoken";
import Boom from "boom";
let universalFunctions= require("../../utils/universalFunctions");
let  models=require("../../Models/index");
const checkAuth =  async(req, res, next) => {
    const token = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["token"];
    console.log("token:",token);
      if (token) {
        // let decoded = jwt_decode(token);
        Jwt.verify(token, Config.get("jwt.secret"), async function (err, decoded) {
          try {
            console.log("decoded inside",decoded);
  
              let model = models.userSchema;
              // let user = await model.findOne({ firebaseUserId: decoded.user_id });
              let user = await model.findOne({ _id: decoded.userId });
  
              if (!user) {
                throw Boom.unauthorized("USER_NOT_FOUND");
              }
              user = user.toJSON();
              // console.log("decoded" , user);
  
              if (user.isDeleted) {
                throw Boom.badRequest("USER_NOT_FOUND");
              }
              if (user.userSuspend) {
                throw Boom.badRequest("userSuspend");
              } 
              
         
                let userInfo = {
                  id: user._id,
                  name: user.name,
                  email: user.email ? user.email : "",
                  isPhoneVerified:user.isPhoneVerified,
                  // phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                };
                req.user = userInfo;
                next();
  
          } catch (error) {
            return universalFunctions.sendError(error, res);
          }
  
         })
        
      } else {
        return universalFunctions.sendError(
          Boom.forbidden("TOKEN_NOT_PROVIDED"),
          res
        );
      }
  };