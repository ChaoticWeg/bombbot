const mongoose = require("mongoose");

exports.User = require("./User");
exports.HomeRun = require("./HomeRun");

exports.connect = () => {
    return new Promise((resolve, reject) => {
        try {
            const db = mongoose.connection;

            let settled = false;

            db.on("error", (err) => {
                if (!settled) {
                    settled = true;
                    reject(err);
                }
            });

            db.once("open", () => {
                if (!settled) {
                    settled = false;
                    resolve(db);
                }
            });

            mongoose.connect(process.env["DB_URL"], {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (err) {
            reject(err);
        }
    });
};
