'use strict';

/* Controllers */

angular.module('MGCMS.controllers.list', [])

.controller('ListCtrl', function($q, $scope, List, Notification){

 	// Pagination options.

 	$scope.query = {
 		filter: '',
 		limit: 10,
 		page: 1,
 		total: 0
 	};

 	$scope.lists = [];

 	var loadlist = function() {
 		List.all($scope.query).then(function(data) {
 			$scope.sites = data;
 		}, function(error) {
 			console.log(error);
 		});
 	}

 	loadlist();

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

 	List.count().then(function(total) {
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
 		loadlist();
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

 	$scope.onDestroyCategory = function(ev, category) {

 			Category.destroy(category.id).then(function(success) {
 				loadCategories();
 			}, function (error) {
 				showSimpleToast(error.message);
 			});
 	}
  //end destroy

})
.controller('ListDetailCtrl', function($scope, $stateParams, Notification, List, Category, Upload, File) {
  //$scope.cats = Category.get($stateParams.catId);

  Category.sel().then(function (data) {
    $scope.categories = data;
  }, function (error) {
    console.log(error);
  });

  $scope.site = [];
  var siteId = $stateParams.siteId;
  var loadSite = function (siteId) {
    List.get(siteId).then(function (data) {
      //console.log(JSON.stringify(_data), _data);
      $scope.site = data;
    }, function (error) {
      console.log(error);
    });
  };
  loadSite(siteId);

	$scope.onSaveSite = function(isFormValid) {

		if(!isFormValid) {
      Notification.error({message: 'Fill the required fields.', delay: 3000});
			return;
		} else {
			List.create($scope.site).then(function (site) {
				Notification.success({message: 'Site saved..', delay: 3000});
			}, function (error) {
				alert(error.message);
			});
		}

	};

 	$scope.uploadImageOne = function (file) {

    if(file == null) {
 	    return;
    } else if (file.type.match(/image.*/) == null) {
      alert("File not supported.");
 	  } else if (file.$error) {
      alert("File too large. Max 2MB.");
    } else {

      $scope.isImageOneUploading = true;
      $scope.imageOneFilename = file.name;

 		  File.upload(file).then(function (savedFile) {

        $scope.site.image = savedFile;
        $scope.isImageOneUploading = false;
        alert('File uploaded');
 		  },
      function (error) {
        $scope.isImageOneUploading = false;
        alert(error.message);
 		  })
 	  }
 	};


	$scope.onUpdateSite = function(isFormValid) {

		if(!isFormValid) {
			alert('Fill the required fields.');
			return;
		} else {
			List.update($scope.site).then(function (site) {
				Notification.success({message: 'Site updated.', delay: 3000});
			}, function (error) {
				alert(error.message);
			});
		}
	}

});
