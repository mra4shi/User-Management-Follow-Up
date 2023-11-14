const mongoose = require("mongoose");
  
const NotificationModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userid : {
    type : String,
    required : true
  },
  read: {
    type: String,
    default: "Unread",
  },
  date: {
    type: String,
    required : true
  },
});

const Notification = mongoose.model("notification", NotificationModel);
module.exports = Notification;
