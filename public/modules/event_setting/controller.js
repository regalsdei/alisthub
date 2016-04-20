angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete'])
.controller('venueController', function($scope,$localStorage,$injector,$http) {
   
    var $serviceTest = $injector.get("venues");
    
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
    if (place.geometry) {
        $scope.data.latitude  = place.geometry.location.lat();
        $scope.data.longitude = place.geometry.location.lng();
    }
    
    $scope.data.address = place.formatted_address;
    
    $scope.data.zipcode = '';
    $scope.data.country = '';
    $scope.data.state = '';
    $scope.data.city = '';

    // FINDING ZIP
    if (place.address_components[place.address_components.length-1].types[0] == 'postal_code') {
      $scope.data.zipcode = Number(place.address_components[place.address_components.length-1].long_name);
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
    console.log($scope.data);
  }
 ////////////////////////////////////////////////////////////////////////////
    $scope.encodeImageFileAsURL = function(){
                  var filesSelected = document.getElementById("inputFileToLoad").files;
                  if (filesSelected.length > 0)
                  {   console.log(filesSelected.length);
                      var fileToLoad = filesSelected[0];
              
                      var fileReader = new FileReader();
              
                      fileReader.onload = function(fileLoadedEvent) {
                          var srcData = fileLoadedEvent.target.result; // <--- data: base64
              
                          var newImage = document.createElement('img');
                          newImage.src = srcData;
                          $scope.image =  srcData;                         
                          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                                       
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
    }
    
     $scope.encodeChartFileAsURL = function(){
                  var filesSelected = document.getElementById("inputFileToLoad5").files;
                  if (filesSelected.length > 0)
                  {   console.log(filesSelected.length);
                      var fileToLoad = filesSelected[0];
              
                      var fileReader = new FileReader();
              
                      fileReader.onload = function(fileLoadedEvent) {
                          var srcData = fileLoadedEvent.target.result; // <--- data: base64
              
                          var newImage = document.createElement('img');
                          newImage.src = srcData;
                          $scope.venue_chart =  srcData;                         
                          document.getElementById("imgTest5").innerHTML = newImage.outerHTML;
                                       
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
    }
  
  $scope.addVenue = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.imagedata   = $scope.image;
        $scope.data.venue_chart = $scope.venue_chart;
        $serviceTest.addVenue($scope.data,function(response){
            console.log(response);
            if (response == 200) {
                   $scope.activation_message = global_message.ActivatedMessage;
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
 ///////////////////////////////////////////////////////////////////////////
})