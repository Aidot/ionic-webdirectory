'use strict';


// Declare app level module which depends on filters, and services
angular.module('MGCMS', [
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'cfp.loadingBar',
  'ui-notification',
  'ngAnimate',
	'ngFileUpload',
	'MGCMS.services.upload',
  'MGCMS.services.main',
  'MGCMS.controllers.main',
  'MGCMS.services.category',
  'MGCMS.controllers.category',
  'MGCMS.services.list',
  'MGCMS.controllers.list'
])
.run(function ($rootScope, $location, Auth) {

  AV.initialize(
    "IGsxUuzbtDD5MHAeRYoHeWAF-gzGzoHsz",
    "Ux4NYx8SmuIEzdonMgkC545y");

  // Redirect unauthorized users to login.

  $rootScope.$on('$routeChangeStart', function (event, next, current) {

    if (next.templateUrl !== 'partials/login.html' && !Auth.getLoggedUser()) {
      $location.path('/');
      event.preventDefault();
    }
  });

})
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])
.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
    .state('login', {
      url: "/login",
      views: {
        'content': {
          templateUrl: 'partials/login.html'
        }
      },
      controller: "LoginCtrl"
    })
    .state('category', {
      url: "/category",
      views: {
        'content': {
          templateUrl: 'partials/category.html',
          controller: "CategoryCtrl"
        },
        'header': {
          templateUrl: 'partials/header.html'
        }
      }
    })
    .state('cat-detail', {
      url: '/category/:catId',
      views: {
        'content': {
          templateUrl: 'partials/category-detail.html',
          controller: 'CategoryDetailCtrl'
        },
        'header': {
          templateUrl: 'partials/header.html'
        }
      }
    })
    .state('list', {
      url: "/list",
      views: {
        'content': {
          templateUrl: 'partials/list.html',
          controller: "ListCtrl"
        },
        'header': {
          templateUrl: 'partials/header.html'
        }
      }
    })
    .state('site-detail', {
      url: '/list/:siteId',
      views: {
        'content': {
          templateUrl: 'partials/list-detail.html',
          controller: 'ListDetailCtrl'
        },
        'header': {
          templateUrl: 'partials/header.html'
        }
      }
    })
    .state('site-add', {
      url: '/list-add',
      views: {
        'content': {
          templateUrl: 'partials/list-add.html',
          controller: 'ListDetailCtrl'
        },
        'header': {
          templateUrl: 'partials/header.html'
        }
      }
    })
  }]);
