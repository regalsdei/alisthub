angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('venueController', function($scope,$localStorage) {
   
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 
 /////////////////////////////////////////////////////////////////////////////
 $scope.data = {};
 $scope.update = function(place){
    console.log(place);
    $scope.data.latitude  = place.geometry.location.lat();
    $scope.data.longitude = place.geometry.location.lng();
    
    $scope.data.zipcode = '';
    $scope.data.country = '';
    $scope.data.state = '';
    $scope.data.city = '';

    // FINDING ZIP
    if (place.address_components[place.address_components.length-1].types[0] == 'postal_code') {
      $scope.zipcode = Number(place.address_components[place.address_components.length-1].long_name);
    };

    // FINDING COUNTRY
    if (place.address_components[place.address_components.length-1].types[0] == 'country' || 
        place.address_components[place.address_components.length-2].types[0] == 'country') {
      if(place.address_components[place.address_components.length-1].types[0] == 'country'){
        $scope.data.country = place.address_components[place.address_components.length-1].long_name;  
      }else{
        $scope.data.country = place.address_components[place.address_components.length-2].long_name;  
      }      
    };

    // FINDING STATE
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_1') {
      
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-1].long_name;
      }else if(place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-2].long_name;  
      }else{
        $scope.data.state = place.address_components[place.address_components.length-3].long_name;  
      }
    };

    // FINDING CITY
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-4].types[0] == 'administrative_area_level_2' ||

        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-4].types[0] == 'sublocality_level_1' ) {
    
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-1].long_name;
      }else if( place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-2].long_name;  
      }else if( place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-3].long_name;  
      }else{
        $scope.data.city = place.address_components[place.address_components.length-4].long_name;  
      }    
    };

  }
 ////////////////////////////////////////////////////////////////////////////
  $scope.createBizAddr = function(place, city, state, country, biz_zipcode, biz_name) {
    
    // Getting location from lat long
    var promise = AddressService.getLatLongByLocation(place);
    promise.then(function(payload) {
        var address = {};
        var userLocationData  = payload.data;
        
        if (payload.data.results.length > 0) {
          address.biz_lat   = userLocationData.results[0].geometry.location.lat;
          address.biz_long  = userLocationData.results[0].geometry.location.lng;
        }else{
          address.biz_lat   = $scope.latitude;
          address.biz_long  = $scope.longitude;
        }
        address.biz_address = place.formatted_address;
        address.biz_city    = city;
        address.biz_state   = state;
        address.biz_country = country;
        address.biz_zipcode = biz_zipcode;        
        address.biz_owner   = $scope.userData.session_id;    
        address.biz_name    = biz_name;    
        
        /*
        formatted_address   = userLocationData.results[0].formatted_address;
        var addressArray    = formatted_address.split(",");
        address.biz_country = addressArray[addressArray.length-1].trim();
        */
    });
  };
 ///////////////////////////////////////////////////////////////////////////
})