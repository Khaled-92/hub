var statistics = statistics || {};

statistics = {
    upgradeTime: "2020/11/02 23:59:59",
    trainingStartCounter: function () {
        function timerRun() {
            var eventDate = new Date(statistics.upgradeTime);
            var cd = new Date();
            var d = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), eventDate.getHours(), eventDate.getMinutes(), eventDate.getSeconds(), eventDate.getMilliseconds());
            
            var distance = d - cd;
            var seconds = distance / 1000;

            var days = Math.floor(seconds / 24 / 60 / 60);
            var hoursLeft = Math.floor(seconds - days * 86400);
            var hours = Math.floor(hoursLeft / 3600);
            var minutesLeft = Math.floor(hoursLeft - hours * 3600);
            var minutes = Math.ceil(minutesLeft / 60);
            var remainingSeconds = Math.floor(seconds % 60);

            function pad(n) {
                return n < 10 ? "0" + n : n;
            }

            function copy(n, el) {
                if (el !== null) {
                    return n <= 1 ?
                        el.getAttribute("data-s") :
                        el.getAttribute("data-p");
                }
            }
            var daysElem = document.getElementById("days");
            var hoursElem = document.getElementById("hours");
            var minutesElem = document.getElementById("minutes");
            var secondsElem = document.getElementById("seconds");
            if (daysElem || hoursElem || minutesElem || secondsElem) {
                daysElem.innerHTML = pad(
                    "<span class=\"counter\">" +
                    pad(days) +
                    "</span>"
                );
                hoursElem.innerHTML = pad(
                    "<span class=\"counter\">" +
                    pad(hours) +
                    "</span>"
                );
                minutesElem.innerHTML = pad(
                    "<span class=\"counter\">" +
                    pad(minutes) +
                    "</span>"
                );
                secondsElem.innerHTML = pad(
                    "<span class=\"counter\">" +
                    pad(remainingSeconds) +
                    "</span>"
                );
            }

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(countdownTimer);
                if ($(".js-counter").length >= 1) {
                    $(".js-counter").remove();
                }
            }
        }
        var countdownTimer = setInterval(timerRun, 1000);
    },
    init: function () {

        statistics.upgradeTime = $("#updatedDate").val();
        statistics.trainingStartCounter();
    }
};

$(document).ready(function () {
    statistics.init();
});