//
// For this trivial demo we have just a unique MainController
// for everything
//
app.controller('MainController', function($rootScope, $scope, $cookies){
  console.log('MainController');
  $scope.helpers = {}

  $rootScope.user = $cookies.getObject('user');

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  $scope.helpers.isLoggedIn = function() {
    if($rootScope.user){
      return true;
    }
    else{
      return false;
    }
  }

  $scope.helpers.logout = function() {
    $rootScope.user = false;
    $cookies.remove('user');
  }

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';



});
