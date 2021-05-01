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
    const findCondition = { discordId: profile.id };
    User.findOne(findCondition, (err, findResult) => {
        // If we had an error or found a user, we're done
        if (err || findResult) return cb(err, findResult);

        // If no user with that Discord ID, create a new one with the Discord ID and username from the profile
        const createData = { discordId: profile.id, displayName: profile.username };
        User.create(createData, (err, createResult) => cb(err, createResult));
    });
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
}

passport._copyUserToResponse = function (req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }

    next();
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;
