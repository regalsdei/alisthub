routerApp.controller('loginController',function($scope,$rootScope,$location, $state){
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
    
    
    })