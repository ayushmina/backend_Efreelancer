const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema(
  {
    clientId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    jobpostId:{
        type: Schema.Types.ObjectId,
        ref: 'jobpost',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("savejobpost", jobPostSchema);
