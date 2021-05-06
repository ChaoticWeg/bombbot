const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    discordId: { type: String, required: "Must be linked to a Discord ID" },
    displayName: { type: String, minLength: 2, maxLength: 32, required: "Must have a display name" },
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
