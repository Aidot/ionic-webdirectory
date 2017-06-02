'use strict';

/* Services */

angular.module('MGCMS.services.main', [])
.factory('Auth', function ($q) {

  return {
  	getLoggedUser: function () {
      console.log(AV.User.current());
      return AV.User.current();
	  },
	  logIn: function (username, password) {

  	  var defer = $q.defer();
  	  AV.User.logIn(username, password, {
  		  success: function (user) {
  		    defer.resolve(user);
  		  },
  		  error: function (user, error) {
  		    defer.reject(error);
  	  	}
  	  });

  	  return defer.promise;
    },
	  logOut: function () {
	    AV.User.logOut();
	  }
  }

});