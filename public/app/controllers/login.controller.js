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
    };
    $http.get('/api/user').then(function(res) {
      console.log(res);
      var user = _.find(res.data.data, function(obj){
        if (obj.username == $scope.loginForm.username) {
          if (obj.password == $scope.loginForm.password) {
            return true;
          }
          else {
            alert('Password anda salah');
            return false;
          }
        }
        else {
          return false;
        }
      });
      if (user) {
        console.log(user);
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
