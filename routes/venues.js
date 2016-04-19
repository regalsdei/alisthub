module.exports = function(app, express) {

	var router = express.Router();
       
	venue = require('./../app/venues/controllers/venue.js');
       
        //For SMS I have created this file.
	 router.post('/getVenue',venue.getVenue);
	 app.use('/venues', router);
    }