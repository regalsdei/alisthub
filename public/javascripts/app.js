// app.js
/**************
CREATED :6 April 2016
CREATED BY: Deepak khokhar
Montive: It defined routes to call different files.It will provide you directions where to go.
********************/
'use strict';
angular.module("communicationModule", []);
// Declare app level module which depends on filters, and services
var routerApp = angular.module('alisthub', ['ui.router', 'oc.lazyLoad','communicationModule'])
  .config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
     $urlRouterProvider.otherwise('/login');
    

    // You can also load via resolve
    $stateProvider.
    //login screen
      state('login', {
        url: "/login", // root route
        views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
      })
       //Authentication screen=================================
        .state('signup', {
            url: '/signup',
            
            views: {
          "lazyLoadView": {
            controller: 'signupcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/signup.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        //Authentication screen=================================
        .state('forgot-password', {
            url: '/forgot-password',
            
            views: {
          "lazyLoadView": {
            controller: 'forgotcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/forgot.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        //Email Confirmation screen=================================
        .state('confirmation', {
            url: '/confirm_email/:id',
            templateUrl: 'modules/authentication/views/login.html'
        })
         //Events dashoard screen=================================
        .state('dashboard', {
            url: '/dashboard',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/dashboard.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
        })
        
         //Create Event screen=================================
        .state('create_an_event', {
            url: '/create_an_event',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/create_an_event.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
            
        })
        
        //View Event screen=================================
        .state('view_event', {
            url: '/view_event',
            views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/view_event.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
        })
        
        //Create Event step1=================================
        .state('create_event_step1', {
            url: '/create_event_step1',
            
            views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/views/create_event_step1.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
        })
    
  }).run(['$rootScope', '$location','$state', function($rootScope,$location, $state) {
    //To add class
    
    $rootScope.menu=$rootScope.after_login_footer_div=true;
    $rootScope.footer_login_div=false;
    $rootScope.logout=function(){
        $rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $rootScope.menu=$rootScope.after_login_footer_div=true;
        $state.go('login');
    }
    }]);;
