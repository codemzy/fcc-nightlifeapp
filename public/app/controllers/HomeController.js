angular.module('OwlBeThereApp')
.controller('HomeController', ['$scope', 'yelp', '$anchorScroll', function($scope, yelp, $anchorScroll) {
    $scope.localSearch = function() {
        if ($scope.userLocation) {
            $scope.currentPage = 1;
            $anchorScroll();
            $scope.loading = true;
            yelp.getLocal($scope.userLocation).success(function(data) {
                $scope.venues = data;
                $scope.totalItems = data.total;
                $scope.loading = false;
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
}]);