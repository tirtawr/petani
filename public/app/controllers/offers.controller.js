app.controller('OffersController', function($rootScope, $scope, $state, $stateParams, $cookies, $http, cloudinary){
  console.log('OffersController');
  initController();

  $scope.offers = [];
  $scope.category = $stateParams.category

  function initController() {
    $http.get('/api/offer').then(function(res) {
      console.log(res);
      $scope.offers = _.values(_.filter(res.data.data, function(o){return o.category == $scope.category}));
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






});
