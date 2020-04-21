var app = angular.module("mainApp", [
    '720kb.datepicker'
]);

app.controller("controllerFile",  [
    "$scope", "$window", function($scope, $window) {

    $scope.calenderEvents = [];

   // $scope.var1 = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
    $scope.var1 = '12-07-2013';

    var eventData = localStorage['eventList'];
    if(eventData !== undefined){
        $scope.calenderEvents = JSON.parse(eventData);
    }

    $scope.init = function () {
        // triggers at the initialization of the application
        $scope.calenderEvents = [];

        // $scope.var1 = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
        $scope.var1 = '12-07-2013';

        var eventData = localStorage['eventList'];
        if(eventData !== undefined){
            $scope.calenderEvents = JSON.parse(eventData);
        }

        //Expire the event if it is OverDue
        console.log("Expire Events function() triggered....");
        $scope.expireEvents();

        //Arrange all the events sorted by the date in ascending order
        $scope.laSortedArr = $scope.sortedArray().reverse();

    };

    $scope.addEventByButton = function () {
        /*console.log("Event Name from form : ", $scope.eventName);
        console.log("Date output from form : ", $scope.date);
        console.log("Type of Date output from form : ", typeof $scope.date);
        console.log("Time output from form : ", $scope.var1);
        console.log("Type of Time output from form : ", typeof $scope.var1);*/

        if ($scope.eventName == '' || $scope.eventName === undefined){
            $scope.alertPopup("Warning : Please enter the Event Name in order to add the Event !");
        }

        if( $scope.date === '' ||  $scope.date === undefined){
            //console.log("undefined or empty date : ", $scope.eventDate);
            $scope.alertPopup("Warning : Please enter the Event Date in order to add the Event !");
        }


        if ($scope.eventName !== "" && $scope.eventName !== undefined && $scope.date !=='' && $scope.date !== undefined) {
            if($scope.var1 == '' || $scope.var1 === undefined || $scope.var1 === '12-07-2013'){
                $scope.calenderEvents.push(
                    {
                        eventName: $scope.eventName,
                        eventDate: $scope.date,
                        eventTime : "All Day"
                    }
                );
                $scope.alertPopup("Event added successfully !");
            }else{
                $scope.calenderEvents.push(
                    {
                        eventName: $scope.eventName,
                        eventDate: $scope.date,
                        eventTime : $scope.readTime()
                    }
                );
                $scope.alertPopup("Event added successfully !");
            }
        }
        $scope.eventName = '';
        $scope.date = '';
        localStorage['eventList'] = JSON.stringify($scope.calenderEvents);
        $scope.expireEvents();
        console.log($scope.calenderEvents);
    }
    $scope.addEventByEnter = function () {
        if (event.which == 13 || event.keyCode == 13) {
            if ($scope.eventName !== "" && $scope.eventName !== undefined) {
                $scope.calenderEvents.push([
                    {
                        eventName: $scope.eventName,
                        eventDate: $scope.date,
                        eventTime : $scope.readTime()
                    }
                ]);
            }
            $scope.eventName = '';
            $scope.date = '';
        }
        localStorage['eventList'] = JSON.stringify($scope.calenderEvents);
        $scope.expireEvents();
        console.log($scope.calenderEvents);
    }

    /*$scope.viewDate = function () {
        console.log(15);
        var datevalue = $scope.date;
        var newdatevalue = String(datevalue);
        console.log(newdatevalue);
    }*/

    $scope.readTime = function(){
        var extractedTime = $scope.var1;
        var milisec = extractedTime.getTime();
        var actTime = $scope.msToTime(milisec);
        return actTime;

    }

    $scope.msToTime = function (duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes;
    }

    $scope.dateFunc = function () {
        //console.log("dateFunc executed...!!!");
        var dateValueReturned = $scope.dateValue;

        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        //console.log($scope.dateValue);
        //console.log("Type of date returned : ", typeof dateValueReturned);

        var forMDate = new Date(dateValueReturned);
        //console.log("Final Date String - forMDate : ", forMDate.toDateString());

        $scope.formattedDate = forMDate.toDateString();
        //console.log("Final Formatted Date: ", $scope.formattedDate  );

        /*let formatted_date = (dateValueReturned.getDate()) + "-" +  (months[dateValueReturned.getMonth()]) + "-" + (dateValueReturned.getFullYear());
        console.log(formatted_date);*/


        //console.log("newtoDate", $scope.DateConvert(dateValueReturned));
        //console.log("newtoDate", typeof $scope.DateConvert(dateValueReturned));

        $scope.filterDate = $scope.DateConvert(dateValueReturned);
        if($scope.filterDate == "undefined--undefined"){
            $scope.filterDate = '';
        }
    }

    $scope.DateConvert = function(dateString){

        //format  dd-MM-yyyy
        const [month, day, year] = dateString.split("-")
        return (day + "-" + month + "-" + year);
    }

    $scope.deleteEvent = function(index){
        //console.log($scope.calenderEvents[index]);
        //$scope.calenderEvents.splice(index, 1);
        //console.log($scope.calenderEvents);

        $scope.calenderEvents.splice(index, 1);
        localStorage['eventList'] = JSON.stringify($scope.calenderEvents);
        console.log("calenderEvents Array", $scope.calenderEvents);
        console.log("Local Storage", localStorage);
        $scope.expireEvents();

    }

    $scope.updateEvent = function(index){
        //console.log($scope.calenderEvents[index]);
        //$scope.calenderEvents.splice(index, 1);
        //console.log($scope.calenderEvents);

        console.log("Event update triggered...!");
        $scope.alertPopup("Edit the Event on the above section - Add Event");

        const curElemEventName = $scope.calenderEvents[index].eventName;
        const curElemEventDate = $scope.calenderEvents[index].eventDate;
        const curElemEventTime = $scope.calenderEvents[index].eventTime;

        $scope.eventName = curElemEventName;
        $scope.date = curElemEventDate;
        //$scope.var1 = curElemEventTime;

        $scope.calenderEvents.splice(index, 1);
        localStorage['eventList'] = JSON.stringify($scope.calenderEvents);
        $scope.expireEvents();
        console.log($scope.calenderEvents);
    }

    $scope.alertPopup = function(alertMessage){
        $window.alert(alertMessage);
    }


    $scope.DateConvertUSAformat = function(dateString){

        //return date format:  MM-dd-yyyy
        const [ day, month, year] = dateString.split("-");
        return (month + "-" + day + "-" + year);
    }


    $scope.expireEvents = function () {
        //console.log("Expire events triggered...!");
        var currDateTime = new Date();
        var currDateTimeMili = currDateTime.getTime();
        //console.log("currentTime in Miliseconds : ", currDateTimeMili);
        $scope.calenderEvents.forEach(function (eachEvent, indexEvent) {
            console.log(eachEvent.eventDate);
            var eachEventDate = new Date($scope.DateConvertUSAformat(eachEvent.eventDate));
            console.log("Each event date", eachEventDate);
            var eachEventDateMili = eachEventDate.getTime();
            console.log("Event date in Milliseconds : ", eachEventDateMili);
            if(eachEventDateMili < currDateTimeMili){
                $scope.calenderEvents.splice(indexEvent, 1);
            }
        });
        localStorage['eventList'] = JSON.stringify($scope.calenderEvents);
        //console.log($scope.calenderEvents);
    }

    $scope.sortedArray = function(){
    /*
        array.sort(function(a, b) {
            a = new Date(a.dateModified);
            b = new Date(b.dateModified);
            return a>b ? -1 : a<b ? 1 : 0;
        });
    */
        //console.log("sortedArray function execution ...");
        var allEvents = $scope.calenderEvents;

  /*     console.log(new Date($scope.DateConvertUSAformat(allEvents[0].eventDate)));
        console.log(typeof $scope.DateConvertUSAformat(allEvents[1].eventDate));
        console.log($scope.DateConvertUSAformat(allEvents[2].eventDate));
        console.log($scope.DateConvertUSAformat(allEvents[3].eventDate));*/

        const finalSortedByDateArr = allEvents.slice().sort(function(a, b) {
            a = new Date($scope.DateConvertUSAformat(a.eventDate)).getTime();
            b = new Date($scope.DateConvertUSAformat(b.eventDate)).getTime();
            return a>b ? -1 : a<b ? 1 : 0;
        });
        //console.log("Final Sorted Array by Date : ", finalSortedByDateArr.reverse());

        //return finalSortedByDateArr;
        var curDate = new Date();
        finalSortedByDateArr.forEach(function (eventElem) {
            var daysRemMili = new Date($scope.DateConvertUSAformat(eventElem.eventDate)).getTime() - curDate.getTime();
            var dayCount = daysRemMili / (60 * 60 * 24 * 1000);
            eventElem.daysRem = Math.ceil(dayCount);
        });

        //console.log(finalSortedByDateArr);
        return  finalSortedByDateArr;

    }

}]);

app.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                language: 'en',
                pickDate: false,
            }).on('changeDate', function(e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});
