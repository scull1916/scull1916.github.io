//config to access the firebase database
var config = 
{
   apiKey: "AIzaSyDekEZ_-RUohQZDqs6tTUfTSCB2diAagbc",
   authDomain: "groupproject1-c302e.firebaseapp.com",
   databaseURL: "https://groupproject1-c302e.firebaseio.com",
   projectId: "groupproject1-c302e",
   storageBucket: "groupproject1-c302e.appspot.com",
   messagingSenderId: "771881119505"
};

//Initializes firebase based on the values supplied by 'config'
firebase.initializeApp(config);

//Initializes firebase by saving the value to a variable
var database = firebase.database();

//Function that dictates what happens when the submit button is clicked
$("#submit").on("click", function(event)
{
    event.preventDefault();
    //Variables for the search parameters, values are derived from user input
    var name = $("#nameInput").val().trim();
    var month = $("#monthInput option:selected").val().trim();
    var day = $("#dayInput option:selected").val().trim();

    //Console logs for testing
    console.log(name);
    console.log(month);
    console.log(day);

    //Database information push, pushes values of user input to the database
    database.ref().push(
    {
        name: name,
        month: month,
        day: day,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $('#dropDown').append($('<option>', 
    {
        value: 1,
        text: name + "," + month + "," + day
    }));
});


//Gets snapshot of the information present in the database upon program start
database.ref().on("child_added", function(childSnapshot)
{
   // console.log(childSnapshot);

},function(errorObject)
{
    console.log("The read failed: " + errorObject.code);
});