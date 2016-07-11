app.controller('DataPortalController', function($rootScope, $scope, $state, $stateParams, $cookies, $http, cloudinary){
  console.log('DataPortalController');
  initController();


  $scope.items = [
    {
      title: "Cabe Merah Besar",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Merah Keriting",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Hijau Besar",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Hijau Keriting",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Kering",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Bendot",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Rawit Merah",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    },
    {
      title: "Cabe Rawit Hijau",
      volume_three_days: 732,
      price_three_days: 73210,
      volume_week: 800,
      price_week: 80000,
      volume_month: 900,
      price_month: 90000,
      volume_year: 650,
      price_year: 65000
    }
  ];
  $scope.category = $stateParams.category;
  $scope.user = $rootScope.user;




  function initController() {

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




   $scope.contact = function(data) {
     console.log('contact');
     console.log(data);
     $rootScope.seller_username = data.seller;
     $rootScope.modal_content = 'NoTelp:085795980141 Lokasi:Bandung,Jawa_Barat WA:081231231231 BBM:FFJS9I ';

     $rootScope.modal_title = 'Kontak Penjual';
   }






});
