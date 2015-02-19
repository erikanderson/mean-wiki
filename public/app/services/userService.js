angular.module('userService', [])

  .factory('User', function($http){
    var userFactory = {};

    userFactory.get = function(id){
      return $http.get('/api/users/' + id);
    };

    userFactory.all = function(){
      return $http.get('/api/users/');
    };

    userFactory.create = function(username, password){
      return $http({
        method: 'POST',
        url: '/api/users/',
        data: {username: username, password: password}
      })
    };

    userFactory.update = function(id, userData){
      return $http.put('/api/users/' + id, userData);
    };

    userFactory.delete = function(id){
      return $http.delete('/api/users/' + id);
    };

  return userFactory;

})