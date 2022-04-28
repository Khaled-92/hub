var Form = Form || {};
Form = {

    formSubmit: function () {

        var url = $("#subscriptionForm").attr("action");
        var data = $('#subscriptionForm').serialize();
        var newsletterSubscriptionPage = $("#newsletterSubscriptionLink").val();
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (response) {
                if (!response.includes("error")) {
                    $("#btnSubmit").removeClass("clicked");
                    window.location.href = newsletterSubscriptionPage;
                }
                $("#btnSubmit").removeClass("clicked");
                console.log("An error has occured: ", response);
            },
            error: function (error) {
                $("#btnSubmit").removeClass("clicked");
                console.log(error);
            }
        });
    },

    UnsubFormSubmit: function () {
        var querystring = $("#querystring").val();
        var url = "/umbraco/api/NewsLetterUnsubscriptionApi/NewsletterUnsubscribe";
        var newsletterSubscriptionPage = window.location.protocol + '//' + window.location.host + window.location.pathname;
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {
                Email: querystring
            },
            error: function (error) {
                $("#btnSubmit").removeClass("clicked");
                console.log(error);
            }
        }).done(function (response) {
            if (!response.includes("error")) {
                var link = newsletterSubscriptionPage.concat("?response=" + response);
                window.location.href = link;
                $("#unsubscribe").removeClass("clicked");
            }
            else {
                console.log("An error has occured: ", response);
                window.location.href = newsletterSubscriptionPage;
                $("#unsubscribe").removeClass("clicked");
            }
        });
    },

    validate: function () {
        var pattern = /^\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b$/;
        var lbl = $("#msg");
        var value = $("#UserEmail").val();
        var msgEmpty = $("#msgEmptyEmail").val();
        var msgValid = $("#msgValidEmail").val();
        if (value === null || value.trim() === '') {

            lbl.text(msgEmpty);
            $("#btnSubmit").removeClass("clicked");
            return false;
        }
        else {
            if (pattern.test(value)) {
                lbl.text("");
                $("#btnSubmit").removeClass("clicked");
                return true;
            }
            else {
                lbl.text(msgValid);
                $("#btnSubmit").removeClass("clicked");
                return false;
            }
        }
    }
};

$("#btnSubmit").click(function () {
    if (Form.validate()) {
        $("#btnSubmit").addClass("clicked");
        Form.formSubmit();
    }
    return false;
});

$("#unsubscribe").click(function () {
    $("#unsubscribe").addClass("clicked");
    setTimeout(function () {
        Form.UnsubFormSubmit();
    }, 50);
});