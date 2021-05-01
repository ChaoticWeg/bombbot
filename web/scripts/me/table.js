const $ = require("jquery");
const _ = require("underscore");

const { homeRuns } = require("../common");

function renderAll(rows) {
    $("#bombTable tbody").empty();
    _.each(rows, (r) => $("#bombTable tbody").append(r));
}

function checkBombs() {
    return new Promise((resolve) => {
        return bombs && Array.isArray(bombs) ? resolve(bombs) : resolve([]);
    });
}

exports.refreshTable = function refreshTable() {
    checkBombs()
        .then((hrs) => _.sortBy(hrs, hr => -hr.distance))
        .then((hrs) => _.map(hrs, (hr, i) => homeRuns.renderOne(hr, i + 1)))
        .then(renderAll)
        .catch((err) => {
            console.error(err);
            alert("Error. Check console");
        });
};
