const mongoose = require("mongoose");

const FollowupModel = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  followup: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
 
});

const FollowUp = mongoose.model("followup", FollowupModel);

module.exports = FollowUp;
