angular.module('OwlBeThereApp')
.controller('HomeController', ['$scope', 'yelp', 'attend', '$anchorScroll', function($scope, yelp, attend, $anchorScroll) {
    // FIND OUT WHOS GOING
    console.log("controller loading");
    $scope.going = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    $scope.userGoing = [];
    // GET IDS WHERE THE USER IS GOING ON PAGE LOAD 
    // TO DO
    // SEARCH FOR VENUES BASED ON LOCATION
    $scope.localSearch = function() {
        if ($scope.userLocation) {
            $scope.message = false;
            $scope.currentPage = 1;
            $anchorScroll();
            $scope.loading = true;
            yelp.getLocal($scope.userLocation).success(function(data) {
                $scope.venues = data;
                $scope.totalItems = data.total;
                // GET NUMBERS
                
                
                $scope.loading = false;
            }).error(function(error) {
                $scope.loading = false;
                $scope.message = "There was no data found for this location.";
            });
        }
        $scope.secondPage = function() {
            $scope.currentPage = 2;
            $anchorScroll();
            $scope.loading = true;
            yelp.getOffset($scope.userLocation, 20).success(function(data) {
                $scope.venues = data;
                $scope.loading = false;
            });
        };
    };
    // FUNCTIONS TO ATTEND VENUE FOR LOGGED IN USERS
    $scope.attendRequest = function(id) {
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].request = true;
            }
        }
    };
    $scope.attendCancel = function(id) {
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].request = false;
            }
        }
    };
    $scope.attendConfirm = function(id) {
        // front end
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].request = false;
                $scope.going[i]++;
                $scope.userGoing.push(id);
            }
        }
        // backend
        attend.attendVenue(id);
    };
    // FUNCTIONS TO REMOVE ATTENDING FOR LOGGED IN USERS
    $scope.removeRequest = function(id) {
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].remove = true;
            }
        }
    };
    $scope.removeCancel = function(id) {
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].remove = false;
            }
        }
    };
    $scope.removeConfirm = function(id) {
        // front end
        for (var i = 0; i < $scope.venues.businesses.length; i++) {
            if ($scope.venues.businesses[i].id == id) {
                $scope.venues.businesses[i].remove = false;
                $scope.going[i]--;
                for(var j = $scope.userGoing.length - 1; j >= 0; j--) {
                    if($scope.userGoing[j] === id) {
                       $scope.userGoing.splice(j, 1);
                    }
                }
            }
        }
        // TO DO backend
    };
    // CHECK IF USER GOING 
    $scope.checkGoing = function(id) {
        for (var i = 0; i < $scope.userGoing.length; i++) {
          if ($scope.userGoing[i] == id) {
            return true;
          }
        }
        return false;
    };
}]);