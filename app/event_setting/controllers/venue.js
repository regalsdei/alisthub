var fs         = require('fs');
var path_venue = process.cwd()+'/public/images/venues/';
/*** Get Seller Venues ***/
exports.getVenue = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from venues where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Add Seller Venue ***/
exports.addVenue = function(req,res){
     //console.log(req.body);
     var photoname =  chartname = "";  
     if (req.body.imagedata && req.body.imagedata != "" && req.body.imagedata != undefined)
     {
          var photoname = req.body.seller_id+'_image_'+Date.now() + '.jpg';
          var imagename = path_venue+'/'+photoname;
          var base64Data = req.body.imagedata.replace(/^data:image\/jpeg;base64,/, "");
          
          fs.writeFile(imagename, base64Data, 'base64', function(err) {
          if (err) {
           console.log("Image Failure Upload");
          }
          });
          
          req.body.image = photoname;
     }
     
     if (req.body.venue_chart && req.body.venue_chart != "" && req.body.venue_chart != undefined)
     {
          var chartname   = req.body.seller_id+'_chart_'+Date.now() + '.jpg';
          var chartimage  = path_venue+'/'+chartname;
          var base64Data5 = req.body.venue_chart.replace(/^data:image\/jpeg;base64,/, "");
          
          fs.writeFile(chartimage, base64Data5, 'base64', function(err5) {
           if (err5) {
           console.log("Chart Failure Upload");
          }
          });
          req.body.seating_chart = chartname;
     }
     
     ///////////////////////////////////////////////////////////
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `venues` SET seller_id="+req.body.seller_id+", venue_type='"+req.body.venue_type+"', venue_name='"+req.body.venue_name+"', address='"+req.body.address+"', city='"+req.body.city+"', zipcode='"+req.body.zipcode+"', state='"+req.body.state+"', country='"+req.body.country+"', status='"+req.body.status+"', latitude='"+req.body.latitude+"', longitude='"+req.body.longitude+"', created='"+req.body.created+"', fax='"+req.body.fax+"', timezone='"+req.body.timezone+"', capacity='"+req.body.capacity+"', contact_name='"+req.body.contact_name+"', phone='"+req.body.phone+"', email='"+req.body.email+"', url='"+req.body.url+"', image='"+req.body.image+"', seating_chart='"+req.body.seating_chart+"' where id="+req.body.id;
          }
          else
          {
          var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.venue_type+"', '"+req.body.venue_name+"', '"+req.body.address+"', '"+req.body.city+"', '"+req.body.zipcode+"', '"+req.body.state+"', '"+req.body.country+"', '1', '"+req.body.latitude+"', '"+req.body.longitude+"', '"+req.body.created+"', '"+req.body.fax+"', '"+req.body.timezone+"', '"+req.body.capacity+"', '"+req.body.contact_name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.url+"', '"+req.body.image+"', '"+req.body.seating_chart+"')";
          }
          if (query != "") {
               console.log(query);
              connection.query(query, function(err7, results) {
               if (err7) {
                res.json({error:err7,code:101});
               }
               res.json({result:results,code:200});
          });
          }
          else{
              res.json({error:"error",code:101}); 
          }
          
     /////////////////////////////////////////////////////////// 
     //res.json({result:"00000",code:200});
   
}

/*** Venue Overview***/
exports.venueOverview = function(req,res){
    //console.log(req.body.userId);
   connection.query('SELECT * from venues where id='+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}