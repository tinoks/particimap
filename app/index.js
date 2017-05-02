window.riot = riot;
window.KORTxyz = {
	settings: {
		followCompas:false
	}
};

window.Ps = require('perfect-scrollbar');
require('./css/perfect-scrollbar.css');
Ps.initialize(document.getElementById('top'));

window.iziToast = require('izitoast');
require('../node_modules/izitoast/dist/css/iziToast.css');


 // SPECIAL RULES FOR MOBILE! 

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

if (detectWebGL()){ require('./map/mapbox.js'); }
else{  require('./map/leaflet.js'); }




alasql = require('alasql');

alasql("CREATE INDEXEDDB DATABASE IF NOT EXISTS KORTxyz; \
        ATTACH INDEXEDDB DATABASE KORTxyz; \
        USE KORTxyz;", function(e){
          alasql(['SELECT * FROM data;'])
                .then(function(res){
                     KORTxyz.data = res[0];
                     addData()
                }).catch(function(err){
                     console.log('Does the file exist? There was an error:', err);
                });
        });