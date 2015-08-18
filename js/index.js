var App = angular.module( 'schedulePickups', ['ui.router', 'firebase'] );

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

App.controller('MenuCtrl', function( $scope, $stateParams, $firebaseArray, restaurantService ){
  $scope.data = restaurantService.getRestaurant($stateParams.restaurantId);
   
})

// App.controller('InputMenuCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });

// App.controller('PosCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });