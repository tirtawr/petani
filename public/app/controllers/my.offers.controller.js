app.controller('MyOffersController', function($rootScope, $scope, $state, $cookies, $http, cloudinary){
  console.log('MyOffersController');
  initController();

  $scope.myOffers = [];
  $scope.user = $rootScope.user

  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      if ($rootScope.user.role == 'BUYER') {
        $scope.myOffers = _.values(_.filter(res.data.data, function(o){return o.buyer == $rootScope.user.username}));
      }
      else{
        $scope.myOffers = _.values(_.filter(res.data.data, function(o){return o.seller == $rootScope.user.username}));
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

	 $scope.delete = function(n) {
	 	console.log('hapus', n);
	 }
   $scope.sold = function(data) {
     if (confirm('Apakah anda yakin?')) {
       $state.go('confirm-offer', { id: data.id })
     }
    console.log('sell', data);
   }

   $scope.contact = function(data) {
     console.log('contact');
     console.log(data);
     $rootScope.seller_username = data.buyer;
     $rootScope.modal_content = 'NoTelp:085795980141 Lokasi:Bandung,Jawa_Barat WA:081231231231 BBM:FFJS9I ';

     $rootScope.modal_title = 'Kontak Pembeli';
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
