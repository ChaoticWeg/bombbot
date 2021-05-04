const $ = require("jquery");
const _ = require("underscore");

let deleting = false;

function promptReallyDelete(bomb) {
    const message = [
        "Really delete this home run?\n",
        `Player: ${bomb.playerOvr} ${bomb.playerName}`,
        `Distance: ${bomb.distance} ft`
    ].join("\n");

    return confirm(message);
}

function onDeleteError(err) {
    deleting = false;
    alert("Unable to delete. See console for details and file an issue on GitHub if one does not already exist.");
    console.error(err);
}

function deleteReallyForGood(bomb) {
    deleting = true;
    $.ajax({
        method: "DELETE",
        url: `/api/bombs/${bomb._id}`,
        success: () => window.location.reload(),
        error: (err) => onDeleteError(err)
    });
}

function onDeleteClicked(e) {
    e.preventDefault();

    if (_.isEmpty(bombs)) {
        // Shouldn't ever get here...
        return;
    }

    const _id = $(this).attr("id");
    const bomb = _.findWhere(bombs, { _id });

    const really = promptReallyDelete(bomb);
    if (really) {
        deleteReallyForGood(bomb);
    }
}

exports.setupOnDeleteEvents = function setupOnDeleteEvents() {
    $(".btn-delete-bomb").on("click", onDeleteClicked);
};
