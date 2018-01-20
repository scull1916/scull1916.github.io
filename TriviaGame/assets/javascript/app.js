


$(document).ready(function()
{

	var t = 20;
	var timeOut;
	var userPick = "place holder";
	var correctGuess = 0;
	var incorrectGuess = 0;
	var n = 4;
	var nCounter = 0;

//Put questions into an array of objects.
var trivQuests = [
{
	num: 1,
	qText: "Hello. My name is ________. You killed my father. Prepare to die.",
	qAns: ["Fezzik", "Westley", "Buttercup", "Inigo Montoya"],
	cAns: "Inigo Montoya"
},

{
	num: 2,
	qText: "Who said: 'Good night, Westley. Good work. Sleep well, I will most likely kill you in the morning.'",
	qAns: ["Buttercup", "The Dread Pirate Roberts", "Vizzini", "Count Rugen"],
	cAns: "The Dread Pirate Roberts"
},

{
	num: 3,
	qText: "In the epic Battle of Wits between Westley and Vizzini a colorless, odorless, and deadly poison from Australia is used. That poison is:",
	qAns: ["Darestim", "Hebenon", "Iocaine powder", "Janis thorn"],
	cAns: "Iocaine powder"
},

{
	num: 4,
	qText: "The three terrors of the Fire Swamp are:",
	qAns: ["Flame spurts, lightning sand, and R.O.U.S.", "The Cliffs of Insanity, the Brute Squad, and flame spurts", "Vizzini, Prince Humperdinck, and Count Rugen", "Flaming broccoli, lightning sand, and Rodents of Unusual Size"],
	cAns: "Flame spurts, lightning sand, and R.O.U.S."
},

{
	num: 5,
	qText: "According to Miracle Max what's the only thing you can do when someone is all dead as opposed to MOSTLY dead?",
	qAns: ["'Dress them up and take them to the beach'", "'Make a nice MLT - mutton, lettuce, and tomato'", "'Go through his clothes and look for loose change'", "'Get involved in a land war in Asia'"],
	cAns: "'Go through his clothes and look for loose change'"
}

];


//Declare a function to run the question timer
function timer()
{
	t--;
	if (t>0)
	{
		timeOut = setTimeout(timer, 1000);

	}




	$("#timer").text(t);



	
};

setTimeout(timer, 1000);


//Declare a function to clear the timer
function clearTimer()
{
	clearTimeout(timeOut);
}

	clearTimeout();

if (n > 0)

{
	console.log(trivQuests.length);


	function question()
	{
		

		$(".qTxt").empty();
		$(".btn-success").remove();
		

		// n = Math.floor(Math.random() * 4) + 1;
		console.log("n = " + n);
		console.log("nCounter = " + nCounter);

		//Push the question text to the TriviaGame page
		$(".qTxt").text(trivQuests[n].qText);

		//Push the answers to the Trivia game buttons
		for (i=0; i<trivQuests[n].qAns.length; i++)
		{

				//Push an answer to a button
				$("<button></button>").appendTo(".questions").addClass("btn btn-success btn-lg btn-block").attr("value",trivQuests[n].qAns[i]).text(trivQuests[n].qAns[i]);
				console.log(trivQuests[n].qAns[i]);

			}




			$(".btn").on("click", function()
			{

				// clearTimeout(timeOut);
				console.log(this);
				userPick = $(this).val();
				console.log(userPick);
				if (userPick == trivQuests[n].cAns)
				{
					correctGuess++;
					console.log(correctGuess);
					setTimeout(question, 1000);
					t=20;
				
			}
			else
			{
				incorrectGuess++;
				console.log(incorrectGuess);
				setTimeout(question, 1000);
				t=20;
				

			}

			n--;
			$(".correct").text("Correct answers: " + correctGuess)
			$(".incorrect").text("Incorrect answers: " + incorrectGuess);
			
			if (n < 0) {

			$(".endGame").text("You have finished the Princess Bride Trivia Game and YOU are AWESOME!");
			clearTimer();

			}

		});



	};






		
			// setTimeout(question, 2000);
			// question();
			console.log("nCounter = " + nCounter);

			setTimeout(question, 1000*2);



}	




//close document.ready
});

