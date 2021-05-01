const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    discordId: String,
    displayName: String,
    admin: {type: Boolean, default: false}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
