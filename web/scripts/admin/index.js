const $ = require("jquery");
const socket = io();

function disableButtonTimeout(btn, timeoutMs) {
    $(btn).attr("disabled", true);
    setTimeout(() => $(btn).removeAttr("disabled"), timeoutMs);
}

$(() => {
    $(".btn#syncPlayers").on("click", () => {
        disableButtonTimeout($(this), 2500);
        alert("Syncing players is not supported and might never be");
    });
});
