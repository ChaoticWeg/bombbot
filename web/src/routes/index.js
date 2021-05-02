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
    HomeRun.top(null, 10)
        .then((bombs) => res.render("index", { bombs }))
        .catch((error) => res.render("index", { error }));
});

router.get("/me", passport._private, passport._copyUserToResponse, (req, res) => {
    HomeRun.top(req.user.id, 10)
        .then((bombs) => res.render("me", { title: req.user.displayName, bombs }))
        .catch((error) => res.render("me", { title: req.user.displayName, error }));
});

router.get("/admin", passport._adminOnly, passport._copyUserToResponse, (_req, res) => {
    res.render("admin", { title: "Admin Panel" });
});

// Export

module.exports = router;
