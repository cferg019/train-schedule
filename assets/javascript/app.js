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

$(document).ready(function () {
    $("#addTrainButton").click(function (event) {
        event.preventDefault();
        console.log($("#startDateInput").val().trim())
        var name = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var startTime = moment($("#startTimeInput").val().trim()).format("X");
        var frequency = $("#frequencyInput").val().trim();



        $("#trainNameInput").val("")
        $("#destinationInput").val("");
        $("#startTimeInput").val("");
        $("#frequencyInput").val("");

        database.ref().push({
            name: name,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        });

    });


    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());

        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var startTime = snapshot.val().startTime;
        var frequency = snapshot.val().frequency;

        // use template strings to efficiently build your new row
        var markup = `
            <tr>
                <td>${name}</td>
                <td>${destination}</td>
                <td>${frequency}</td>
                <td>${startTime}</td>
                <td></td>
            </tr>
            `
        $("#tableBody").append(markup);
    });

});