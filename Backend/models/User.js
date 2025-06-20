// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
