
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposals = new Schema(
  {
    clientId :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    jobpost:{
        type: Schema.Types.ObjectId,
        ref: 'jobpost',
    },
    proposals :{
        type:String,
    },
    amount:{
        type:String,
    },
    rated:{
        type:Number,
    }    

  },
  { timestamps: true }
);

module.exports = mongoose.model("proposals", proposals);
