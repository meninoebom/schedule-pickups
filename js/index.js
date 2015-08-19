var App = angular.module( 'schedulePickups', ['ui.router', 'ui.bootstrap', 'firebase'] );

App.config(function( $stateProvider, $urlRouterProvider ){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl'
  })

  $stateProvider
  .state('menus', {
    url: '/menus/:restaurantId',
    templateUrl: '/js/views/menu.html',
    controller: 'MenuCtrl'
  })

  $stateProvider
  .state('inputMenu', {
    url: '/input_menu',
    templateUrl: '/js/views/input_menu.html',
    controller: 'InputMenuCtrl'
  })

  $stateProvider
  .state('pos', {
    url: '/pos',
    templateUrl: '/js/views/pos.html',
    controller: 'PosCtrl'
  })

});

App.controller('HomeCtrl', function( $scope, $rootScope, $sce, $firebaseArray ) {

});

App.controller('MenuCtrl', function( $scope, $stateParams, $firebaseArray, restaurantService, $log ){
  $scope.data = restaurantService.getRestaurant($stateParams.restaurantId);
  
  $scope.order = {
    pickupTime: "",
    menuItems: {},
    pastDue: false
  };

  for(menuItemId in $scope.data.menuItems) {
    $scope.order.menuItems[menuItemId] = 0;
  }

  var customer = '123', restaurantId = $stateParams.restaurantId;
  var fbRef = new Firebase("https://fiery-inferno-5692.firebaseio.com/"+customer+"/orders/"+restaurantId);
  $scope.createOrder = function() {
    console.log($scope.order);
    // fbRef.set({
    //   foo: "bar"
    // });
  }

$scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
   
})

// App.controller('InputMenuCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });

// App.controller('PosCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });