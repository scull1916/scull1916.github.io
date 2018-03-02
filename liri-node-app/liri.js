require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set API requests to individual variables
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//set variable to access twitter keys to pass to the API
var client = new Twitter(keyList.twitter);

//set variable to access spotify keys to pass to the API
var spotify = new Spotify(keyList.spotify);

//node liri.js movie-this ...will pull in movie data from OMDB
var omdbReq = "http://www.omdbapi.com/?apikey=trilogy&";

//set a variable to accept a command to be given to LIRI
var liriCmd = process.argv[2];

//set a variable to accept a song or movie title -- set as a separate variable in the event a user does not
//enter a title value, the app will still run.
var title = process.argv[3];

//node liri.js my-tweets :: batch last 20 tweets, when each tweet was created, display in bash
function myTweets()
{
	
	//send request to Twitter API
	client.get("https://api.twitter.com/1.1/search/tweets.json?count=40&screen_name=wodewoseyew", {q: 'wodewoseyew'}, function(error, tweets, response)
	{

		if(error) throw error;
		{
			var empty = "";
			//display the twitter object body
			var twitOut = JSON.stringify(tweets,null,2);

			console.log(
						"********************************************** MY-TWEETS **********************************************\n");


			JSON.parse(twitOut).statuses.forEach(function(status){
				console.log("Created: \n", status.created_at);
				console.log("Tweets: \n", status.text, "\n");
			});


		}



	});
}

function spotifyThisSong()
{
	if (title == null)
	{
			//send the request to the Spotify API
			spotify.search(
			{
				type: "track",
				query: "The Sign" && "Ace of Base",
				limit: 1
			}, function(err, data)
			{

			
					if (err)
				{

					return console.log("Error: " + err);
				}

					console.log(
						"********************************************** SPOTIFY-THIS-SONG **********************************************\n");
					console.log("Artist: ", data.tracks.items[0].artists[0].name, "\n");
					console.log("Song: ", data.tracks.items[0].name, "\n");
					console.log("Preview: ", data.tracks.items[0].preview_url, "\n");
					console.log("Album: ", data.tracks.items[0].album.name);
			});
	}
	
	else
	{
		//send the request to the Spotify API
		spotify.search(
		{
			type: "track",
			query: title,
			limit: 1
		}, function(err, data)
			{

			
					if (err)
				{

					return console.log("Error: " + err);
				}


					console.log(
						"********************************************** SPOTIFY-THIS-SONG **********************************************\n");
					console.log("Artist: ", data.tracks.items[0].artists[0].name, "\n");
					console.log("Song: ", data.tracks.items[0].name, "\n");
					console.log("Preview: ", data.tracks.items[0].preview_url, "\n");
					console.log("Album: ", data.tracks.items[0].album.name);
					
				
			});
			


		
	}
}
	

//request data from OMDB API using the npm Request package
function movieThis()
{
	//If the user does not enter a movie title, the utility will default to a search for the movie Mr. Nobody"
	if (title == null)
	{
		request("http://www.omdbapi.com/?apikey=" + process.env.apikey + "&t=Mr. Nobody", function (error, response, body)
		{



			var movieParser = JSON.parse(body);
			console.log(
						"********************************************** MOVIE-THIS **********************************************\n");

			//ouput data from api object
			console.log("Title: ", movieParser.Title);
			console.log("Year: ", movieParser.Year);
			console.log("IMDB Rating: ", movieParser.imdbRating);
			console.log("Rotten Tomatoes Rating: ", movieParser.Ratings[2]);
			console.log("Country: ", movieParser.Country);
			console.log("Language: ", movieParser.Language);
			console.log("Plot: ", movieParser.Plot);
			console.log("Actors: ", movieParser.Actors);
		});

	}
	else
	{

		console.log(
						"********************************************** MOVIE-THIS **********************************************\n");

		request("http://www.omdbapi.com/?apikey=" + process.env.apikey + "&t=" + title, function (error, response, body)
		{

			// console.log("error: ", error);
			// console.log("status code: ", response && response.statusCode);

			var movieParser = JSON.parse(body);

			//ouput data from api object
			console.log("Title: ", movieParser.Title);
			console.log("Year: ", movieParser.Year);
			console.log("IMDB Rating: ", movieParser.imdbRating);
			console.log("Rotten Tomatoes Rating: ", movieParser.Ratings[2]);
			console.log("Country: ", movieParser.Country);
			console.log("Language: ", movieParser.Language);
			console.log("Plot: ", movieParser.Plot);
			console.log("Actors: ", movieParser.Actors);
		});
	}
}

function doWhatItSays()
{

	//call the random text file containing the instruction(s) for this fx
	fs.open("random.txt", "r", (err,fd) =>
	{
		if (err) throw err;

		fs.fstat(fd, (err, stat) =>
		{
			if (err) throw (err);
			

			fs.close(fd, (err) =>
			{
				
			});

		});

	});

	//use fs.readFile to read the contents of the random.txt file - to run node liri?
	fs.readFile("random.txt", "utf-8", (err, data) =>
	{
		if (err) throw err;
		// console.log("err: ", err);

		//parse the contents of the random.txt file into line command arguments
		var splitDat = data.split(",");

		spotifyThisSong(splitDat[0], splitDat[1]);

	});
		

}

//LIRI Commands

switch (liriCmd)
{
	case "do-what-it-says":
		doWhatItSays();
		break;

	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong();
		break;

	case "movie-this":
		movieThis();
		break;

}







