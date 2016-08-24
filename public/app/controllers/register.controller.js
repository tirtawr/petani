app.controller('RegisterController', function($rootScope, $scope, $state, $cookies, $http){
  console.log('RegisterController');
  $scope.registerForm = {
    username: '',
    password: '',
    role: 'SELLER',
    city: '',
    phone: '',
    bbm: ''
  }

  $scope.cities = [
    "Kab. Bogor",
    "Kab. Sukabumi",
    "Kab. Cianjur",
    "Kab. Bandung",
    "Kab. Garut",
    "Kab. Tasikmalaya",
    "Kab. Ciamis",
    "Kab. Kuningan",
    "Kab. Cirebon",
    "Kab. Majalengka",
    "Kab. Sumedang",
    "Kab. Indramayu",
    "Kab. Subang",
    "Kab. Purwakarta",
    "Kab. Karawang",
    "Kab. Bekasi",
    "Kab. Bandung Barat",
    "Kab. Pangandaran",
    "Kota Bogor",
    "Kota Sukabumi",
    "Kota Bandung",
    "Kota Cirebon",
    "Kota Bekasi",
    "Kota Depok",
    "Kota Cimahi",
    "Kota Tasikmalaya",
    "Kota Banjar"
]

  $scope.register = function() {
    var reqBody = {
      username: $scope.registerForm.username,
      password: $scope.registerForm.password,
      role: $scope.registerForm.role
    };

    console.log('register');
    console.log($scope.registerForm);

    $http.post('/api/user',{
      username: $scope.registerForm.username,
      password: $scope.registerForm.password,
      role: $scope.registerForm.role,
      city: $scope.registerForm.city,
      phone: $scope.registerForm.phone,
      bbm: $scope.registerForm.bbm
    }).then(function success(res) {
      console.log(res);
      alert('Anda berhasil daftar! Silahkan melakukan login.');
      $state.go('home');
    }, function error(res) {
      alert('Username sudah dipilih oleh orang lain! Pilih username yang berbeda.')
    });

  };

});
