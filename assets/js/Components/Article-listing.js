var ArticleListing = {} || ArticleListing;

ArticleListing = {
    templateId: $('#ArticleList'),
    containerId: $('#articleContainer'),
    topicId: $("#topicId").val(),
    totalArticles: $("#totalArticles").val(),

    get: function () {
        ArticleListing.topicId = $("#topicId").val();
        if (ArticleListing.topicId !== null && ArticleListing.topicId !== "" && ArticleListing.topicId !== "undefined") {
            var pageSize = $("#articleContainer").attr("data-pagesize");
            var pageNo = $("#articleContainer").attr("data-pageno");
            var culture = $("#articleContainer").attr("data-language");
            var articleTopicId = $("#topicId").val();
            var articleTag = $("#tag").val();
            var apiUrl = '/Umbraco/api/ArticleListingAPI/Get';

            ArticleListing.topicId = articleTopicId;

            $.ajax({
                url: apiUrl,
                type: "GET",
                data: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    culture: culture,
                    topicPageId: articleTopicId,
                    articleTag: articleTag
                },
                async: false,
                success: function (response) {
                    if (response.length > 0) {
                        var items = JSON.parse(response);

                        if (items !== null && items.length > 0) {
                            var listViewTemplate = ArticleListing.templateId[0].innerHTML;
                            var listViewOutput = Mustache.to_html(listViewTemplate, items);
                            $(ArticleListing.containerId).append(listViewOutput);
                            

                            pageNo = parseInt(pageNo) + 1;
                            if (ArticleListing.totalArticles / (parseInt(pageNo) * parseInt(pageSize)) <= 1) {
                                $(".load-more-article").remove();
                            }
                            else {
                                var articlesLeft = ArticleListing.totalArticles - (parseInt(pageNo) * parseInt(pageSize));
                                $("#articleLeft").html(articlesLeft);
                            }
                        }
                        $("#loadmore").removeClass("clicked-black");
                    }
                },
                error: function (error) {
                    console.log(error);
                    $("#loadmore").css('display', 'none');
                    $(".comp-article-list").remove();
                }
            });
        }
    },
    loadmoreClickEvent: function () {
        $(document).on('click', '#loadmore', function () {
            $(this).addClass("clicked-black");
            $("#articleContainer").attr("data-pageno", parseInt($("#articleContainer").attr("data-pageno")) + 1);
            ArticleListing.get();
        });
    },
    init: function () {
        ArticleListing.loadmoreClickEvent();

    }
};

$(document).ready(function () {
    ArticleListing.init();
});