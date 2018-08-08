var gifs =["NY Giants", "Pittsburg Steelers", "New England Patriots", "Cleveland Browns", "NY Jets"];

function alertGifName() {
  var gifName = $(this).attr("data-name");

}


function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");

    a.addClass("gif");
    a.attr("data-name", gifs[i]); 
    a.text(gifs[i]);
    $("#buttons-view").append(a);
  }
}


$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();

  gifs.push(gif);

  renderButtons();

});

$(document).on("click", ".gif", alertGifName);

renderButtons();


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifs + "&api_key=dc6zaTOxFJmzC&limit=5";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      
      .then(function(response) {
        
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

       
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            
            var gifImage = $("<img>");

           
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#buttons-view").prepend(gifDiv);
          }
        }
      });
