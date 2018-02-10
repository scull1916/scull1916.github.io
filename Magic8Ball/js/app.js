$(document).ready(function() 
{	
    $('select').material_select();
    $('.materialboxed').materialbox();
    //$('.carousel.carousel-slider').carousel({fullWidth: true});
    $(".progress").hide();
    $("#refresh").hide();
    $("#submit").on("click", function() 
    {
    	event.preventDefault();
    	$("#submit").hide();
    	$(".progress").show();
    	$("#refresh").show();
    //onclick get random function to run, giphy, nytimes or omdb
	    var functionArray = [giphy, omdb, nytimes];
	    var randomSelect = Math.floor(Math.random() * 3);
	    console.log(randomSelect);
	//based on random return, call function (giphy, nytimes or omdb) with if statement, else last should be giphy if no results are returned from omdb or nytimes
	    $("#resultText").empty();
        $("#results").empty();

	    var functionCall = functionArray[randomSelect]().then(function(result) 
	    {
	    	//console.log(functionCall);
	    		$(".progress").hide();
	    		$("#nameInput").val("");
			    $("#monthInput").empty();
			    $("#dayInput").empty();
	  	})
	});

		var giphy = function() 
		{
		  	var queryURL = "http://api.giphy.com/v1/gifs/random?&api_key=BLZeUFUso54cVFZ9RU3N0aCuaP8WB3Jw&tag=kittens";
			    return $.ajax({
			        url: queryURL,
			        method: "GET"
			    }).then(function(response) 
			    {
			      	var results = response.data;
			      	var image = results.image_original_url;
			      	var title = results.title;
		      	//<img class="materialboxed" data-caption="Get me a Box Of Kittens! STAT!" width="250" src="images/kittens1.jpg">
		      	$("#resultText").append("<h2>Let us melt your heart with kittens</h2>");
		      	$("#results").append("<img class='materialboxed' data-caption='" + title + "' src='" + image + "'>");
		      	//clear form fields
				});
		};
		var omdb = function() 
		{
			var APIKey = "289c8015";
					//title for the movieYear we want to call, we will only use the first letter to try to generate matching results
					var title = $("#nameInput").val().substring(0, 1);  
					//year movies came out that you randomly want to generate one by one
					var movieYear = Math.floor(Math.random() * 16 + 1998);
					//make a queryURL variable instead of using literal string name in the AJAX method ...construct URL                                                                                  
					var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=" + movieYear + "&plot=short&apikey=" + APIKey; 
					//Code to perform GET request to OMDB API, and then to log the response to the console
					return $.ajax({
						url: queryURL,
						method: "GET"
					}).then(function(response){

					
						//methods run on jQuery selectors return te selector they were run on
						var titleId = response.Title;
						
						var yearId = movieYear
						console.log(yearId);
						var posterImage = $("<img>").attr("src", response.Poster);
						var actors = response.Actors;

						//append the desired parameters to the results section of HTML
						$("#resultText").append("<p><h2>The movie that shares your Birthday from "+ yearId + "!!!</h2></p><h2>" + response.Title + "</h2><br><h3>Staring: " + response.Actors + "</h3><br><p>" + response.Plot + "</p>");
						$("#results").append("<img class='materialboxed' src=" + response.Poster + "'>");
						
					});
		};

		var nytimes = function() 
		{	
			var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2cd9f063d7884d46800cd9477c11cdb2";
	
			//Declare variables to receive month & day entered by user
			var queryYr = Math.floor(Math.random() * 16 + 1998);

			var queryTermMo = $("#monthInput option:selected").val().trim();

			var queryTermDay = $("#dayInput option:selected").val().trim();

			var dateString = queryYr + queryTermMo + queryTermDay;

			var newURL = queryURL + "&begin_date=" + dateString + "&end_date=" + dateString;

			console.log(queryURL);
			console.log(newURL);

			return $.ajax(
			{
				url: newURL,
				method: "GET"

			}).done(function(NYTData)
				{

					
					console.log("URL: " + newURL);

					console.log(NYTData.response.docs[0].web_url);

					//Declare a variable to hold the first article returned by the GET request
					var article = NYTData.response.docs[0].web_url;
					console.log(article);					
      				// $("#results").append("<a href='" + NYTData.response.docs[0].web_url + "'>" + NYTData.response.docs[0].web_url + "</a>");
      				$("#resultText").append("<h4><a href=" + article + ">New York Times News of the Day</a></h4>");
					$("#resultText").append("<p><h2>Click on the article that shares your Birthday from " + queryYr + "!!</h2></p><h4><img src='images/nytimesImage.jpg'></h4>");
					
      				$("#results").append("<a target='_ blank' href='" + article + "'>" + article + "</a>");


				}).fail(function(err)
					{
						throw err;
					})
			};


//end the document ready function
});

