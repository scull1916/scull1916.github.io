$(document).ready(function()
{

//Declare variables


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCG8y5UZNbUynL0lvV50GLFJJ41t0UDgWA",
    authDomain: "trainschedule-71276.firebaseapp.com",
    databaseURL: "https://trainschedule-71276.firebaseio.com",
    projectId: "trainschedule-71276",
    storageBucket: "trainschedule-71276.appspot.com",
    messagingSenderId: "105596656887"
  };

  firebase.initializeApp(config);

  //Variable to reference the database
  var database = firebase.database();


//Build functions

$("#addTrain").on("click", function(event)
{
	event.preventDefault();

	//Grab input values entered into the form
	var trainName = $("#TrainName").val().trim();
	var destination = $("#Destination").val().trim();

	//Formats user input with moment.js
	var firstTrain = moment($("#FirstTrain").val().trim(), "hh:mm").format();
	var frequency = $("#Frequency").val().trim();
	
	//Create a local object to hold train data
	newTrain = 
	{
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency

		
	};

	


	//Push data into Firebase project
	database.ref().push(newTrain);
	

	//Log content to the console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);


	//Clear the entry form text boxes
	$("#TrainName").val("");
	$("#Destination").val("");
	$("#FirstTrain").val("");
	$("#Frequency").val("");

	return false;
})

	//Create a Firebase event to add train to the database and a new row to the HTML to display:
	//this essentially pulls the data living in the Firebase project into the app so that it can
	//be added to the UI
	database.ref().on("child_added", function(childsnapshot, prevChildKey)
	{
		console.log(childsnapshot.val());

		//Store data into variables
		var addedTrain = childsnapshot.val().name;
		var destined = childsnapshot.val().destination;
		var trainOne = childsnapshot.val().firstTrain;
		var freQ = childsnapshot.val().frequency;


		console.log(addedTrain);
		console.log(destined);
		console.log(trainOne);
		console.log(freQ);


		//Push the time of the first train back one year to ensure it is a time prior to current time
		var firstTrainConverted = moment(trainOne, "hh:mm").subtract(1, "years");

		//Assign current time to a variable
		var currentTime = moment();

		//Calculate the difference in timees
		var diffTime = moment().diff(moment(firstTrainConverted), "minutes"); 

		
		//Calculate the time apart
		var tRemainder = diffTime % freQ;

		//Minutes until the next train
		var minutesRemain = freQ - tRemainder;
		console.log(minutesRemain);

		//Next train
		var nextTrain = moment().add(minutesRemain, "minutes");






		//Add train schedule information into HTML
		$("#trainSchedule > tbody").append("<tr><td>" + addedTrain 
			+ "</td><td>" + destined + "</td><td>" + freQ + "</td><td>" + nextTrain.format("hh:mm") 
			+ "</td><td>" + minutesRemain + "</td></tr>");
		

	});
















	//end of document.ready
})