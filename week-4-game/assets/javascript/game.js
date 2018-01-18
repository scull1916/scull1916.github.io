// CrystalsCollector Game, Week 4 Game


$(document).ready(function() {

// Declare global variables here
var wins = 0;
var loses = 0;
var guesses = 0;
var targetNumber = 0;
var counter = 0;

// define a function to generate a target number between 19 and 120, inclusive

	// generate the random number
	targetNumber = Math.floor(Math.random() * 102) + 19;

	// convert the target number to a string and place in the #target div
	$("#target").text(targetNumber);

	// print the target out to the console for testing/debugging
	console.log("targetNumber @ gen " + targetNumber);



//Create an array to hold the crystal file locations

var images = [
	'../week-4-game/assets/images/amethyst.png', 
	'../week-4-game/assets/images/emerald.png', 
	'../week-4-game/assets/images/ruby.jpg', 
	'../week-4-game/assets/images/sapphire.png'
	];


var crystalValue = [0,0,0,0];



//generate random numbers to assign to each crystal

	for (var i = 0; i < crystalValue.length; i++)
	{

		crystalValue[i] = Math.floor(Math.random() * 12) + 1;


		console.log(crystalValue[i]);
	}

	//*Pseudocode for generating unique values:
	// 1) Generate a random number between 1 and 12;
	// 2) Assign the value to a variable, e.g. temp, to hold the value for comparison;
	// 3) Cycle through the crystalValue array to compare the number to the temp variable;
	// 4) If the value does not match any of the elements in the array then assign to 
	//    cyrstalValue @ the current loop iteration.
	//*end

	//*Pseudocode reset function
	// 1) Run a function which generates a new random target number (attempted unsuccessfully, not coded here)
	// 2) Run a function which generates a new set of random crystal values (ibid)
	// 3) reinitialize the counter
	//*end

// Dynamically load images onto the page, assign the random values generated to each image, 
// then append the image to the page.

for (var i = 0; i < crystalValue.length; i++)
{
	// Create a variable and assign its value to the creation of an HTML img element using jQuery
	var imageCrystal = $("<img>");

	// Use jQuery to add the 'crystal-image' class to the img element created, above
	imageCrystal.addClass("crystal-image");

	// Use the jQuery attr() method to grab the image, the source is the images array containing
	// the directory paths leading to the image files
	imageCrystal.attr("src", images[i]);

	// Use the jQuery attr() method again to assign the randomly generated value to each crystal image
	imageCrystal.attr("data-crystalvalue",crystalValue[i]);

	// Use jQuery method to add the crystal image and its new classes/attributes to the <div> with the id, "gems"
	$("#gems").append(imageCrystal);

}



$(".crystal-image").on("click", function()
{
	var gemValue = $(this).attr("data-crystalvalue");

	gemValue = parseInt(gemValue);

	counter += gemValue;

	console.log(targetNumber);
	// alert("New score: " + counter);

	$("#clickScore").text(counter);
	
	if (counter === targetNumber)
	{
		wins++;
		alert("You win!");
		//*Pseudocode: run reset function
	} 

	else if (counter > targetNumber)
	{
		loses++;
		alert("You lose!");
		//*Pseudocode: run reset function

	}
	else
	{
		guesses++;
		
	}


	$("#wins").text(wins);
	$("#loses").text(loses);



});





});