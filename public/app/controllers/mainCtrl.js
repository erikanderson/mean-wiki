angular.module('mainCtrl', [])
  .controller('mainController', function($rootScope, $location, Auth, User){
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();
      
      Auth.getUser()
        .then(function(data){
          vm.user = data;
        });
    });

    vm.doLogin = function() {
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data){
          $location.path('/user');
          console.log('main controller', data.userId);
        });
    };

    vm.doLogout = function() {
      Auth.logout();
      vm.user = {};
      $location.path('/login');
    };
    
  })