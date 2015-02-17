var app = angular.module('mean-wiki');

app.directive('navbar', function(){
  return {
    templateUrl: 'app/shared/nav/nav.html'
  }
})