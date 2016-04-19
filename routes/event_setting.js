var express       = require('express');
var router        = express.Router();
var Event_setting = require('../controller/eventSettingCtrl.js');

function supportCrossOriginScript(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
}

/* Web services for Event Setting Module
 * Created : 2016-04-19 6 PM
/* GET users listing. */


/* Module : Venue Management
 * Service : Add Venue to Seller
 * */
router.post('/addVenue', supportCrossOriginScript, Event_setting.addVenue);

/* Service : Venue Overview to Seller
 * */
router.get('/venueOverview', supportCrossOriginScript, Event_setting.venueOverview);



module.exports = router;
