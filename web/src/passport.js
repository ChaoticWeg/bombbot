const passport = require("passport");
const { User } = require("./models");

const DiscordStrategy = require("passport-discord").Strategy;
const scopes = ["identify"];

const config = {
    clientID: process.env["DISCORD_CLIENT_ID"],
    clientSecret: process.env["DISCORD_CLIENT_SECRET"],
    callbackURL: process.env["CALLBACK_URL"],
    scope: scopes
};

function verify(_accessToken, _refreshToken, profile, cb) {
    User.findByDiscordProfileOrCreate(profile)
        .then((result) => cb(null, result))
        .catch((err) => cb(err, null));
}

const strategy = new DiscordStrategy(config, verify);
passport.use(strategy);

passport._private = function (req, res, next) {
    if (!req.user) {
        return res.redirect("/");
    }

    next();
};

passport._adminOnly = function (req, res, next) {
    if (!req.user || !req.user.admin) {
        return res.redirect("/");
    }

    next();
};

passport._copyUserToResponse = function (req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }

    next();
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .exec()
        .then((res) => done(null, res))
        .catch((err) => done(err, null));
});

module.exports = passport;
