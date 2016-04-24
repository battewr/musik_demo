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

        //console.log("testing...")
        musikIntegration.Startup(connectionState, postureRating, onTick);

        setupGraph(true);
    };


    function setupGraph(init) {

        if (init) {
            for (var i = 0; i < 10; i++) {
                ergonomicsHistory.append(0);
            }
        }

        $('#container').highcharts({
            title: {
                text: 'Average Ergonomics',
                x: -20 //center
            },
            xAxis: {
                categories: ['', '', '', '', '', '',
                    '', '', '', '', '', '']
            },
            yAxis: {
                title: {
                    text: 'Ergonomic Rating'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '',
                data: ergonomicsHistory.currentArray()
            }]
        });
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
    var sum = 0;
    var cnt = 0;
    function postureRating(rating) {
        $('#postureRating').text("At: " + rating.toFixed(2));

        if (isNaN(sum)) {
            sum = rating;
            cnt = 1;
        }
        sum += rating;
        cnt += 1;

        var avg = (sum / cnt).toFixed(2);
        $('#averageScore').text("At: " + avg);

        timepassed += 1;
        if (timepassed > 50) {
            timepassed = 0;
            ergonomicsHistory.append(rating);
            setupGraph(false);
        }
    }


    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    var resumeCount = 0;
    function onResume() {
        //window.alert('resuming.. ');

        // musikIntegration.Startup(connectionState, postureRating);
        //musikIntegration.Resume(connectionState, postureRating);
        //resumeCount = resumeCount + 1;
        //$('#resumeCount').text(' ' + resumeCount);
        
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onTick(tickNumber) {
        $('#tickCount').text(' ' + tickNumber);
    }

    function onCalibrate() {
        musikIntegration.takeCalibrationTick();
    }
} )();