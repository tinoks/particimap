mapboxgl = require('mapbox-gl');
require('../../node_modules/mapbox-gl/dist/mapbox-gl.css');

mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA';
map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/tinoks/cj1mhszqc002a2slpp5701ani', //stylesheet location
    maxZoom: 18,
    attributionControl: false});

map.on('moveend',function(){
    var bbox = map.getBounds()
    localStorage.setItem('bbox',
        [bbox._sw.lng, bbox._sw.lat] +";"+
        [bbox._ne.lng, bbox._ne.lat]
    )
});


var bbox = localStorage.getItem('bbox');
if(bbox){
          bbox =bbox.split(";").map(e=>e.split(",").map(e=>parseFloat(e)))
        }else{
          false
        };
if(!!(bbox)){map.fitBounds(bbox,{linear:true});}

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

  getBearing = function(endLong,endLat){
    start = map.getSource('point')._data.features[0].geometry.coordinates || [0,0];

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



updateGPS = function(crd){
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
  map.easeTo({
    bearing: KORTxyz.settings.followCompas ? crd.heading || getBearing(crd.longitude,crd.latitude) || 0 : 0,
    center: [crd.longitude,crd.latitude]
  })
}



removeGPS = function(){
    map.removeLayer('GPSpoint')
}



addData = function(data){
   if(typeof scriptTag != "undefined"){
        document.body.removeChild(scriptTag)
   }
   scriptTag = document.createElement('script');
     scriptTag.src = "exampleLayer.js";
     scriptTag.async = false;
     document.body.appendChild(scriptTag);
     scriptTag.onload = function(){


  if(!!map.getSource('data')){
    map.removeLayer('dataLineString'); 
    map.removeLayer('dataPolygon'); 
    map.removeSource('data');
  }

  map.addSource('data', {
      type: 'geojson',
      data: {"type": "FeatureCollection","features": data.map(function(obj) {
                returndata = {"type": "Feature", "properties":{}};
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
        'paint': dataConfig.LineString || {
            'line-color':  "#"+((1<<24)*Math.random()|0).toString(16),
            'line-opacity': 0.8
        }
    }, 'waterway-label');


    map.addLayer({
        'id': 'dataPolygon',
        'type': 'fill',
        'source': 'data',
        'layout': {},
        'paint': dataConfig.Polygon || {
            'fill-color':  "#"+((1<<24)*Math.random()|0).toString(16),
            'fill-opacity': 0.6
        }
    }, 'dataLineString');

    map.on('click', 'dataPolygon', function (e) {
        popup = new mapboxgl.Popup({closeButton:false})
            .setLngLat(e.lngLat)
            .setHTML(
              typeof dataConfig.popup != "undefined" ? dataConfig.popup(e.features[0]) : Object.entries(e.features[0].properties).map(e => {return '<b>'+e[0]+'</b> '+e[1]+'<br>'}).join('')
            )
            .addTo(map);
    });
  }
}

// *** TODO *** ///
updateData = function(e){
          var updatedData = {"type": "FeatureCollection","features": e.map(function(obj) {
                  returndata = {properties:{}};
                   Object.keys(obj).map(function(objectKey, index) {
                    if(objectKey != "geom"){ 
                    returndata.properties[objectKey] = obj[objectKey];
                    }else{ 
                    returndata.geometry = obj[objectKey]; 
                    }
                  });
                  return returndata;
                  })
                };
          map.getSource('data').setData(updatedData);
}

addRoute = function(data){
  if(typeof map.getSource('route') != "undefined"){
    map.removeLayer('routeLines');
    map.removeSource('route');
  }

 map.addSource('route', {
      type: 'geojson',
      data: data[0].geometry
    });

 map.addLayer({
      'id': 'routeLines',
      'type': 'line',
      'source': 'route',
      'layout': {},
      'paint': {
          'line-color': '#4286f4',
          'line-opacity': 0.7,
		      'line-width': 5,
      }
  }, 'waterway-label'); 
}

addLuftfoto = function(){
  if(typeof map.getSource('GSTsource') == "undefined"){
    map.addSource(
      "GSTsource",{
        "type": "raster",
        "tiles": [
        "https://a.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://b.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://c.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://d.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://e.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://f.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://g.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://h.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://i.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://j.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://k.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://l.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg",
        "https://m.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg"
        ],
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