app.controller('OfferFormController', function($rootScope, $scope, $state, $cookies, $http, cloudinary){
  console.log('OfferFormController');
  $scope.offerForm = {
    seller: '',
    image_url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4OCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU1MDFkZmRiNzcgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTUwMWRmZGI3NyI+PHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMDcuNjcxODc1IiB5PSIxMDYuMyI+Mjg4eDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==',
    description: '',
    weight: '',
    price: '',
    category: 'Pilih Kategori...',
    title: ''
  };

  $scope.isUploading = false;

  $scope.productCategories = $rootScope.productCategories;


  $scope.submitOffer = function() {
    console.log('submitOffer');
    if ($scope.offerForm.category == 'Pilih Kategori...') {
      $scope.offerForm.category = 'Lainnya'
    }
    var reqBody = {
      seller: $rootScope.user.username,
      buyer: '[]',
      image_url: $scope.offerForm.image_url,
      description: $scope.offerForm.description,
      weight: $scope.offerForm.weight,
      price: $scope.offerForm.price,
      category: $scope.offerForm.category,
      title: $scope.offerForm.title,
      is_valid : 1
    };

    $http.post('/api/offer', reqBody).then(function(res) {
      console.log(res);
      if (res.status == 200) {
        $state.go('my-offers')
      }
    });
  }

  $scope.$watch('uploadedFile', function(uploadedFile) {
    console.log('Hello');
    console.log(uploadedFile);
    console.log($scope.uploadedFile);
    if (uploadedFile) {
      // Use the service to upload the file
      $scope.isUploading = true;
      cloudinary.upload(uploadedFile, { /* cloudinary options here */ })
      // This returns a promise that can be used for result handling
      .then(function (res) {
        console.log(res);
        $scope.offerForm.image_url = res.data.secure_url;
        $scope.isUploading = false;
      });

    }
  });
});
