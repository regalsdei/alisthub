'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.addVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.venueOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.venueOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  
  
return url;
}]);