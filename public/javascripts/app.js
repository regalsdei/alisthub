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
         //Events screen=================================
        .state('events', {
            url: '/events',
            templateUrl: 'modules/events/views/home.html'
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
    }]).controller('loginController',function($scope,$rootScope,$location, $state){
    $rootScope.class_status=1; 
    $scope.login=function(){
        $rootScope.isuserloggedIn=$rootScope.footer_login_div=true;
        $rootScope.menu=$rootScope.after_login_footer_div=false;
        $rootScope.class_status = 0;
        $state.go('events');
    }
    
    
    }).controller('eventhomeController', function($scope) {
  
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
});


