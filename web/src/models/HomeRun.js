const mongoose = require("mongoose");

const homeRunSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        playerName: String,
        playerOvr: Number,
        distance: Number,
        description: String
    },
    {
        timestamps: true
    }
);

const HomeRun = mongoose.model("HomeRun", homeRunSchema);
module.exports = HomeRun;
