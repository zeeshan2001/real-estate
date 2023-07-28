const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Username must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [3, "Password must be at least 5 characters long"],
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
