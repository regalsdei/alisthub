angular.module('alisthub').controller('stepeventController', function($scope,$localStorage) {
var locations = [
    [
        "New Mermaid",
        36.9079,
        -76.199,
        1,
        "Georgia Mason",
        "",
        "Norfolk Botanical Gardens, 6700 Azalea Garden Rd.",
        "coming soon"
    ],
    [
        "1950 Fish Dish",
        36.87224,
        -76.29518,
        2,
        "Terry Cox-Joseph",
        "Rowena's",
        "758 W. 22nd Street in front of Rowena's",
        "found"
    ],
    [
        "A Rising Community",
        36.95298,
        -76.25158,
        3,
        "Steven F. Morris",
        "Judy Boone Realty",
        "Norfolk City Library - Pretlow Branch, 9640 Granby St.",
        "found"
    ],
    [
        "A School Of Fish",
        36.88909,
        -76.26055,
        4,
        "Steven F. Morris",
        "Sandfiddler Pawn Shop",
        "5429 Tidewater Dr.",
        "found"
    ],
    [
        "Aubrica the Mermaid (nee: Aubry Alexis)",
        36.8618,
        -76.203,
        5,
        "Myke Irving/ Georgia Mason",
        "USAVE Auto Rental",
        "Virginia Auto Rental on Virginia Beach Blvd",
        "found"
    ]
]

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      // center: new google.maps.LatLng(-33.92, 151.25),
      center: new google.maps.LatLng(36.8857, -76.2599),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0], locations[i][6]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
   var now = new Date();
if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
$scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };

  // Called when the editor is completely ready.
  $scope.onReady = function () {
    // ...
  };
 $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };
  
  $scope.options1 = {
    customClass: getDayClass,
    initDate: current,
    showWeeks: true
  };

var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
    $scope.multiple_event_div=$scope.location_event_div=$scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=true;
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