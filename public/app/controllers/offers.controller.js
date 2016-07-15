app.controller('OffersController', function($rootScope, $scope, $state, $stateParams, $cookies, $http, cloudinary){
  console.log('OffersController');
  initController();


  $scope.offers = [];
  $scope.category = $stateParams.category;
  $scope.user = $rootScope.user;




  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      $scope.offers = _.values(_.filter(res.data.data, function(o){
        o.buyer = JSON.parse(o.buyer)
        return o.category == $scope.category && o.is_valid == 1
      }));
      $scope.offers.reverse();
    });
  }

  $scope.formatRupiah = function(amount) {
      return 'Rp. '+$scope.formatMoney(amount, 0, ',', '.');
  }

  $scope.formatMoney = function(n, c, d, t){
      var c = isNaN(c = Math.abs(c)) ? 2 : c;
      var d = d == undefined ? "." : d;
      var t = t == undefined ? "," : t;
      var s = n < 0 ? "-" : "";
      var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
      var j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
   };

   $scope.buy = function(data) {
     if (confirm('Apakah and yakin?')) {
       data.buyer.push($rootScope.user.username);
       var reqObj = {
         buyer: JSON.stringify(data.buyer).toString(),
         seller: data.seller,
         image_url: data.image_url,
         description: data.description,
         weight: data.weight,
         price: data.price,
         category: data.category,
         title: data.title,
         is_valid: 1
       }
       $http.put('/api/offer/'+data.id, reqObj).then(function(res) {
         console.log(res);
         $state.go('my-offers')
       });
     }

   }


   $scope.contact = function(data) {
     $rootScope.modal_title = 'Kontak Penjual';

     $http.get('/api/user').then(function(res) {
       console.log(res.data.data);
       _.each(res.data.data, function(val, key, list) {
         if (val.username == data.seller) {
           $rootScope.modal_seller = val;
         }
       })
     });

     $rootScope.modal_offer_data = data;
     $rootScope.modal_type = 'CONTACT_SELLER';
   }






});
