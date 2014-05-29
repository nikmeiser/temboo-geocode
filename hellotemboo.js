// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
 //var session = new tsession.TembooSession("ACCOUNT_NAME", "APP_NAME", "APP_KEY");
var session = new tsession.TembooSession("nikmeiser", "myFirstApp", "8532f0f8eaaf4e829e7a1c9b4f786cbd");

var Google = require("temboo/Library/Google/Geocoding");

var geocodeByAddressChoreo = new Google.GeocodeByAddress(session);

// Instantiate and populate the input set for the choreo
var geocodeByAddressInputs = geocodeByAddressChoreo.newInputSet();

var addrString = "104 Franklin St., New York NY 10013";
var connect     = require('connect');
var brackets    = require('brackets');

function getGeocodeByAddress(addrString, callback) {
    // Set inputs
    geocodeByAddressInputs.set_Address(addrString);
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
        .use(function (req, res) {
            var callback = function(result) {
                res.writeHead(200, {
                    'Content-Type' : 'application/json'
                });
                res.end(result.get_Response());
            }
            getGeocodeByAddress(addrString, callback);
        })
        .listen(process.env.PORT);
