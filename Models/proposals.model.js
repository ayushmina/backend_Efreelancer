
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposals = new Schema(
  {
    clientId :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    jobpostId:{
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
    },
    action:{
        type: String,
        enum: [
          "accpeted",
          "In_process"
        ],
        default: "in process",

    }    

  },
  { timestamps: true }
);

module.exports = mongoose.model("proposal", proposals);
