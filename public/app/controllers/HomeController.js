angular.module('OwlBeThereApp')
.controller('HomeController', ['$scope', 'yelp', '$anchorScroll', function($scope, yelp, $anchorScroll) {
    $scope.localSearch = function() {
        if ($scope.userLocation) {
            $scope.message = false;
            $scope.currentPage = 1;
            $anchorScroll();
            $scope.loading = true;
            yelp.getLocal($scope.userLocation).success(function(data) {
                $scope.venues = data;
                $scope.totalItems = data.total;
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
    // FIND OUT WHOS GOING
    $scope.going = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // FUNCTION TO ATTEND VENUE FOR LOGGED IN USERS
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
            }
        }
        // TO DO backend
    };
}]);