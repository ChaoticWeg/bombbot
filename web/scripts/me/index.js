const {setGreeting} = require("./greeting");
const {setupForm} = require("./form");
const {setupOnDeleteEvents} = require("./deleteButtons");

$(() => {
    setGreeting();
    setupForm();
    setupOnDeleteEvents();
});
