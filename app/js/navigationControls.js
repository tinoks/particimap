
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
		   type: 'geojson',
		   data: {
		       "type": "FeatureCollection",
		       "features": [{
		           "type": "Feature",
		           "properties": {},
		           "geometry": {
		               "type": "Point",
		               "coordinates": [0,0]
		           }
		       }]
		   }
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


	if(el.classList[0] == "off"){
		el.classList = "on";

			var options = {
			  enableHighAccuracy: true,
			  timeout: 60000,
			  maximumAge: 60000
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


			function getBearing(endLong,endLat){
			  start = map.getSource('point')._data.features[0].geometry.coordinates

			  startLat = start[1] * (Math.PI / 180);
			  startLong = start[0] * (Math.PI / 180);
			  endLat = endLat * (Math.PI / 180);
			  endLong = endLong * (Math.PI / 180);

			  var dLong = endLong - startLong;

			  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
			  if (Math.abs(dLong) > Math.PI){
			    if (dLong > 0.0)
			       dLong = -(2.0 * Math.PI - dLong);
			    else
			       dLong = (2.0 * Math.PI + dLong);
			  }

			  return ((Math.atan2(dLong, dPhi) * (180 / Math.PI)) + 360.0) % 360.0;
			}


			function success(pos) {
			  var crd = pos.coords;
			  map.easeTo({
			  	bearing: KORTxyz.settings.followCompas ? crd.heading || getBearing(crd.longitude,crd.latitude) || 0 : 0,
			  	center: [crd.longitude,crd.latitude]
			  })

			  map.getSource('point').setData({
				       "type": "FeatureCollection",
				       "features": [{
				           "type": "Feature",
				           "properties": {},
				           "geometry": {
				               "type": "Point",
				               "coordinates": [crd.longitude,crd.latitude] 
				           }
				       }]
				});
			}
			function error(err) {
				iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: err.message
				});
				el.classList = "off";
			};

			id = navigator.geolocation.watchPosition(success, error, options);
			
		}
	else {
		map.removeLayer('GPSpoint')
		navigator.geolocation.clearWatch(id);
		el.classList = "off";
	}

}

luftfoto = function(el){
	if(typeof map.getSource('GSTsource') == "undefined"){
		map.addSource(
			"GSTsource",{
				"type": "raster",
				"tiles": ["https://services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg"],
				"tileSize": 256
			}
		);
	}

	if(typeof map.getLayer('GST')  == "undefined"){
	    map.addLayer({
	        'id': 'GST',
	        'type': 'raster',
	        'source': "GSTsource",
			"minzoom": 0,
	        "maxzoom": 19
	    }, 'aeroway-taxiway');
	}
	else{
		map.removeLayer('GST');
	}

}