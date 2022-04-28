var Header = {} || Header;

Header = {
    get: function () {
        var querySearchTerm = $("#query").val();
        var defaultSearchUrl = $("#defaultSearch").val();
        if (querySearchTerm !== null && querySearchTerm !== "" && querySearchTerm !== "undefined") {
            var url = window.location.protocol + '//' + window.location.host + defaultSearchUrl + "?query=" + querySearchTerm;
            window.location.href = url;
        }
    }
};

$("#search").click(function () {
    Header.get();
});

$(document).ready(function () {
    $("#query").keypress(function (event) {
        if (event.which === 13) {
            $("#search").click();
        }
    });
});