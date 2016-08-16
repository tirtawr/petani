app.controller('ConfirmOfferController', function($rootScope, $scope, $state, $stateParams, $cookies, $http){
  console.log('ConfirmOfferController');


  console.log($stateParams.id);

  initController()


  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      $scope.offerForm = res.data.data[$stateParams.id]
    });
  }

  $scope.submitForm = function() {
    if (confirm('Selamat! Penjualan anda telah terkonfirmasi!')) {
      var reqObj = {
        buyer: $scope.offerForm.buyer,
        seller: $scope.offerForm.seller,
        image_url: $scope.offerForm.image_url,
        description: $scope.offerForm.description,
        weight: $scope.offerForm.weight,
        price: $scope.offerForm.price,
        category: $scope.offerForm.category,
        title: $scope.offerForm.title,
        is_valid: 2
      }
      $http.put('/api/offer/'+$stateParams.id, reqObj).then(function(res) {
        console.log(res);
        $state.go('home')
      });
    } else {

    }
  }
});
