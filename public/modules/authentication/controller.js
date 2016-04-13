/*
routerApp.controller('loginController',function($scope,$rootScope,$location, $state){
        $rootScope.class_status=1; 
       // function to submit the form after all validation has occurred
        if($state.params.id)
        {
                var serviceUrl = webservices.confirmToken;
                $token = $state.params.id;
                $http({ 
                url: serviceUrl,
                method: 'POST',
                data: jsonData,
                headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                }
                }).success(function(data, status, headers, config) {
                
                    if (data == 101) {
                     $scope.message = global_message.EmailExist;
                    }
                    else {
                     $scope.message = global_message.SignupSuccess;
                    }
                
                });
        }
        
=======*/

angular.module('alisthub').controller('loginController', function($http,$location,$scope, $ocLazyLoad,$rootScope,$state) {
 
        $rootScope.class_status=1;

        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                $rootScope.isuserloggedIn=$rootScope.footer_login_div=true;
                $rootScope.menu=$rootScope.after_login_footer_div=false;
                $rootScope.class_status = 0;
                var serviceUrl = webservices.getUserlogin;
                 var jsonData=$scope.user;
                $http({
                 url: serviceUrl,
                 method: 'POST',
                 data: jsonData,
                 headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "application/json",
                 }
                }).success(function(data, status, headers, config) {
                
                  if (data.message=='error') {
                   console.log('error occured');
                  }else{
                   $state.go('dashboard');
                  }
                });
            }

        };
}).controller('signupcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
        // function to submit the form after all validation has occurred            
        $scope.unique  = false;
        $scope.message = "";
        $scope.submitRegistrationform = function() {
        var serviceUrl = webservices.getUserregister;
        $scope.user.hosturl  = "localhost:3500";
        var jsonData=$scope.user;
        
        $http({
            url: serviceUrl,
            method: 'POST',
            data: jsonData,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "application/json",
            }
            }).success(function(data, status, headers, config) {
            
                if (data == 101) {
                 $scope.message = global_message.EmailExist;
                }
                else if (data == "err") {
                 $scope.message = global_message.SavingError;
                }
                else {
                 $scope.message = global_message.SignupSuccess;
                }
            
            });
        };
        
        $scope.checkUnique = function() {
        var serviceUrl = webservices.checkUnique;
        var jsonData = $scope.user;
          $http({
            url: serviceUrl,
            method: 'POST',
            data: jsonData,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "application/json",
            }
            }).success(function(data, status, headers, config) {
                 if (data == 300) {
                 $scope.unique = global_message.EmailAvailable;
                 }
                 else{
                 $scope.unique = global_message.EmailExist;
                 }
            });
        };
    
    }).controller('forgotcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
        $scope.forgotPassword=function(){
                console.log($scope.user);
        }
});
