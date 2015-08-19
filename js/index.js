var App = angular.module( 'schedulePickups', ['ui.router', 'ui.bootstrap', 'firebase', 'timer'] );


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
  .state('restaurants', {
    url: '/restaurants',
    templateUrl: '/js/views/restaurants.html'
  })

  $stateProvider
  .state('pos-landing-page', {
    url: '/pos',
    templateUrl: '/js/views/pos-landing-page.html',
  })

  $stateProvider
  .state('pos-dashboard', {
    url: '/pos/:restaurantId',
    templateUrl: '/js/views/pos.html',
    controller: 'PosCtrl'
  })

});

App.controller('HomeCtrl', function( $scope, $state, $rootScope ){

  $scope.error = false;
  $scope.customerName = '';

  $scope.continue = function() {
    if($scope.customerName === '') {
      $scope.error = true;
      return;
    }
    $scope.error = false;
    $rootScope.customerName = $scope.customerName;
    $state.go('restaurants', { 'customerName': $scope.customerName });
  }

});

App.controller('MenuCtrl', function( $scope, $rootScope, $stateParams, $firebaseArray, restaurantService, $modal, $log ){
  var restaurantId = $stateParams.restaurantId;
  $scope.data = restaurantService.getRestaurant( restaurantId );
  
  // set up current order obj
  $scope.currentOrder = {
    pickupTime: null,
    menuItems: {},
    // menuItems: [],
    customerName: ""  
  };

  // set the menu items on the currentOrder obj
  for( menuItemId in $scope.data.menuItems ){
    $scope.currentOrder.menuItems[menuItemId] = 0;
    // $scope.currentOrder.menuItems.push(0);

  }

  $scope.timepickerVal = new Date();
  $scope.hstep = 1;
  $scope.mstep = 5;
  $scope.orderScheduled = false;
  var fbRef = new Firebase( "https://fiery-inferno-5692.firebaseio.com/orders/"+restaurantId+"/" );
  $scope.orders = $firebaseArray(fbRef);
  
  $scope.createOrder = function() {

    if(!$rootScope.customerName) {
      $scope.openModal('lg');
      return;
    }

    $scope.pickupTimeObj = moment( $scope.timepickerVal ).toObject();

    // set the pick up time and customer name on the current order obj
    $scope.currentOrder.pickupTime = moment( $scope.timepickerVal ).format();
    $scope.currentOrder.customerName = $scope.customerName = $rootScope.customerName;

    // add the currentOrder obj to firebase ref
    $scope.orders.$add( $scope.currentOrder )
      .then(function(ref) {
        var id = ref.key();
        console.log( "added record with id " + id );
        $scope.currentOrderRecord = $scope.orders.$indexFor( id ); // returns location in the array
        $scope.orderScheduled = true;
      });


    // set up the time display string for the countdown directive  
    $scope.countdownEndTime = new Date( $scope.currentOrder.pickupTime ).getTime();
  }
 
  $scope.cancelOrder = function() {
    $scope.orders.$remove( $scope.currentOrderRecord )
      .then(function( ref ){
        var id = ref.key();
        console.log( "removed record with id " + id );
        $scope.orderScheduled = false;
      });
  }

  $scope.emptyTray = function() {
    for ( key in $scope.currentOrder.menuItems ){
      if( $scope.currentOrder.menuItems[key] > 0 ) return false;
    }
    return true;
  }

  $scope.openModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/js/views/modal.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
    });
  }
   
});

App.controller('PosCtrl', function( $scope, $stateParams, $firebaseArray, restaurantService, $log ){
  var restaurantId = $stateParams.restaurantId;
  $scope.data = restaurantService.getRestaurant( restaurantId );
  var fbRef = new Firebase( "https://fiery-inferno-5692.firebaseio.com/orders/"+restaurantId+"/" );
  $scope.orders = $firebaseArray( fbRef );

  $scope.getCountDownEndTime = function( dateString ){
    return new Date( dateString ).getTime();
  }

  $scope.getFormattedEndTime = function( dateString  ){
    return moment( dateString ).format('h:mm:ss a')
  }

  $scope.pastDue = function( dateString ){
    return new Date( dateString ).getTime() < Date.now();
  }

  $scope.displayMenuItem = function( ind ){
    if($scope.data.menuItems[ind]) return $scope.data.menuItems[ind]['name'];
  }

  $scope.recordPickUpTime = function( order ){
    console.log($scope.orders.$indexFor(order.$id));
    var d = new Date();
    var now = d.getTime();
    order.pickupTime = moment( now ).format();
    $scope.orders.$save(order).then(function(ref){
      console.log('saved')
    });
    // order.pickupTime = new Date.now();
  }

});


App.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $rootScope) {

  $scope.error = false;
  $scope.customerName = '';

  $scope.continue = function() {
    if($scope.customerName === '') {
      $scope.error = true;
      return;
    }
    $scope.error = false;
    $rootScope.customerName = $scope.customerName;
    $modalInstance.dismiss('cancel');
  }

});












