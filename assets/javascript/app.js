// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzv_URWmcrqLOFVrSWZoJbcPAhc32AVIw",
    authDomain: "trainscheduling-409bb.firebaseapp.com",
    databaseURL: "https://trainscheduling-409bb.firebaseio.com",
    projectId: "trainscheduling-409bb",
    storageBucket: "trainscheduling-409bb.appspot.com",
    messagingSenderId: "329013823599",
    appId: "1:329013823599:web:0188708bbed4486356259a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();



$("#addTrainButton").click(function (event) {
    event.preventDefault();
    console.log($("#trainNameInput").val().trim())

    const time = $("#startTimeInput").val().trim()
    console.log(time)
    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]

    var name = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var startTime = moment().set('hour', hours).set('minute', minutes).format("hh:mm")
    var frequency = $("#frequencyInput").val().trim();

    console.log(startTime)

    var newTrain = {
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    $("#trainNameInput").val("")
    $("#destinationInput").val("");
    $("#startTimeInput").val("");
    $("#frequencyInput").val("");
});


database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var startTime = snapshot.val().startTime;
    var frequency = snapshot.val().frequency;


                // var startTimePretty = moment.unix(startTime).format("LT");

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (remainder)
    var minutesLeftCalculation = timeDifference % frequency;
    console.log(minutesLeftCalculation);

    // Minute Until Train
    var tMinutesTillTrain = frequency - minutesLeftCalculation;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainPretty = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var markup = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainPretty),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#tableBody").append(markup);
});

