'use strict';

/* Controllers */

angular.module('MGCMS.controllers.category', [])

.controller('CategoryCtrl', function($q, $scope, Category, Notification){

 	// Pagination options.
 	$scope.rowOptions = [10, 20, 40];

 	$scope.query = {
 		filter: '',
 		limit: 6,
 		page: 1,
 		total: 0
 	};

 	$scope.categories = [];

 	var loadCategories = function() {
 		Category.all($scope.query).then(function(categories) {
 			$scope.categories = categories;
 		}, function(error) {
 			console.log(error);
 		});
 	}

 	loadCategories();

 	Category.count().then(function(total) {
 		$scope.query.total = total;
 	}, function(error) {
 		console.log(error);
 	});

 	$scope.onSearch = function () {
 		$scope.query.page = 1;
 		$scope.query.total = 0;
 		loadCategories();
 	};

 	Category.count().then(function(total) {
 		$scope.query.total = total;
 	}, function(error) {
 		console.log(error);
 	});

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function(page, limit) {
 		$scope.query.page = page;
 		$scope.query.limit = limit;
 		loadCategories();
    console.log('Page changed to: ' + page);
  };

  $scope.maxSize = 5;
  //$scope.bigTotalItems = 6;
  $scope.bigCurrentPage = 1;


  //category
  $scope.isCreating = true;
  $scope.isUpdating = false;

	$scope.onSaveCategory = function(isFormValid) {

		if(!isFormValid) {
      Notification.error({message: 'Fill the required fields.', delay: 3000});
			return;

		} else {
			Category.create($scope.objCategory).then(function (category) {
				alert('Category saved.');
        loadCategories();
			}, function (error) {
				alert(error.message);
			});
		}

	};

 	$scope.onEditCategory = function(ev, category) {

    $scope.isCreating = false;
    $scope.isUpdating = true;
    $scope.objCategory = {
      id: category.id,
      CategoryName : category.CategoryName,
      CategorySort : category.CategorySort
    };
 	}

 	$scope.onDestroyCategory = function(ev, category) {

 			Category.destroy(category.id).then(function(success) {
 				loadCategories();
 			}, function (error) {
 				showSimpleToast(error.message);
 			});
 	}
  //end destroy

})
.controller('CategoryDetailCtrl', function($scope, $stateParams, Category) {
  //$scope.cats = Category.get($stateParams.catId);
  var catId = $stateParams.catId;
  var loadPlace = function (catId) {
    Category.get(catId).then(function (data) {
      $scope.category = data;
      console.log(data);
    }, function (error) {
      console.log(error);
    });
  };
  loadPlace(catId);
	$scope.onUpdateCategory = function(isFormValid) {

		if(!isFormValid) {
			alert('Fill the required fields.');
			return;
		} else {
			Category.update($scope.category).then(function (category) {
				alert('Category updated.');
			}, function (error) {
				alert(error.message);
			});
		}
	}

});
