$(document).ready(function () {


    // Initial array of gifs
    var gif = ["goat", "cow", "seal", "cat", "dog", "pineapple"];

    function makeButtons(array, addClass, area) {
        $(area).empty();

        for (var i = 0; i < array) {
            var button = $("<button");
            button.addClass(addClass);
            button.attr("data-type", arrayToUse[i]);
            button.text(array[i]);
            $(areaToAddTo).append(a);
        }
    }
    $(document).on("click", ".gif-button", function () {

    })

})