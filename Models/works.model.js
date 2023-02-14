
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const works = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: 'proposal',
    },
    amount:{
        type:Number,
    },
    rated:{
        type:Number,
    },
    feedback:{
        type: String,
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

module.exports = mongoose.model("userWork", works);
