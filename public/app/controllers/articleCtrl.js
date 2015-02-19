angular.module('articleCtrl', ['articleService'])

  .controller('articleController', function($scope, Article){
    var vm = this;

    vm.getAll = function(){
      Article.all()
        .success(function(data){
          console.log(data);
          vm.articles = data;
        })
    }

    vm.getAll();
  })