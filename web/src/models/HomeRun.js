const mongoose = require("mongoose");

const homeRunSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: "Must be linked to a user" },
        playerName: { type: String, required: "Player name is required" },
        playerOvr: {
            type: Number,
            required: "Player OVR is required",
            min: [1, "Player OVR too low"],
            max: [99, "Max player OVR is 99"]
        },
        distance: {
            type: Number,
            required: "Distance is required",
            min: [1, "Distance must be believable (>= 1 ft)"],
            max: [600, "Distance must be believable (<= 600 ft)"]
        },
        description: { type: String, maxLength: [1024, "Description cannot exceed 1024 characters"] }
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
        findQuery = findQuery.limit(+limit);
    }

    return await findQuery.populate(["user"]).exec();
};

homeRunSchema.statics.bottom = async function (user, limit) {
    let findQuery = this.find().sort("distance -playerOvr");

    if (user) {
        findQuery = findQuery.where({ user });
    }

    if (+limit) {
        findQuery = findQuery.limit(+limit);
    }

    return await findQuery.populate(["user"]).exec();
};

homeRunSchema.statics.byId = async function (id) {
    return await this.findById(id).populate(["user"]).exec();
};

const HomeRun = mongoose.model("HomeRun", homeRunSchema);
module.exports = HomeRun;
