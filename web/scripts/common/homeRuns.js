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
}

exports.renderOne = function renderHomeRun(homeRun, index = 0) {
    const row = $("<tr></tr>");

    const cells = [
        $("<th scope=\"col\"></th>").text(+index || ""),
        $("<td></td>").text(homeRun.distance),
        $("<td></td>").text(homeRun.playerName),
        $("<td></td>").text(homeRun.playerOvr)
    ];

    _.each(cells, c => row.append(c));
    return row;
}
