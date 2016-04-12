// app.js
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
    }]).controller('loginController',function($scope,$rootScope,$location, $state){
        $rootScope.class_status=1; 
       // function to submit the form after all validation has occurred            
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                $rootScope.isuserloggedIn=$rootScope.footer_login_div=true;
                $rootScope.menu=$rootScope.after_login_footer_div=false;
                $rootScope.class_status = 0;
                $state.go('dashboard');
            }

        };
    
    
    }).controller('signupcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
        // function to submit the form after all validation has occurred            
        $scope.submitRegistrationform = function() {
        var serviceUrl = webservices.getUserregister;
        var jsonData=$scope.user;
         $http({
            url: 'http://192.155.246.146:7048/webservices/register',
            method: 'POST',
            data: jsonData,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "application/json",
            }
            }).success(function(data, status, headers, config) {
            
            console.log(data);
            });
       /*communicationService.resultViaPost(serviceUrl,appConstants.authorizationKey,headerConstants,jsonData, function(response){
           console.log(response);  
       });*/

        };
    
    
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


