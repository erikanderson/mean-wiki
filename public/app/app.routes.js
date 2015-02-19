angular.module('app.routes', ['ngRoute'])

  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'app/views/home.html'
      })

      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'mainController',
        controllerAs: 'login'
      })

      .when('/user', {
        templateUrl: 'app/views/user.html'
      })

      .when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'userCreateController',
        controllerAs: 'register'
      })

      .when('/articles', {
        templateUrl: 'app/views/articles.html',
        controller: 'articleController',
        controllerAs: 'article',
      })

      .when('/articles/new', {
        templateUrl: 'app/views/newArticle.html',
        controller: 'articleController',
        controllerAs: 'article'
      })


  })