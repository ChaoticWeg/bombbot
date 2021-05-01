const express = require("express");
const router = express.Router();

const { HomeRun } = require("../models");

// Middleware

const passport = require("../passport");
router.use(passport._copyUserToResponse);

// API router

const apiRouter = require("./api");
router.use("/api", apiRouter);

// Top-level routes

router.get("/", passport._copyUserToResponse, (_req, res) => {
    res.render("index");
});

router.get("/me", passport._private, passport._copyUserToResponse, (req, res) => {
    HomeRun.find()
        .where({ user: req.user._id })
        .limit(10)
        .exec()
        .then((bombs) => {
            res.render("me", { title: req.user.displayName, bombs });
        })
        .catch((err) => {
            console.error(err);
            res.render("me", { title: req.user.displayName });
        });
});

router.get("/admin", passport._adminOnly, passport._copyUserToResponse, (_req, res) => {
    res.render("admin", { title: "Admin Panel" });
});

// Export

module.exports = router;
