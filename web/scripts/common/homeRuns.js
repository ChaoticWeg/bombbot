const $ = require("jquery");
const _ = require("underscore");

exports.fetchForUser = function fetchForUser(userId, limit = 0) {
    return new Promise((resolve, reject) => {
        let url = `/api/bombs?user=${userId}`;
        if (+limit && +limit > 0) {
            url += `&limit=${limit}`;
        }

        $.ajax({ url, success: resolve, error: reject });
    });
};

function onDeleteClicked(e) {
    const _id = $(this).attr("id");
    const homeRun = _.findWhere(bombs, { _id });

    if (_.isEmpty(homeRun)) {
        console.warn("User clicked on delete button for a bomb with id", _id, "but no such bomb exists");
    } else {
        const confirmMsg = [
            "Delete home run?",
            "",
            `Player: ${homeRun.playerName}`,
            `OVR: ${homeRun.playerOvr}`,
            `Distance: ${homeRun.distance}`
        ].join("\n");

        const really = confirm(confirmMsg);
        if (really) {
            $.ajax({
                url: `/api/bombs/${_id}`,
                method: "DELETE",
                success: () => location.reload(),
                error: (...args) => {
                    alert("Error deleting this bomb. Check the console for details");
                    console.error(args);
                }
            });
        }
    }
}

exports.renderOne = function renderHomeRun(homeRun, index = 0) {
    const row = $("<tr></tr>").attr("id", `bomb-${homeRun._id}`);

    const cells = [
        $('<th scope="col"></th>').text(+index || ""),
        $("<td></td>").text(homeRun.distance),
        $("<td></td>").text(homeRun.playerName),
        $("<td></td>").text(homeRun.playerOvr),
        $("<td></td>").append(
            $("<button></button>")
                .attr("id", `${homeRun._id}`)
                .attr("class", "btn btn-danger")
                .on("click", onDeleteClicked)
                .append($("<i></i>").attr("class", "far fa-trash-alt"))
        )
    ];

    _.each(cells, (c) => row.append(c));
    return row;
};
