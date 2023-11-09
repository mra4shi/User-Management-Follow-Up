const mongoose = require("mongoose");

const NotificationModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  read: {
    type: String,
    default: "Unread",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("notification", NotificationModel);
module.exports = Notification;
