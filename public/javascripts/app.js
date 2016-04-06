// app.js
var routerApp = angular.module('alisthub', ['ui.router']);

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
        
        
});


