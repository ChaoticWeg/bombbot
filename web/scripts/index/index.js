const $ = require("jquery");
const _ = require("underscore");

const { homeRuns } = require("../common");

let initialRender = true;

function renderAll(rows) {
    $("#bombTable tbody").empty();
    _.each(rows, (r) => $("#bombTable tbody").append(r));
}

async function fetch() {
    if (initialRender) {
        initialRender = false;
        return bombs;
    } else {
        return await homeRuns.fetchAll();
    }
}

function refreshTable() {
    fetch()
        .then((hrs) => _.sortBy(hrs, (hr) => -hr.distance))
        .then((hrs) => _.map(hrs, (hr, i) => homeRuns.renderOne(hr, i + 1, false)))
        .then(renderAll);
}

$(() => {
    refreshTable();
    setInterval(refreshTable, 10000);
});
