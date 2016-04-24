//(function () {

//    window.ergonomicsHistory = new Object();
//    thisRef = ergonomicsHistory;

//    thisRef.initialize = function () {
//        thisRef._history = [];
//    }

//    thisRef.append = function (newValue) {
//        if (thisRef._history.length > 10) {
//            thisRef._history = thisRef._history.slice(1, thisRef._history.length);
//        }

//        thisRef._history.push(newValue);
//    }

//    thisRef.currentArray = function () {
//        return thisRef._history;
//    }
//}());