// app.js
/**************
CREATED :6 April 2016
CREATED BY: Deepak khokhar
Montive: It defined routes to call different files.It will provide you directions where to go.
********************/

angular.module("communicationModule", []);


var routerApp = angular.module('alisthub', ['ui.router','communicationModule']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login'); 
    
    $stateProvider
        
        // Login screen========================================
        .state('login', {
            url: '/login',
            templateUrl: 'modules/authentication/views/login.html'
        })
        //Authentication screen=================================
        .state('signup', {
            url: '/signup',
            templateUrl: 'modules/authentication/views/signup.html'
        })
         //Events dashoard screen=================================
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/events/views/dashboard.html'
        })
        
         //Create Event screen=================================
        .state('create_an_event', {
            url: '/create_an_event',
            templateUrl: 'modules/events/views/create_an_event.html'
        })
        
        //View Event screen=================================
        .state('view_event', {
            url: '/view_event',
            templateUrl: 'modules/events/views/view_event.html'
        })
        
        //Create Event step1=================================
        .state('create_event_step1', {
            url: '/create_event_step1',
            templateUrl: 'modules/step_event/views/create_event_step1.html'
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
    }]);


