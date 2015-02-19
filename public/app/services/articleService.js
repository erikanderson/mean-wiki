angular.module('articleService', [])

  .factory('Article', function($http){

    var articleFactory = {};

    articleFactory.all = function() {
      console.log('in article factory');
      return $http.get('/api/articles/');
    }

    return articleFactory;
  })