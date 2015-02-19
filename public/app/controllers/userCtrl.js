angular.module('userCtrl', ['userService'])

  .controller('userController', function(User){
    var vm = this;

    vm.deleteUser = function(id){
      User.delete(id)
        .sucess(function(data){
          console.log(data);
        })
    }
  })

  .controller('userCreateController', function(User){
    var vm = this;
    vm.type = 'create';

    vm.doRegister = function(){
      User.create(vm.registerData.username, vm.registerData.password)
        .success(function(data){
          console.log(data);
          vm.userData = {};
          vm.message = data.message;
        })
    }
  })