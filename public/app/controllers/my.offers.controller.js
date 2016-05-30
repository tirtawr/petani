app.controller('MyOffersController', function($rootScope, $scope, $state, $cookies, $http, cloudinary){
  console.log('MyOffersController');
  initController();

  $scope.myOffers = [];

  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      $scope.myOffers = _.values(_.filter(res.data.data, function(o){return o.seller == $rootScope.user.username}));
      }
    );
  }





});
