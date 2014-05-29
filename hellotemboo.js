// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("ACCOUNT_NAME", "APP_NAME", "APP_KEY");

var Google = require("temboo/Library/Google/Geocoding");

var geocodeByAddressChoreo = new Google.GeocodeByAddress(session);

// Instantiate and populate the input set for the choreo
var geocodeByAddressInputs = geocodeByAddressChoreo.newInputSet();

//var addrString = "104 Franklin St., New York NY 10013";
var connect     = require('connect');
var brackets    = require('brackets');

function getGeocodeByAddress(addrString, callback) {

    var addr = addrString;
    
    if(typeof addrString === "undefined"){
        addr = "104 Franklin St., New York NY 10013";
    }
    
    // Set inputs
    geocodeByAddressInputs.set_Address(addr);
    geocodeByAddressInputs.set_ResponseFormat("json");
    
    // Run the choreo, specifying success and error callback handlers
    geocodeByAddressChoreo.execute(geocodeByAddressInputs, callback, geocodeFail);
    
}

function geocodeSuccess(results) {
    console.log(results.get_Response());
    return results.get_Response();
}

function geocodeFail(error) {
    console.log(error.type); 
    console.log(error.message);
}

connect()
        .use('/brackets', brackets())
        .use(connect.favicon('public/favicon.ico'))
        .use(connect.query())
        .use(function (req, res) {
            var callback = function(result) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(result.get_Response());
            }
            
            if(req.query.address === "undefined"){
                req.query = {};
            }
 
            getGeocodeByAddress(JSON.stringify(req.query.address), callback);

        })
        .listen(process.env.PORT);
