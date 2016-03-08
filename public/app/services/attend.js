angular.module('OwlBeThereApp')
.factory('attend', ['$http', function($http) {
  // get the local data from Yelp
  this.attendVenue = function(id) {
    return $http.get('/api/user/attend/' + id)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  return this;
}]);