const $ = require("jquery");

function mapFormData(l, r) {
    l[r.name] = r.value;
    return l;
}

function onSubmitSuccess() {
    window.location.replace("/me");
}

function onSubmitError(err) {
    alert("Unable to submit. Check the console. Better error handling coming soon.");
    console.log(err);
}

exports.setupForm = () => {
    $("#bombForm").on("submit", (e) => {
        e.preventDefault();

        let data = $("#bombForm").serializeArray();
        data = data.reduce(mapFormData, {});
        data = JSON.stringify(data);
        
        $.ajax({
            data,
            type: "POST",
            url: "/api/bombs",
            dataType: "json",
            contentType: "application/json",
            success: onSubmitSuccess,
            error: onSubmitError
        })
    });
}
