$(document).ready(function()
{

	var topics = 
	[
	
	"black books",
	"doctor who",
	"dougal",
	"father ted",
	"flight of the conchords",
	"it crowd",
	"portlandia",
	"simpsons"
	
	];

	var addShow = "";
	var authKey = "mh76jvx6Z44dt7dBKWa8ZHWfoSw5Xitm";
	var addTag = "";
	

	// console.log(queryURL);
	console.log(authKey);

//Receive input from the user and use the input to dynamically add a button to the other buttons

	$("#submitBtn").on("click", function(event)
	{
		event.preventDefault();

		addShow = $("#userAdd").val().trim();
		console.log("addShow: " + addShow);

		$("<button>").appendTo(".button").text(addShow).addClass("btn btn-outline-primary").attr("value", addShow);
		

		topics.push(addShow);
		console.log(topics);



	});



//Dynamically add buttons with content from the topics array
for (i=0; i<topics.length; i++)
{

	$("<button>").appendTo(".button").text(topics[i]).addClass("btn btn-outline-primary").attr("value", topics[i]);


}




//Click on a button
$(".btn").on("click", function()
{

	//Empty previous selection's content
	$("#images").empty();

	console.log(topics);

	//Grab value from button, assign it to the tag variable
	addTag = $(this).val();
	console.log(addTag);

	//concatenate to the url to pull in Giphy content related to the button click
	var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + authKey + "&q=" + addTag;
	// queryURL = queryURL + "&q=" + addTag;
	console.log(queryURL);

	//Running the AJAX GET request
	$.ajax(
	{
		url: queryURL,
		method: "GET"
	})

	//When the date comes back
	.then(function(response)
	{

		var results = response.data;
		console.log(results);

		//Loop through the results
		for (var i=0; i<results.length; i++)
		{
			if (results[i].rating !== "r" && results[i].rating !== "pg-13")
			{
				//create a div to place the retrieved content
				var giphyDiv = $("<div class='image'>");

				//capture the retrieved content's rating
				var rating = results[i].rating;


				//create a place to post the content's rating
				var p = $("<p>").text("Rating: " + rating);

				//create a place to post the giphy
				var retrGif = $("<img>");

				//give the giphy space a source attr which is a property of the content pulled
				retrGif.attr("src", results[i].images.fixed_height.url);

				//append rating and content to the giphyDiv
				giphyDiv.append(p);
				giphyDiv.append(retrGif);

				//Prepend content to the space provided
				$("#images").prepend(giphyDiv);


			}
		}

	})

})






});