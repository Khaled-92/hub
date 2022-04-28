var PressListing = PressListing || {};
var PageTitle = "";
var Searchbtn = "";
PressListing = {
    isLoadmoreClicked: false,
    get: function () {
        var culture = $("body").data("language");
        var pageSize = $("#PressListing-container").data("pagesize");
        var pageNo = $("#PressListing-container").data("pageno");
        var nodeId = $("#PressListing-container").data("nodeid");

        var apiUrl = '/Umbraco/api/PressApi/GetPressListing';
        $.ajax({
            url: apiUrl,
            type: "GET",
            data: {
                pageNo: pageNo,
                pageSize: pageSize,
                parentid: nodeId,
                culture: culture
            },
            success: function (response) {
                if (response !== null) {
                    $("#ErrorMessage").hide();
                    $("#PressListing-container").data("pageno", parseInt(pageNo) + 1);
                    var responseJson = JSON.parse(response);
                    if (responseJson && responseJson.PressItems !== null && responseJson.PressItems.length > 0) {
                        //$("#loader").css('display', 'none');
                        var ListingTemplate = $("#PressListingTemplate").html();
                        var PressListing = Mustache.to_html(ListingTemplate, responseJson.PressItems);
                        var MediaContainer = $("#PressListing-container");
                        MediaContainer.append(PressListing);

                        if ((pageNo * pageSize) < responseJson.TotalCount) {
                           // $("#loadmore").css('display', '');
                        }

                        if ((pageNo * pageSize) >= responseJson.TotalCount) {
                            $("#loadmore").css('display', 'none');
                        }
                        $("#loadmore").removeClass("clicked-black");
                    }
                    else {
                        //$("#ErrorMessage").css('display', 'block');
                        $("#loadmore").css('display', 'none');
                        $("#loader").css('display', 'none');
                        $("#loadmore").removeClass("clicked-black");
                    }
                }
                else {

                    //$("#ErrorMessage").css('display', 'block');
                    $("#loadmore").css('display', 'none');
                    $("#loader").css('display', 'none');
                }
            },
            error: function (error) {
                console.log(error);
                PressListing.isLoadmoreClicked = false;
                $("#loadmore").css('display', 'none');
                $("#loader").css('display', 'none');
                //$("#ErrorMessage").css('display', 'block');
            }
        });

    },
    SearchClickEvent: function () {
        $("#btn-Search").click(function () {
            $("#PressListing-container").data("pageno", 1);
            var MediaContainer = $("#PressListing-container");
            Searchbtn = $("#btn-Search").val();
            MediaContainer.html("");
            PressListing.getEvents();
        });
    },
    loadMoreClickEvent: function () {

        $("#loadmore").click(function () {
            $(this).addClass("clicked-black");
            PressListing.isLoadmoreClicked = true;
            PressListing.getEvents();
        });
    },
    getEvents: function () {
        PressListing.get();
    },

    init: function () {
        PressListing.SearchClickEvent();
        PressListing.loadMoreClickEvent();
    }
};

$(document).ready(function () {
    PressListing.init();
});