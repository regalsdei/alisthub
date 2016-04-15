angular.module('alisthub').controller('stepeventController', function($scope,$localStorage) {
    $scope.multiple_event_div=$scope.location_event_div=$scope.price_and_link_div=true;
     $scope.events = [
    { "name": "Single Event",'id':1},
    {"name": "Multiple Event",'id':2}
    
]
     $scope.venues = [
    { "name": "Add New Venue",'id':3},
    {"name": "Use Post Location",'id':4}
    
]
     $scope.steps=[
     { "title":"Events Details","icon":'fa fa-calendar','id':5},
     { "title":"Price & Links","icon":'fa fa-tags','id':6},
     { "title":"Look & Feel","icon":'fa fa-eye','id':7},
     { "title":"Setting","icon":'fa fa-cog','id':8}
    ];
     
     $scope.selected=$scope.events[0];
     $scope.selected1=$scope.venues[0];
     $scope.selected2=$scope.steps[0];
     
     $scope.click_menu=function(menu)
     {
       
       if (menu.id==5) {
        
        $scope.eventdetail_div=false;
        $scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=true;
       }
       if (menu.id==6) {
         $scope.eventdetail_div=$scope.look_and_feel_div=$scope.setting_div=true;
        $scope.price_and_link_div=false;
       }
       if (menu.id==7) {
        $scope.eventdetail_div=$scope.price_and_link_div=$scope.setting_div=true;
        $scope.look_and_feel_div=false;
       }
       if (menu.id==8) {
        $scope.eventdetail_div=$scope.look_and_feel_div=$scope.price_and_link_div=true;
        $scope.setting_div=false;
       }
        $scope.selected2 = menu;  
     }
     
     $scope.select_venue=function(venue){
       if(venue.id==3)
       {
        $scope.venue_event_div=false;
        $scope.location_event_div=true;
       }else{
        $scope.venue_event_div=true;
        $scope.location_event_div=false;
       }
       $scope.selected1 = venue; 
     }
     $scope.select= function(item) {
        if (item.id==1) {
          $scope.multiple_event_div=true;
          $scope.single_event_div=false;  
        }else{
         $scope.multiple_event_div=false;
         $scope.single_event_div=true;      
        }
        $scope.selected = item; 
 };

 $scope.isActive = function(item) {
        
        return $scope.selected === item;
 };
  $scope.isActive1 = function(venue) {
        
        return $scope.selected1 === venue;
 };
 
 $scope.isActive2 = function(step2) {
        
        return $scope.selected2 === step2;
 };
 

});