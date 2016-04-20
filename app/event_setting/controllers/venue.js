var fs         = require('fs');
var path_venue = process.cwd()+'/public/images/venues/';
/*** Get Seller Venues ***/
exports.getVenue = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from venues where seller_id='+req.body.userId, function(err, results) {
   if (err) {
    res.json(err);
   }
   res.json(results);
});
   
}

/*** Add Seller Venue ***/
exports.addVenue = function(req,res){
        
     if (req.body.imagedata && req.body.imagedata != "" && req.body.imagedata != undefined)
     {
          var photoname = req.body.seller_id+'_image_'+Date.now() + '.jpg';
          var imagename = path_venue+'/'+photoname;
          var base64Data = req.body.imagedata.replace(/^data:image\/jpeg;base64,/, "");
          
          var chartname   = req.body.seller_id+'_chart_'+Date.now() + '.jpg';
          var chartimage  = path_venue+'/'+chartname;
          var base64Data5 = req.body.venue_chart.replace(/^data:image\/jpeg;base64,/, "");
          
          fs.writeFile(imagename, base64Data, 'base64', function(err) {
          if (err) {
           console.log("Failure Upload");
          }
          else
          {
           console.log("Success Uploaded");
           fs.writeFile(chartimage, base64Data5, 'base64', function(err5) {
           if (err5) {
           console.log("Failure Upload");
          }
          else
          {
            ///////////////////////////////////////////////////////////
            var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.venue_type+"', '"+req.body.venue_name+"', '"+req.body.address+"', '"+req.body.city+"', '"+req.body.zipcode+"', '"+req.body.state+"', '"+req.body.country+"', '1', '"+req.body.latitude+"', '"+req.body.longitude+"', '"+req.body.created+"', '"+req.body.fax+"', '"+req.body.timezone+"', '"+req.body.capacity+"', '"+req.body.contact_name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.url+"', '"+photoname+"', '"+chartname+"')";
            connection.query(query, function(err7, results) {
               if (err7) {
                res.json({error:err7,code:101});
               }
               res.json({result:results,code:200});
            });
            ///////////////////////////////////////////////////////////   
          }
          });
                  
          }
          });
	  
	  
     }
     else{
          res.json({result:"00000",code:200});
     }
    
     //res.json({result:"00000",code:200});
   
}

/*** Venue Overview***/
exports.venueOverview = function(req,res){
    //console.log(req.body.userId);
   connection.query('SELECT * from venues where id='+req.body.id, function(err, results) {
   if (err) {
    res.json(err);
   }
   res.json(results);
});
   
}