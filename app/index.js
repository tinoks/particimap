
window.Ps = require('perfect-scrollbar');
require('./css/perfect-scrollbar.css');

settings = function(){
	if(document.getElementsByTagName("sidebar").length == 1){
		document.getElementsByTagName("sidebar")[0].classList.toggle("active")
	} else {
		require('./tags/sidebar.tag');
		document.getElementById('map').appendChild(document.createElement("sidebar"))
		riot.mount('sidebar',{ title: 'My TODO app', items: [ 'A','B','C' ] })
		Ps.initialize(document.getElementsByTagName("sidebar")[0]);
		document.getElementsByTagName("sidebar")[0].classList.toggle("active")
	}
}

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

rotation = function(){
	if(map.getPitch() == 0){
	map.easeTo({pitch: 60})
	} else{
	map.easeTo({pitch: 0})
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

gps = function(el){
	if(map.getSource('point') == undefined) {
		map.addSource('point', {
		        "type": "geojson",
		        "data": {"type": "Point","coordinates": [0, 0]}
		    });

  if(!('ontouchstart' in document.documentElement)) {

			var framesPerSecond = 15; 
			var initialOpacity = 1
			var opacity = initialOpacity;
			var initialRadius = 8;
			var radius = initialRadius;
			var maxRadius = 18;

		    function animateMarker() {
		        setTimeout(function(){
		            requestAnimationFrame(animateMarker);

		            radius += (maxRadius - radius) / framesPerSecond;
		            opacity -= ( 1 / framesPerSecond );
		            if (opacity <= 0) {
		                radius = initialRadius;
		                opacity = initialOpacity;
		            }
		            if(map.getLayer('GPSpoint') != undefined){
			            map.setPaintProperty('GPSpoint', 'circle-radius', radius);
			            map.setPaintProperty('GPSpoint', 'circle-opacity', opacity);
		            }

		        }, 1000 / framesPerSecond);
		    }
		    animateMarker()
		  }
	}


	if(el.classList.value == "off"){
			var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};




		    map.addLayer({
		        "id": "GPSpoint",
		        "source": "point",
		        "type": "circle",
		        "paint": {
		            "circle-radius": 8,
		            "circle-radius-transition": {duration: 0},
		            "circle-opacity-transition": {duration: 0},
		            "circle-color": "#d11d1d"
		        }
		    });	



			function success(pos) {
			  var crd = pos.coords;
			  el.classList.value = "on";
			  map.getSource('point').setData({"type": "Point","coordinates": [crd.longitude,crd.latitude]});
			  map.easeTo({
			  	bearing: crd.heading || 0,
			  	center: [crd.longitude,crd.latitude]
			  })
			};

			function error(err) {
			  alert('ERROR('+err.code+' '+ err.message+')');
			};

			id = navigator.geolocation.watchPosition(success, error, options);
			
		}
	else {
		map.removeLayer('GPSpoint')
		navigator.geolocation.clearWatch(id);
		el.classList.value = "off";
	}

}


mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [10.6, 56.3], // starting position
    zoom: 7,
	attributionControl: false})
    .addControl(new mapboxgl.AttributionControl({
        compact: true
    }));

document.getElementsByClassName("mapboxgl-control-container")[0].remove()
