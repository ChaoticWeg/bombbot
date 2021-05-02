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

homeRunSchema.statics.top = async function (user, limit) {
    let findQuery = this.find().sort("-distance -playerOvr");

    if (user) {
        findQuery = findQuery.where({ user });
    }

    if (+limit) {
        findQuery = findQuery.limit(limit);
    }

    return await findQuery.populate(["user"]).exec();
};

homeRunSchema.statics.byId = async function (id) {
    return await this.findById(id).populate(["user"]).exec();
};

const HomeRun = mongoose.model("HomeRun", homeRunSchema);
module.exports = HomeRun;
