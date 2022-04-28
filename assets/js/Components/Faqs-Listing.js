var FaqsListing = FaqsListing || {};
var PageTitle = "";
var Searchbtn = "";
FaqsListing = {
    isLoadmoreClicked: false,
    get: function () {
        var culture = $("body").data("language");
        var pageSize = $("#FaqsListing-container").data("pagesize");
        var pageNo = $("#FaqsListing-container").data("pageno");
        var nodeId = $("#FaqsListing-container").data("nodeid");
        var totalCount = $("#FaqsListing-container").data("totalcount");

        var apiUrl = '/Umbraco/api/FaqsApi/GetFaqsListing';
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
                    $("#FaqsListing-container").data("pageno", parseInt(pageNo) + 1);
                    var responseJson = JSON.parse(response);
                    if (responseJson && responseJson.FaqItems !== null && responseJson.FaqItems.length > 0) {
                        //$("#loader").css('display', 'none');
                        var ListingTemplate = $("#FaqsListingTemplate").html();
                        var FaqsListing = Mustache.to_html(ListingTemplate, responseJson.FaqItems);
                        $("#FaqsListing-container").append(FaqsListing);
                        $("#FaqsListing-container >:first-child").addClass("active");

                        if ((pageNo * pageSize) < totalCount) {
                           // $("#loadmore").css('display', '');
                        }

                        if ((pageNo * pageSize) >= totalCount) {
                            $("#loadmore").css('display', 'none');
                        }
                        $("#loadmore").removeClass("clicked-black");
                    }
                    else {
                        $("#ErrorMessage").css('display', 'block');
                        $("#loadmore").css('display', 'none');
                        $("#loader").css('display', 'none');
                    }
                }
                else {

                    $("#ErrorMessage").css('display', 'block');
                    $("#loadmore").css('display', 'none');
                    $("#loader").css('display', 'none');
                }
            },
            error: function (error) {
                console.log(error);
                FaqsListing.isLoadmoreClicked = false;
                $("#loadmore").css('display', 'none');
                $("#loader").css('display', 'none');
                $("#ErrorMessage").css('display', 'block');
            }
        });

    },
    SearchClickEvent: function () {
        $("#btn-Search").click(function () {
            $("#FaqsListing-container").data("pageno", 1);
            Searchbtn = $("#btn-Search").val();
            $("#FaqsListing-container").html("");
            FaqsListing.getEvents();
        });
    },
    loadMoreClickEvent: function () {

        $("#loadmore").click(function () {
            $(this).addClass("clicked-black");
            FaqsListing.isLoadmoreClicked = true;
            FaqsListing.getEvents();
        });
    },
    getEvents: function () {
        FaqsListing.get();
    },

    init: function () {
        FaqsListing.SearchClickEvent();
        FaqsListing.loadMoreClickEvent();
    }
};

$(document).ready(function () {
    FaqsListing.init();
});