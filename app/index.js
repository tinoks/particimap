window.Ps = require('perfect-scrollbar');
require('./css/perfect-scrollbar.css');



Ps.initialize(document.getElementById('top'));
	
	
  if('ontouchstart' in document.documentElement) {
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

fullscreen = function(el){
	innerText = el.children[0].innerText;
	
	if(innerText == "fullscreen"){
		var i = document.body;

		// go full-screen
		if (i.requestFullscreen) {
			i.requestFullscreen();
		} else if (i.webkitRequestFullscreen) {
			i.webkitRequestFullscreen();
		} else if (i.mozRequestFullScreen) {
			i.mozRequestFullScreen();
		} else if (i.msRequestFullscreen) {
			i.msRequestFullscreen();
		}
		
		el.children[0].innerText = "fullscreen_exit"
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		el.children[0].innerText = "fullscreen"
	}

}

rotation = function(){
	if(map.getPitch() == 0){
	map.easeTo({pitch: 60})
	} else{
	map.easeTo({pitch: 0})
	}
}


mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 9,
	attributionControl: false})
    .addControl(new mapboxgl.AttributionControl({
        compact: true
    }));;