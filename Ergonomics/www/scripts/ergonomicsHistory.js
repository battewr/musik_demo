(function () {

    window.ergonomicsHistory = new Object();
    ergRef = ergonomicsHistory;
    ergRef.history = new Array();

    ergRef.append = function (newValue) {
        if (ergRef.history.length > 10) {
            ergRef.history = ergRef.history.slice(1, ergRef.history.length);
        }

        ergRef.history.push(newValue);
    }

    ergRef.currentArray = function () {
        return ergRef.history;
    }
}());