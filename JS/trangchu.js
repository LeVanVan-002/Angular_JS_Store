//Khai báo ngRoute vào đối tượng ứng dụng
var app = angular.module('myApp', ['ngRoute']);
//Sử dụng hàm config và truyền dịch vụ $routeProvider
app.config(function ($routeProvider) {
  $routeProvider//$routeProvider được sử dụng để điều hướng thông qua 2 pt when ,otherwise
    .when('/', {//bắt đầu là trang cửa hàng path
      //Trang web cần nạp template vào ng-view
      templateUrl: './view/cuahang_PK.html?' + Math.random(),
      // template :HTML cần nạp template vào ng-view
      controller: "cuahangCtrl"
      //controller :Tên controller điều khiển ng-view
      //controllerAs : Bí danh controller được sử dụng thay $scope
    })
    .when('/khuyenmai', {// :gia truyền vào tham số thêm $rooterParams
      templateUrl: './view/khuyenmai.html?' + Math.random(),//Các template được trình duyệt cache và được sử dụng lại cho lần truy cập sau.
      controller: "khuyenmaiCtrl"
    })
    .when('/dienthoai', {
      templateUrl: './view/SP_dienthoai.html?' + Math.random(),
      controller: "dienthoaiCtrl"
    })
    .when('/maytinh', {
      templateUrl: './view/SP_maytinh.html?' + Math.random(),
      controller: "maytinhCtrl"
    })
    .when('/tragop', {
      templateUrl: './view/tragop.html?' + Math.random()
    })
    .when('/lienhe', {
      templateUrl: './view/lienhe.html?' + Math.random()
    })
    .when('/dangky', {
      templateUrl: './view/login_logout.html?' + Math.random(),
      controller: "dangkyCtrl"
    })
    .when('/dangnhap', {
      templateUrl: './view/login.html?' + Math.random(),
      controller: "dangnhapCtrl"
    })
    .when('/menu', {
      templateUrl: '.layout/menu.html?' + Math.random(),
      controller: "cartCtrl"
    })
    .when('/thanhtoan', {
      templateUrl: './view/thanhtoan.html?' + Math.random(),
      // controller: "dangkyCtrl"
    })
    .when('/hoadon', {
      templateUrl: './view/hoadon.html?' + Math.random(),
      // controller: "dangkyCtrl"
    })
    .otherwise({//Path muốn chuyển đến
      redirectTo: '/' /// khi sai đường dẫn nó redirect lại về trang homme 
    })
});
//////
app.controller("cuahangCtrl", function ($scope, $http) {
  angular.module('myApp', ['ngAnimate']);
  $scope.shop = [];
  $http.get('./db/phukien.json')
    .then(function (response) {
      $scope.shop = response.data;
    }, function (response) {
      alert("lỗi tải lên");
    });
  ////laays danh sách từ 1 list có sẵn list.js
  // $scope.bang = list ;
  $scope.begin = 0;
  $scope.pageCount = 6; //mỗi trang 6
  $scope.last = function () { //trang cuối
    $scope.begin = ($scope.pageCount - 1) * 6;
  };
  $scope.first = function () { //trang đầu
    $scope.begin = 0;
  };
  $scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * 6) {
      $scope.begin += 6;
    }
  }
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 6;
    }
  }
  $scope.cot = 'gia';
  $scope.options = false;
  $scope.sortBy = function (cot) {
    $scope.cot = cot;
    if ($scope.options == false)
      $scope.options = true;
    else
      $scope.options = false;
  }
  // 
});
////
app.controller("khuyenmaiCtrl", function ($scope, $http) {
  $scope.shop = [];
  $http.get('./db/khuyenmai.json')
    .then(function (response) {
      $scope.shop = response.data;
    }, function (response) {
      alert("lỗi tải lên");
    });
  ////laays danh sách từ 1 list có sẵn list.js
  // $scope.bang = list ;
  $scope.giacon = 'gia';
  $scope.tien = false;
  $scope.sortBy = function (giacon) {
    $scope.giacon = giacon;
    if ($scope.tien == false)
      $scope.tien = true;
    else
      $scope.tien = false;
  }
});
///
app.controller("maytinhCtrl", function ($scope, $http) {
  $scope.shop = [];
  $http.get('./db/maytinh.json')
    .then(function (response) {
      $scope.shop = response.data;
    }, function (response) {
      alert("lỗi tải lên");
    });
  ////laays danh sách từ 1 list có sẵn list.js
  // $scope.bang = list ;
});
///
app.controller("dienthoaiCtrl", function ($scope, $http) {
  $scope.shop = [];
  $http.get('./db/dienthoai.json')
    .then(function (response) {
      $scope.shop = response.data;
    }, function (response) {
      alert("lỗi tải lên");
    });
  ////laays danh sách từ 1 list có sẵn list.js
  // $scope.bang = list ;
});
// đăng ký 
app.controller("dangkyCtrl", ['$scope', function ($scope) {
  $scope.success = false;
  $scope.register = function () {
    $scope.success = true;
  }
}]);
///////////dangnhapCtrl
app.controller("dangnhapCtrl", function () {

});
//
// app.controller("searchCtrl", function ($scope, $routeParams) {
//   $scope.timkiem =$routeParams.search;
// });
////Bẫy các sự kiện sau đây để theo dõi trạng thái đang tải
app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
  })
  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
  })
  $rootScope.$on('$routeChangeError', function () {
    $rootScope.loading = false;
    alert("lỗi tải lại trang ! ")
  });
});

/////////////////tranchuCrl
app.controller("trangchuCrl", function ($scope, $rootScope, $http ,$routeParams) {

  $scope.shop = $rootScope.shop = [];

  // $http.get('./db/phukien.json')
  //   .then(function(response) {
  //     $rootScope.shop = response.data;
  //   })
  /////
  $rootScope.cart = [];
  var findItemById = function (items, id) {
    return _.find(items, function (cuahang) {
      return cuahang.id === id;
    });
  };
  $rootScope.getCost = function (cuahang) {
    return cuahang.qty * cuahang.gia;
  };

  $rootScope.addItem = function (itemToAdd) {
    var found = findItemById($rootScope.cart, itemToAdd.id);
    if (found) {
      found.qty += itemToAdd.qty;
    }
    else {
      $rootScope.cart.push(angular.copy(itemToAdd));
    }
  };

  $rootScope.getTotal = function () {
    var total = _.reduce($rootScope.cart, function (sum, item) {
      return sum + $rootScope.getCost(item);
    }, 0);
    console.log('total: ' + total);
    return total;
  };
  $rootScope.clearCart = function () {
    $rootScope.cart.length = 0;
  };

  $rootScope.removeItem = function (item) {
    var index = $rootScope.cart.indexOf(item);
    $rootScope.cart.splice(index, 1);
  };
  // $scope.timkiem =$routeParams.search;
});
/////
app.controller("cartCtrl", function ($scope, $rootScope, $http) {
  $rootScope.shop = [];
  $http.get('./db/tatca.json')
    .then(function (response) {
      $rootScope.shop = response.data;
    }, function (response) {
      alert("lỗi tải lên");
    });

  ////laays danh sách từ 1 list có sẵn list.js
  // $scope.bang = list ;
});