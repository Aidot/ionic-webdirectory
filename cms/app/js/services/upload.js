'use strict';
angular.module('MGCMS.services.upload', [])
.factory('File', function ($q) {

  return {

    upload: function (file) {

      var defer = $q.defer();
      var parseFile = new AV.File(file.name, file);

      parseFile.save({
      	success: function (savedFile) {
      	  defer.resolve(savedFile);
		},
		error: function (error) {
	      defer.reject(error);
		}
	  });

	  return defer.promise;
		},
  };
});