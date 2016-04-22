module.exports = function(app, express) {

	var router = express.Router();
       

	Event_setting  = require('./../app/event_setting/controllers/venue.js');
               
        /* Web services for Event Setting Module
        * Created : 2016-04-19 6 PM
        /* GET users listing. */
       
        // router.get('/', Event_setting.defaulturl);
        /* Module : Venue Management
        * Service : Add Venue to Seller
        * */
        router.post('/addVenue', Event_setting.addVenue);
       
        /* Service : Venue Overview to Seller
        * */
        router.post('/venueOverview', Event_setting.venueOverview);
        
        /* Service : Seller Venues Listing
        * */
        router.post('/venueListing', Event_setting.getVenue);
         
         
	app.use('/event_setting', router);
    }