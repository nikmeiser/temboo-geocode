// You'll need a single TembooSession object in your code, eg:
 var tsession = require("temboo/core/temboosession");
 var session = new tsession.TembooSession("ACCOUNT_NAME", "APP_NAME", "APP_KEY");

var Google = require("temboo/Library/Google/Geocoding");

var geocodeByAddressChoreo = new Google.GeocodeByAddress(session);

// Instantiate and populate the input set for the choreo
var geocodeByAddressInputs = geocodeByAddressChoreo.newInputSet();

// Set inputs
geocodeByAddressInputs.set_Address("104 Franklin St., New York NY 10013");

// Run the choreo, specifying success and error callback handlers
geocodeByAddressChoreo.execute(
    geocodeByAddressInputs,
    function(results) {
        console.log(results.get_Longitude());
        console.log(results.get_Latitude());
        console.log(results.get_Response());
    },
    function(error) {
        console.log(error.type); 
        console.log(error.message);
    }
);