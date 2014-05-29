temboo-geocode
==============

Prerequisites
   * [Temboo Node.js SDK][https://www.temboo.com/sdk/nodejs]
   * npm install connect
   * npm install brackets


The following URL will give you the JSON payload for the default address
http://hostname.domain.com/

The following URL will give you the payload for the address specified (most browsers will automatically encode spaces, etc.)
  http://hostname.domain.com/?address=1600 Pennsylvania Ave., Washinton DC

The following URL will give you an empty list (It'll still return an HTTP ststaus 200 because I'm lazy)
  http://hostname.domain.com/?address=

The following URL will return the brackets IDE
  http://hostname.domain.com/brackets/
