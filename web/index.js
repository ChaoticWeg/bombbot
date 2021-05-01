const express = require("express");
const app = express();

// Set up socket.io

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    // TODO
});

// Middleware

app.use(express.static("public"));
app.use(express.static("dist"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env["WEB_SESSION_SECRET"]));

const session = require("express-session");
app.use(session({ secret: process.env["WEB_SESSION_SECRET"] }));

const passport = require("./src/passport");
app.use(passport.initialize());
app.use(passport.session());

// Config

app.set("view engine", "pug");

// Routes

const router = require("./src/routes");
app.use("/", router);

// Discord auth

const authOptions = { failureFlash: true, failureRedirect: "/#err" };
app.get("/auth", passport.authenticate("discord"));
app.get("/auth/callback", passport.authenticate("discord", authOptions), (_req, res) => res.redirect("/me"));
app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// API

const apiRouter = require("./src/routes/api");
app.use("/api", apiRouter);

// OK

const { connect } = require("./src/models");
connect()
    .then((db) => {
        server.listen(3000, () => console.log("webserver listening on port 3000"));
    })
    .catch(console.error);
