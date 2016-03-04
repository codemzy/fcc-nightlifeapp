angular.module('OwlBeThereApp')
.controller('HomeController', ['$scope', 'yelp', function($scope, yelp) {
    $scope.localSearch = function() {
        if ($scope.userLocation) {
            yelp.getLocal($scope.userLocation).success(function(data) {
                $scope.venues = data;
            });
        }
    };
}]);