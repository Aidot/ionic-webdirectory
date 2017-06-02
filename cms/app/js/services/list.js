'use strict';

/* Services */

angular.module('MGCMS.services.list', [])
.factory('List', function ($q, cfpLoadingBar) {

  var List = AV.Object.extend("Urls", {}, {

    create: function (site) {
      var defer = $q.defer();
      var objSite = new List();

      objSite.save(site, {
        success: function (obj) {
          defer.resolve(obj);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;

    },
    update: function (site) {
      var defer = $q.defer();
      console.log(site.isFeature, site.isHomepage);
      site.save(null, {
        success: function (obj) {
          defer.resolve(obj);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
    destroy: function (list) {

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

      query.include('Category');

      if (params.filter != '') {
        query.contains('SiteName', params.filter);
      }

      query.descending('updatedAt');
      query.limit(params.limit);
      query.skip((params.page * params.limit) - params.limit);

      cfpLoadingBar.start();
      query.find({
        success: function (data) {
          defer.resolve(data);
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
        success: function (data) {
          defer.resolve(data);
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

  Object.defineProperty(List.prototype, 'Description',
  {
    get: function () {
      return this.get('Description');
    },
    set: function (val) {
      this.set('Description', val);
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


  Object.defineProperty(List.prototype, 'image', {
      get: function () {
          return this.get('image');
      },
      set: function (value) {
          this.set('image', value);
      }
  });

  return List;
});
