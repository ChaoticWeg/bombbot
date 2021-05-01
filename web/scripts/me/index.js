const {setGreeting} = require("./greeting");
const {setupForm} = require("./form");
const {refreshTable} = require("./table");

$(() => {
    setGreeting();
    setupForm();
    refreshTable();
});
