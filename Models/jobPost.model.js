const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema(
  {
    clientId :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref:"category",
    }],
    PaymentVerified:{
        type:Boolean,
        default:false,
    }
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("jobpost", jobPostSchema);
