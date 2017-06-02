'use strict';

/* Services */

angular.module('MGCMS.services.category', [])
.factory('Category', function ($q, cfpLoadingBar) {
  var Category = AV.Object.extend("Category", {}, {

    create: function (category) {
      var defer = $q.defer();
      var objCategory = new Category();

      objCategory.save(category, {
        success: function (obj) {
          defer.resolve(obj);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    update: function (category) {
      console.log(category);
      var defer = $q.defer();

      category.save(null, {
        success: function (obj) {
          defer.resolve(obj);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
    destroy: function (categoryId) {

      var defer = $q.defer();

      var category = new Category();
      category.id = categoryId;

      category.destroy({
        success: function (obj) {
          defer.resolve(obj);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
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

      if (params.filter != '') {
        query.contains('CategoryName', params.filter);
      }
      query.descending('updatedAt');
      query.limit(params.limit);
      query.skip((params.page * params.limit) - params.limit);

      cfpLoadingBar.start();
      query.find({
        success: function (categories) {
          defer.resolve(categories);
          cfpLoadingBar.complete();
        }, error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    sel: function () {
      var defer = $q.defer();
      var query = new AV.Query(this);
      cfpLoadingBar.start();
      query.find({
        success: function (categories) {
          defer.resolve(categories);
          cfpLoadingBar.complete();
        }, error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    get: function (id) {

      var defer = $q.defer();
      var query = new AV.Query(this);

      cfpLoadingBar.start();
      //query.include('Category');
      query.get(id, {
        success: function (category) {
          defer.resolve(category);
          cfpLoadingBar.complete();
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
});
