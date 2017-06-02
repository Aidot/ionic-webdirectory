// Ionic Starter App
angular.module('MGiT.DH.services', [])
.factory('Category', function ($q, $ionicLoading) {
  var Category = AV.Object.extend("Category", {}, {
    list: function () {
      var defer = $q.defer();
      var query = new AV.Query(this);
      query.find({
        success: function (categories) {
          defer.resolve(categories);
        }, error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    get: function (id) {
      var defer = $q.defer();
      var query = new AV.Query(this);
      //query.include('Category');
      query.get(id, {
        success: function (category) {
          defer.resolve(category);
        },
        error: function (error) {
          defer.reject(error);
        }
      });
      return defer.promise;
    },
    // end list categories
  });

  Object.defineProperty(Category.prototype, 'CategoryName',
  {
    get: function () {
      return this.get('CategoryName');
    },
    set: function (val) {
      this.set('CategoryName', val);
    }
  });

  Object.defineProperty(Category.prototype, 'CategorySort',
  {
    get: function () {
      return this.get('CategorySort');
    },
    set: function (val) {
      this.set('CategorySort', val);
    }
  });

  return Category;
})
.factory('List', function ($q, $ionicLoading) {
  var List = AV.Object.extend("Urls", {}, {

    count: function(){

      var defer = $q.defer();
      var query = new AV.Query(this);
      query.count({
        success : function (count) {
          defer.resolve(count);
        }, error : function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    all: function (params) {
      var defer = $q.defer();
      var query = new AV.Query(this);
      query.include('Category');

      //console.log(params);

      if (params.filter != '') {
        query.contains('SiteName', params.filter);
      };

      if (params.category != '') {

				var Cates = AV.Object.extend("Category");
				var innerQuery = new Cates();
				innerQuery.id = params.category;
				query.equalTo("Category", innerQuery);
      };
      query.descending('updatedAt');
      query.limit(params.limit);

      $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});

      query.find({
        success: function (data) {
          defer.resolve(data);
					$ionicLoading.hide();
        }, error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    home: function (params) {

      var defer = $q.defer();
      var query = new AV.Query(this);
      query.include('Category');
      query.equalTo('isHomepage', true);
      query.descending('updatedAt');
      $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});

      query.find({
        success: function (data) {
          defer.resolve(data);
					$ionicLoading.hide();
        }, error: function (error) {
          defer.reject(error);
        }
      });
      return defer.promise;

    },
    feature: function (params) {

      var defer = $q.defer();
      var query = new AV.Query(this);
      query.include('Category');
      query.equalTo('isFeature', true);
			query.limit(params.limit);
      query.descending('updatedAt');
      $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});

      query.find({
        success: function (data) {
          defer.resolve(data);
					$ionicLoading.hide();
        }, error: function (error) {
          defer.reject(error);
        }
      });
      return defer.promise;

    },
    get: function (id) {

      var defer = $q.defer();
      var query = new AV.Query(this);

      //query.include('Category');
      query.get(id, {
        success: function (data) {
          defer.resolve(data);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
    // end list categories
  });

  Object.defineProperty(List.prototype, 'SiteName',
  {
    get: function () {
      return this.get('SiteName');
    },
    set: function (val) {
      this.set('SiteName', val);
    }
  });

  Object.defineProperty(List.prototype, 'SiteUrl',
  {
    get: function () {
      return this.get('SiteUrl');
    },
    set: function (val) {
      this.set('SiteUrl', val);
    }
  });

  Object.defineProperty(List.prototype, 'Category',
  {
    get: function () {
      return this.get('Category');
    },
    set: function (val) {
      this.set('Category', val);
    }
  });

  Object.defineProperty(List.prototype, 'isFeature',
  {
    get: function () {
      return this.get('isFeature');
    },
    set: function (val) {
      this.set('isFeature', val);
    }
  });

  Object.defineProperty(List.prototype, 'isHomepage',
  {
    get: function () {
      return this.get('isHomepage');
    },
    set: function (val) {
      this.set('isHomepage', val);
    }
  });

  Object.defineProperty(List.prototype, 'Description',
  {
    get: function () {
      return this.get('Description');
    },
    set: function (val) {
      this.set('Description', val);
    }
  });

  Object.defineProperty(List.prototype, 'image', {
      get: function () {
          return this.get('image');
      },
      set: function (value) {
          this.set('image', value);
      }
  });

  return List;
})
.filter('myFilter', function () {
    return function (items, category) {
        console.log(items);
        var newItems = [];
        for (var i = 0; i < items.length; i++) {
            newItems.push(items[i]);
        };

        return newItems;
    }
});