
angular.module('alisthub').controller('loginController', function($http,$location,$scope, $ocLazyLoad,$rootScope,$state, $timeout,$localStorage) {
        if ($localStorage.isuserloggedIn) {
                $state.go('dashboard');
        }
        $rootScope.class_status=1;
       $scope.error_message=true;
       // function to submit the form after all validation has occurred            
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                
                
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
                
                  if ((data.message=='error')||(data.user==undefined)) {
                   $scope.error="Error occurred during login.";
                   $scope.error_message=false;
                   $timeout(function() {
                        
                     $scope.error='';
                     $scope.error_message=true;
                   },3000);
                  }else{
                        $rootScope.class_status = 0;
                        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=true;
                        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=false;
                       
                        $rootScope.email=$localStorage.email=data.user.User.email;
                        $rootScope.name=$localStorage.name=data.user.User.first_name+" "+data.user.User.last_name;
                        $rootScope.access_token=$localStorage.access_token=data.user.User.access_token;
                        $rootScope.phone_no=$localStorage.phone_no=data.user.User.phone_no;
                        $rootScope.userId=$localStorage.userId=data.user.User.id;
                        $rootScope.address=$localStorage.address=data.user.User.address;
                        $state.go('dashboard');
                  }
                });
            }

        };
}).controller('signupcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
        // function to submit the form after all validation has occurred
        $rootScope.class_status = 1;
        $scope.submitRegistrationform = function() {
        var serviceUrl = webservices.getUserregister;
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
            
            console.log(data);
            });
 

        };
    
    
    }).controller('forgotcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
        $scope.forgotPassword=function(){
                console.log($scope.user);
        }
});