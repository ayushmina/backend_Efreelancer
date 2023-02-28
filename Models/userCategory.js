const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usercatgory = new Schema(
  {
    clientId :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    
    category:[{
        type: Schema.Types.ObjectId,
        ref:"category",
    }],

  },
  { timestamps: true }
);

module.exports = mongoose.model("usercatgory", usercatgory);
