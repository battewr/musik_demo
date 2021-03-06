﻿(function () {
    window.musikIntegration = new Object();
    thisRef = musikIntegration;

    thisRef.Startup = function (connectionPromise, postureRatingPromise, localOnTick) {
        console.log("starting musik api...");
        muzik.startServer();

        thisRef.calibrated = false;
        thisRef.lastOrientation = {};
        thisRef.calibratedValues = {};

        thisRef.connectionPromise = connectionPromise;
        thisRef.postureRatingPromise = postureRatingPromise;
        thisRef.onTick = localOnTick;

        muzik.registerForConnectionState(thisRef.onStateChanged);

        muzik.registerForAccelerometerDataStream(thisRef.accelerometerTick);
    }

    thisRef.Resume = function (connectionPromise, postureRatingPromise) {
        console.log("resuming musik api...");

        thisRef.calibrated = false;
        thisRef.lastOrientation = {};
        thisRef.calibratedValues = {};

        thisRef.connectionPromise = connectionPromise;
        thisRef.postureRatingPromise = postureRatingPromise;

        muzik.registerForConnectionState(thisRef.onStateChanged);

        muzik.registerForAccelerometerDataStream(thisRef.accelerometerTick);
    }

    thisRef.takeCalibrationTick = function () {
        thisRef.calibratedValues.forwardAngle = thisRef.lastOrientation.forwardAngle;
        thisRef.calibratedValues.sideAngle = thisRef.lastOrientation.sideAngle;

        thisRef.calibrated = true;
    }

    var tick = 0;
    thisRef.accelerometerTick = function (x, y, z, norm, forwardAngle, sideAngle) {
        thisRef.lastOrientation.forwardAngle = forwardAngle;
        thisRef.lastOrientation.sideAngle = sideAngle;

        tick = tick + 1;
        thisRef.onTick(tick);

        if (thisRef.calibrated) {
            thisRef.howBadIsMyPosture(forwardAngle, sideAngle);
        }
    }

    thisRef.onStateChanged = function (state) {
        if (state == muzik.CONNECTION_STATE.CONNECTED) {
            console.log('enabled api access');
            thisRef.connectionPromise(true);
        }
        else if (state == muzik.CONNECTION_STATE.HEADPHONES_NOT_CONNECTED) {
            console.log('disabled api access');
            thisRef.connectionPromise(false);
        }
    }

    thisRef.howBadIsMyPosture = function (forwardAngle, sideAngle) {
        var deltaSide = Math.abs(thisRef.calibratedValues.sideAngle - sideAngle);
        var deltaForward = Math.abs(thisRef.calibratedValues.forwardAngle - forwardAngle);

        deltaSide -= 1;
        if (deltaSide < 0) { deltaSide = 0; }

        deltaForward -= 4;
        if (deltaForward < 0) { deltaForward = 0; }

        thisRef.postureRatingPromise(100 - (deltaSide + deltaForward));
    }
}());