angular.module('mean-wiki', [
  'app.routes', 
  'authService', 
  'mainCtrl', 
  'userService', 
  'userCtrl', 
  'articleCtrl',
  'articleService'
])

// application configuration to integrate token into requests
.config(function($httpProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});
