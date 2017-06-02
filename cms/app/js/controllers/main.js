'use strict';

/* Controllers */

angular.module('MGCMS.controllers.main', [])
.controller('MainCtrl', function ($rootScope, $scope, $location, Auth) {

	$scope.navigateTo = function (url) {
		$location.path(url);
	};

	$rootScope.currentUser = Auth.getLoggedUser();

  $rootScope.isLoggedIn = function () {
    return $rootScope.currentUser !== null;
  };

	$scope.logout = function () {
	  Auth.logOut();
	  $rootScope.currentUser = null;
	  $location.path('/');
	};

})
.controller('LoginCtrl', function (
	$rootScope, $scope, $location, Auth, Notification) {

  if ($rootScope.isLoggedIn()) {
  	$location.path('/category');
  }

  $scope.onLogin = function () {

  	var username = $scope.login.username;
    var password = $scope.login.password;

    Auth.logIn(username, password)
      .then(function (user) {
	    $rootScope.currentUser = Auth.getLoggedUser();
	    $location.path('/category');
			Notification.success({message: 'Login success.', delay: 3000});
	  },
	  function(error) {
	  	alert(error.message);
	  });
	};

})
.controller('HomeCtrl', function($scope){
  console.log(1);
});
