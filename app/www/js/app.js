// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bloodbankcet', ['ionic', 'bloodbankcet.controllers', 'bloodbankcet.factories'])


.value('appConfig', {
    // serverUrl: 'http://localhost:3000',
    serverUrl: 'https://blood-bank-cet.herokuapp.com',
    version: '0.01'
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove   this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('login', {
        url: '/login',
        templateUrl: 'templates/login/login.html',
        controller: 'LoginCtrl'
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register/register.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button ng-click="showEditForm()" id="fab-search" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-edit"></i></button>',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('app.searchresult', {
        url: '/searchresult/:sendData',
        views: {
            'menuContent': {
                templateUrl: 'templates/search/searchresult.html',
                controller: 'SearchResultCtrl'
            },
            'fabContent': {
                template: '<button ng-click="showSearchForm()" id="fab-search" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-android-search"></i></button>',
                controller: 'SearchResultCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/searchresult/');
    0
});
