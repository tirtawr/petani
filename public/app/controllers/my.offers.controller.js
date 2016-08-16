app.controller('MyOffersController', function($rootScope, $scope, $state, $cookies, $http, cloudinary){
  console.log('MyOffersController');
  initController();

  $scope.myOffers = [];
  $scope.user = $rootScope.user

  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      if ($rootScope.user.role == 'BUYER') {
        $scope.myOffers = _.values(_.filter(res.data.data, function(o){
          o.buyer = JSON.parse(o.buyer)
          for (var i = 0; i < o.buyer.length; i++) {
            if (o.buyer[i] == $rootScope.user.username) {
              return true
            }
          }
          return false
        }));
      }
      else{
        $scope.myOffers = _.values(_.filter(res.data.data, function(o){
          o.buyer = JSON.parse(o.buyer)
          return o.seller == $rootScope.user.username && o.is_valid > 0
        }));
      }

      $scope.myOffers.reverse();

      }
    );
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

	 $scope.delete = function(data) {
     if ($scope.user.role == 'SELLER') {
       if (confirm('Apakah anda yakin?')) {
         var reqObj = {
           buyer: '[]',
           seller: data.seller,
           image_url: data.image_url,
           description: data.description,
           weight: data.weight,
           price: data.price,
           category: data.category,
           title: data.title,
           is_valid: 0
         }
         $http.put('/api/offer/'+data.id, reqObj).then(function(res) {
           console.log(res);
           $state.reload()
         });
       }
     }
     else {
       if (confirm('Apakah anda yakin?')) {
         var buyers = []
         for (var i = 0; i < data.buyer.length; i++) {
           if (data.buyer[i] != $scope.user.username) {
             buyers.push(data.buyer[i]);
           }
         }
         var reqObj = {
           buyer: JSON.stringify(buyers),
           seller: data.seller,
           image_url: data.image_url,
           description: data.description,
           weight: data.weight,
           price: data.price,
           category: data.category,
           title: data.title,
           is_valid: 0
         }
         $http.put('/api/offer/'+data.id, reqObj).then(function(res) {
           console.log(res);
           $state.reload()
         });
       }
     }
   }
   $scope.sold = function(data) {
     if (confirm('Apakah anda yakin?')) {
       $state.go('confirm-offer', { id: data.id })
     }
    console.log('sell', data);
   }

   $scope.contact = function(data) {
     if ($rootScope.user.role == 'BUYER') {
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
     else {
       $rootScope.modal_title = 'Kontak Peminat';

       $http.get('/api/user').then(function(res) {
         console.log(res.data.data);
         $rootScope.modal_buyer = [];
         _.each(res.data.data, function(val, key, list) {
           console.log(val);
           for (var i = 0; i < data.buyer.length; i++) {
             if (val.username == data.buyer[i]) {
               console.log('MASUK');
               $rootScope.modal_buyer.push(val);
             }
           }
         })
       });
       $rootScope.modal_offer_data = data;
       $rootScope.modal_type = 'CONTACT_BUYERS';

     }

   }

   $scope.cancel = function(data) {
     if (confirm('Apakah anda yakin?')) {
       var reqObj = {
         buyer: '',
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
         $state.reload()
       });
     } else {

     }
   }






});
