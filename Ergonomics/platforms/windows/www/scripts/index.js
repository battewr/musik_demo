// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var element = document.getElementById("deviceready");
        element.innerHTML = 'Device Ready';
        element.className += ' ready';

        document.getElementById('calibrateAction').addEventListener('click', onCalibrate, false);

        console.log("testing...")
        musikIntegration.Startup(connectionState, postureRating);
        setupGraph();
    };

    function setupGraph() {
        var data = {
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [
                {
                    label: "History",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };

        var ctx = $("#historicalGraph").get(0).getContext("2d");
        var myNewLineChart = new Chart(ctx).Line(data, { animationSteps: 15 });
        window._historyGraphOfErgonomics = myNewLineChart;
    }

    function connectionState(newState) {
        if (!newState) {
            $('#calibreateAction').prop('disabled', true);
            $('#deviceState').html("Offline");
        } else {
            $('#calibrateAction').prop('disabled', false);
            $('#deviceState').html("Online");
        }
    }

    var timepassed = 0;
    var initialized = false;
    function postureRating(rating) {
        $('#postureRating').text("At: " + rating);

        //if (Math.floor((new Date() - timepassed) / 5000) > 1) {
        //    timepassed = new Date();
        //    rating = rating.toFixed(2);

        //    _historyGraphOfErgonomics.addData(rating);
        //    _historyGraphOfErgonomics.removeData();
        //}
    }


    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        musikIntegration.Startup(connectionState, postureRating);
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onCalibrate() {
        musikIntegration.takeCalibrationTick();
    }
} )();