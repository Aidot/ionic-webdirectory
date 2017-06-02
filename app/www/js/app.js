// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MGiT.DH', [
  'ionic',
  'ui.router',
  'admob',
  'MGiT.DH.controllers',
  'MGiT.DH.services'
])
.constant('Configs', {
  "parse": {
  	"appId": "xgPxtGNJ0yRVYwgRogkrwCHP1ppvKnD4rxm3eH0f",
  	"javascriptKey": "3a5wW5hWJR0qDERijxtWTSUwnvhclLKCeEPcpQyK"
  }
})
.run(function($ionicPlatform, $adMob, Configs) {

  AV.initialize(
    "IGsxUuzbtDD5MHAeRYoHeWAF-gzGzoHsz",
    "Ux4NYx8SmuIEzdonMgkC545y");

  $ionicPlatform.ready(function() {

    var dimensions = {
      platform: device.platform,
      uuid: device.uuid,
      model: device.model,
      manufacturer: device.manufacturer,
      source: 'App Directory',
      dayType: 'weekend'
    };

    AV.Analytics.track('user', dimensions);
    // AdMob
    if(window.AdMob) {
        var admobid;

        if (device.platform == "Android") {
            admobid = { // for Android
                banner: 'ca-app-pub-4180043241549743/5738539400',
                interstitial: 'ca-app-pub-your-ad-key'
            };
        } else {
            admobid = { // for iOS
                banner: 'ca-app-pub-your-ad-key',
                interstitial: 'ca-app-pub-your-ad-key'
            };
        }

        $adMob.createBanner( {
            adId: admobid.banner,
            autoShow: true,
            bgColor: 'white',
            position: $adMob.position.BOTTOM_CENTER
        });

        $adMob.prepareInterstitial({
            adId: admobid.interstitial,
            autoShow: false
        });
    }

    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,
  $provide) {

  // Enable android native scrolling.
  var jsScrolling = (ionic.Platform.isAndroid() ) ? false : true;
  $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/');
  $stateProvider
  // this state is placed in the <ion-nav-view> in the index.html
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'MainCtrl'
  })
  .state('sites', {
    url: '/category/:categoryId',
    templateUrl: 'templates/list.html',
    controller: 'SiteListCtrl'
  });

  // Fix for list going to top when native scrolling is enabled
  function $LocationDecorator ($location) {
    $location.hash = function (value) {
      return $location.__hash(value);
    };
    return $location;
  }
  $provide.decorator('$location', ['$delegate', $LocationDecorator]);

});

