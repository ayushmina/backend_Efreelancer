const cloudinary              = require("cloudinary")
const config                  = require("config");

require("dotenv").config();
let cloudinaryConfig = config.get("cloudinaryConfig")
cloudinary.config({
  cloud_name: "dryfxhged",
  api_key: "427659738537146",
  api_secret: "GgccYcqWBLkm9OZ_1epw25Z8ydc"
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
      console.log(file,"here is files");
      cloudinary.uploader.upload(file, (result) => {
          // console.log(err)
        resolve({
          url: result.url,
          id: result.public_id
        })
      }, {
        resource_type: "auto" ,
        folder: folder
      })
    })
  }
