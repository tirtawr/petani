app.controller('LoginController', function($rootScope, $scope, $state, $cookies, $http){
  console.log('LoginController');
  $scope.loginForm = {
    username: '',
    password: '',
    role: 'BUYER'
  }

  $scope.login = function() {
    var reqBody = {
      username: $scope.loginForm.username,
      password: $scope.loginForm.password,
      role: $scope.loginForm.role
    };
    $http.get('/api/'+$scope.loginForm.role).then(function(res) {
      console.log(res);
      var user = _.find(res.data.data, function(obj){ return obj.username == $scope.loginForm.username; });
      if (user) {
        console.log(user);
				user.role = $scope.loginForm.role;
				$rootScope.user = user;
        $cookies.putObject('user', user);
        $state.go('home');

      }
      else {
        alert('Login Gagal!')
      }
    });

  };

});
