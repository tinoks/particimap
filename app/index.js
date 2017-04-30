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


mapboxgl = require('mapbox-gl');
require('../node_modules/mapbox-gl/dist/mapbox-gl.css');

mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [10.6, 56.3], // starting position
    zoom: 7,
    maxZoom: 19,
	attributionControl: false});

document.getElementsByClassName("mapboxgl-control-container")[0].remove()

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


