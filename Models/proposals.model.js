
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposals = new Schema(
  {
    address:{
      type:String,
    },
    clientId :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    freelancerId :{
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
    deliveryTime:{
      type:String,
  },
    action:{
        type: String,
        enum: [
          "accpeted",
          "in process"
        ],
        default: "in process",
    }    

  },
  { timestamps: true }
);

module.exports = mongoose.model("proposal", proposals);
