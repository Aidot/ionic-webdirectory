// Ionic Starter App
angular.module('MGiT.DH.controllers', [])

.controller('MainCtrl', function($q, $scope, List, Category){

  $scope.oLink = function (url) {
    window.open(url, '_blank');
  };

  $scope.sites = [];
	$scope.categories = [];


	var loadcates = function () {
	  Category.list().then(function (data) {
	    $scope.categories = data;
	  }, function (error) {
	    console.log(error);
	  });
	};
	loadcates();


 	$scope.query = {
 		filter: '',
    category: '',
    feature: false,
    homepage: false,
 		limit: 99,
 		total: 0
 	};

 	var loadHomelist = function() {
		$scope.query.homepage = true;
 		List.home($scope.query).then(function(data) {
 			$scope.sites = data;
 		}, function(error) {
 			console.log(error);
 		});
 	}

 	var loadFeatureList = function(){
    $scope.query.feature = true;
    $scope.query.limit = 10;
 		List.feature($scope.query).then(function(data) {
 			$scope.FeatureSites = data;
 		}, function(error) {
 			console.log(error);
 		});
 	}

  loadFeatureList();
 	loadHomelist();

 	List.count().then(function(total) {
 		$scope.query.total = total;
 	}, function(error) {
 		console.log(error);
 	});

 	$scope.onSearch = function () {
 		$scope.query.page = 1;
 		$scope.query.total = 0;
 		loadCategories();
 	};

	$scope.doRefresh = function () {
		loadFeatureList();
    loadHomelist();
    $scope.$broadcast('scroll.refreshComplete');
	};

})
.controller('SiteListCtrl', function($scope, $stateParams, List, Category, $ionicHistory, $ionicPlatform, $window) {

  $scope.oLink = function (url) {
    window.open(url, '_blank');
  };

  $scope.site = [];
	$scope.category = [];
  var categoryId = $stateParams.categoryId;

 	$scope.query = {
 		filter: '',
 		category: '',
    limit: 99
 	};

	$scope.query.category = categoryId;

  Category.get(categoryId).then(function (data) {
    $scope.category = data;
  }, function (error) {
    console.log(error);
  });


  var loadSite = function () {
    List.all($scope.query).then(function (data) {
      //console.log(JSON.stringify(_data), _data);
      $scope.sites = data;
    }, function (error) {
      console.log(error);
    });
  };
  loadSite();

	$scope.doRefresh = function () {
		loadSite();
    $scope.$broadcast('scroll.refreshComplete');
	};

});

