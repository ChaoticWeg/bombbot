const _ = require("underscore");

const express = require("express");
const apiRouter = express.Router();

const { User, HomeRun } = require("../../models");

function respondError(res, code, error) {
    if (typeof error === "object") {
        error = { ...error, message: error.message };
    }

    res.status(code).type("json").send({ code, error });
}

apiRouter.get("/bombs/:id", (req, res) => {
    const { id } = req.params;

    if (_.isEmpty(id)) {
        return respondError(res, 400, "Missing HomeRun id");
    }

    HomeRun.findById(id)
        .populate(["user"])
        .exec()
        .then((data) => res.status(200).type("json").send(data))
        .catch((err) => {
            if (err.kind === "ObjectId") {
                respondError(res, 400, `Invalid HomeRun id: ${id}`);
            } else {
                respondError(res, 500, err);
            }
        });
});

apiRouter.delete("/bombs/:id", (req, res) => {
    if (!req.user) {
        return respondError(res, 401, "Unauthorized");
    }

    const { id } = req.params;
    HomeRun.findById(id)
        .populate(["user"])
        .exec()
        .then((hr) => {
            if (hr.user && hr.user._id && String(hr.user._id) !== String(req.user._id)) {
                console.log("HOME RUN", hr.user, "CANNOT BE DELETED BY", req.user._id);
                return respondError(res, 403, "Cannot delete a bomb that isn't yours");
            }

            HomeRun.findByIdAndDelete(id)
                .exec()
                .then(() => res.status(200).type("json").send({ ok: true }))
                .catch((err) => respondError(res, 500, err));
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                respondError(res, 400, `Invalid HomeRun id: ${id}`);
            } else {
                respondError(res, 500, err);
            }
        });
});

apiRouter.get("/bombs", (req, res) => {
    const { user, limit } = req.query;

    let mq = HomeRun.find().populate(["user"]);

    if (!_.isEmpty(user)) {
        mq = mq.where({ user });
    }

    if (+limit && +limit > 0) {
        mq = mq.limit(+limit);
    }

    mq.exec()
        .then((data) => res.status(200).type("json").send(data))
        .catch((error) => respondError(res, 500, error));
});

apiRouter.post("/bombs", (req, res) => {
    const requiredFields = ["playerName", "playerOvr", "distance"];
    for (const rf of requiredFields) {
        if (!_.has(req.body, rf)) {
            return respondError(res, 400, `Missing required field: ${rf}`);
        }
    }

    let { discordId, playerName, playerOvr, distance } = req.body;

    if (_.isEmpty(discordId)) {
        if (req.user && req.user.discordId) {
            discordId = req.user.discordId;
        } else {
            return respondError(res, 400, `Missing required field: discordId`);
        }
    }

    User.findOne({ discordId })
        .limit(1)
        .exec()
        .then((user) => {
            HomeRun.create({ user, playerName, playerOvr, distance }, (err, hr) => {
                if (err) return respondError(res, 500, err);
                res.status(200).type("json").send(hr);
            });
        })
        .catch((err) => {
            respondError(res, 500, err);
        });
});

apiRouter.get("*", (req, res) => {
    return respondError(res, 400, `API resource not found: ${req.path}`);
});

module.exports = apiRouter;
