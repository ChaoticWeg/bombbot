const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    discordId: String,
    displayName: String,
    admin: { type: Boolean, default: false }
});

userSchema.statics.findByDiscordProfileOrCreate = async function ({ id, username }) {
    const found = await this.findOne({ discordId: id });
    if (found) return found;

    const created = await this.create({ discordId: id, displayName: username });
    return created;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
