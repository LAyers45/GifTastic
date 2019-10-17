$(document).ready(function () {

    var planets = [
        "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn",
        "Uranus", "Neptune", "Pluto", "Sun", "Asteroid",
        "Blackhole"
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".planet-button", function () {
        $("#planets").empty();
        $(".planet-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var planetDiv = $("<div class=\"planet-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var planetImage = $("<img>");
                    planetImage.attr("src", still);
                    planetImage.attr("data-still", still);
                    planetImage.attr("data-animate", animated);
                    planetImage.attr("data-state", "still");
                    planetImage.addClass("planet-image");

                    planetDiv.append(p);
                    planetDiv.append(planetImage);

                    $("#planets").append(planetDiv);
                }
            });
    });

    $(document).on("click", ".planet-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-planet").on("click", function (event) {
        event.preventDefault();
        var newplanet = $("input").eq(0).val();

        if (newplanet.length > 2) {
            planets.push(newplanet);
        }

        populateButtons(planets, "planet-button", "#planet-buttons");

    });

    populateButtons(planets, "planet-button", "#planet-buttons");
});
