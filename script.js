function randomColor() {
    const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', 
                  '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }

$(document).ready(function() {
    $('#new-quote').click(function() {
        let color = randomColor()
        $('body').css('background-color', color);
        $('#new-quote').css('background-color', color);
        $('#tweet-quote').css('background-color', color);
    });
});


function getQuote() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=happiness',
        headers: { 'X-Api-Key': 'WeNQ4WrWeHNgmNlJSdWNsw==kdvPuz2fV5PYMF6A'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            
            let quote = result[0].quote;
            let author = result[0] .author;
            // change the quote and author text
            $("#text").fadeOut(500, function() {
                $(this).text('"' + quote + '"');
                $(this).fadeIn(500);
            });
            $("#author").fadeOut(500, function() {
                $(this).text("- " + author);
                $(this).fadeIn(500);
            });
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

$(document).ready(function() {
    getQuote();
    $("#new-quote").click(function() {
        getQuote();
    });
});
  
$("#tweet-quote").click(function() {
    // Get the current quote and author text
    var quoteText = $("#text").text();
    var authorText = $("#author").text();
    // Construct the status text by combining the quote and author
    var statusText = encodeURIComponent(quoteText + authorText);
    // Construct the Twitter share URL with the pre-filled status text
    var twitterUrl = 'https://twitter.com/intent/tweet?text=' + statusText;
    // Open the Twitter composer window with the pre-filled status text
    window.open(twitterUrl, '_blank');
});