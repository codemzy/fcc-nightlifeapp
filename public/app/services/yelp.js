angular.module('OwlBeThereApp')
.factory('yelp', ['$http', function($http) {
  // get the local data from Yelp
  this.getLocal = function(location) {
    return $http.get('/api/search/' + location)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  return this;
}]);