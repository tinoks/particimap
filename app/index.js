riot = riot;
KORTxyz = {
	settings: {
		followCompas: JSON.parse(localStorage.getItem('followCompas')),
    useWebGL: JSON.parse(localStorage.getItem('useWebGL')) == null ? true : JSON.parse(localStorage.getItem('useWebGL'))
	},
  user:{
    name: localStorage.getItem('name'),
    pw: localStorage.getItem('pw')
  }
};

Ps = require('perfect-scrollbar');
require('./css/perfect-scrollbar.css');
Ps.initialize(document.getElementById('top'));

iziToast = require('izitoast');
require('../node_modules/izitoast/dist/css/iziToast.css');


 // SPECIAL RULES FOR MOBILE. Fix buttonclicks! 

  if('ontouchstart' in document.documentElement) {

  	window.onerror = function(msg, url, linenumber) {
		iziToast.error({
			icon: 'material-icons',
			iconText: 'error',
		    message: 'Error message: '+msg+' <br> URL: '+url+' <br> Line Number: '+linenumber
		});

	    return true;
	}
	
    // Loop through each stylesheet
    for(var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
      var sheet = document.styleSheets[sheetI];
      // Verify if cssRules exists in sheet
      if(sheet.cssRules) {
        // Loop through each rule in sheet
        for(var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
          var rule = sheet.cssRules[ruleI];
          // Verify rule has selector text
          if(rule.selectorText) {
            // Replace hover psuedo-class with active psuedo-class
            rule.selectorText = rule.selectorText.replace(":hover", ":active");
          }
        }
      }
    }
  }


require('./js/navigationControls.js');
require('./js/dataControls.js');
require('./js/bottomControls.js');


   


// Detect to use Leaflet or Mapbox based on webGL support (CITRIX)
detectWebGL = function(){
  var test_canvas = document.createElement('canvas');
  var gl = null;

  try {gl = test_canvas.getContext('webgl')}
  catch(err) {gl = null}

  if(!gl){
    try { gl = text_canvas.getContext('experimental-webgl') }
    catch(err) { gl = null }
  }

  //return false
  return gl ? true : false
}


if(JSON.parse(KORTxyz.settings.useWebGL) && detectWebGL()){
  require('./map/mapbox.js'); 
}else{
  require('./map/leaflet.js'); 
}


alasql = require('alasql');

alasql("CREATE INDEXEDDB DATABASE IF NOT EXISTS KORTxyz; \
        ATTACH INDEXEDDB DATABASE KORTxyz; \
        USE KORTxyz; \
        CREATE TABLE IF NOT EXISTS data; \
        SELECT * FROM data; \
        CREATE TABLE IF NOT EXISTS route; \
        SELECT * FROM route;\
        CREATE TABLE IF NOT EXISTS sources; \
        SELECT * FROM sources;", function(e){
          KORTxyz.data = e[4];
          addData();
          KORTxyz.route = e[6];
          addRoute();
          KORTxyz.sources = e[8];
        });