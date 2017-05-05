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

addData = function(){

  if(!!map.getSource('data')){
    map.removeLayer('dataLines'); 
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

    map.addLayer({
        'id': 'dataLines',
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
    }, 'dataLines');

    map.on('click', 'dataPolygon', function (e) {
        new mapboxgl.Popup({closeButton:false})
            .setLngLat(e.lngLat)
            .setHTML(
              '<h2>'+e.features[0].properties.AfgKat+'</h2>'+
              '<button onclick="console.log('+e.features[0].properties.MarkNr+')" style="background-color:green;font-family:helvetica;border:0;width:50%;height:32px;">  JA  </button>'+
              '<button onclick="console.log('+e.features[0].properties.MarkNr+')" style="background-color:red;font-family:helvetica;border:0;width:50%;height:32px;">  NEJ  </button>'
            )
            .addTo(map);
    });


    alasql("DROP TABLE IF EXISTS data; \
    CREATE TABLE data; \
    SELECT * INTO data FROM ?", [KORTxyz.data], function(){
      console.log("OK")
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