mapboxgl = require('mapbox-gl');
require('../../node_modules/mapbox-gl/dist/mapbox-gl.css');

mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/tinoks/cj1mhszqc002a2slpp5701ani', //stylesheet location
    center: [10.6, 56.3], // starting position
    zoom: 7,
    maxZoom: 18,
    attributionControl: false});

//document.getElementsByClassName("mapboxgl-control-container")[0].remove()

map.addControl(new mapboxgl.ScaleControl(),'bottom-right');
document.getElementsByClassName('mapboxgl-ctrl-scale')[0].style["border-color"] = "#4f4d56"

addGPS = function(){
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
    if(!('ontouchstart' in document.documentElement) && typeof animateMarker) {
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


}

updateGPS = function(lng,lat){
  map.getSource('point').setData({
       "type": "FeatureCollection",
       "features": [{
           "type": "Feature",
           "properties": {},
           "geometry": {
               "type": "Point",
               "coordinates": [lng,lat] 
           }
       }]
  });
  map.easeTo({
    bearing: KORTxyz.settings.followCompas ? crd.heading || getBearing(crd.longitude,crd.latitude) || 0 : 0,
    center: [lng,lat]
  })
}

removeGPS = function(){
    map.removeLayer('GPSpoint')
}


addData = function(){
  if(!!map.getSource('data')){
    map.removeLayer('dataLineString'); 
    map.removeLayer('dataPolygon'); 
    map.removeSource('data');
  }


  map.addSource('data', {
      type: 'geojson',
      data: {"type": "FeatureCollection","features": KORTxyz.data.map(function(obj) {
                returndata = {properties:{}};
                  Object.keys(obj).map(function(objectKey, index) {
                  if(objectKey != "geom"){ returndata.properties[objectKey] = obj[objectKey] }
                else{ returndata.geometry = obj[objectKey]; }
                  });
                return returndata;
              })
            }
    });
/*
    map.addLayer({
        "id": "dataPoint",
        "source": "data",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });
*/
    map.addLayer({
        'id': 'dataLineString',
        'type': 'line',
        'source': 'data',
        'layout': {},
        'paint': {
            'line-color': '#088',
            'line-opacity': 0.8
        }
    }, 'waterway-label');


    map.addLayer({
        'id': 'dataPolygon',
        'type': 'fill',
        'source': 'data',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.6
        }
    }, 'dataLineString');

    map.on('click', 'dataPolygon', function (e) {
        console.log(e.features[0].properties)
        new mapboxgl.Popup({closeButton:false})
            .setLngLat(e.lngLat)
            .setHTML(
              typeof dataConfig != "undefined" ? dataConfig.popup : Object.entries(e.features[0].properties).map(e => {return '<b>'+e[0]+'</b> '+e[1]+'<br>'}).join('')
            )
            .addTo(map);
    });

}


addRoute = function(data){
 map.addSource('route', {
      type: 'geojson',
      data: KORTxyz.route.trips[0].geometry
    });

   map.addLayer({
        'id': 'routeLines',
        'type': 'line',
        'source': 'route',
        'layout': {},
        'paint': {
            'line-color': 'blue',
            'line-opacity': 0.5,
			'line-width': 5,
        }
    }, 'waterway-label'); 
}

addLuftfoto = function(){
  if(typeof map.getSource('GSTsource') == "undefined"){
    map.addSource(
      "GSTsource",{
        "type": "raster",
        "tiles": ["https://services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg"],
        "tileSize": 256
      }
    );
  }

  map.addLayer({
          'id': 'GST',
          'type': 'raster',
          'source': "GSTsource",
      "minzoom": 0,
          "maxzoom": 19
      }, 'aeroway-taxiway');
}


removeLuftfoto = function(){
    map.removeLayer('GST');
}