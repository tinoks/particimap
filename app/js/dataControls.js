table = function(el){

    if(document.getElementsByTagName("tablebar").length == 1){
    document.getElementsByTagName("tablebar")[0].classList.toggle("show")
    el.classList.toggle("show");
  } else {
    
    require('../tags/tablebar.tag');
    document.getElementById('map').appendChild(document.createElement("tablebar"));
    riot.mount('tablebar');
    Ps.initialize(document.getElementsByTagName("tablebar")[0]);
    document.getElementsByTagName("tablebar")[0].classList.toggle("show");

    el.classList.toggle("show");
  }

}


addData = function(){


  map.addSource('marker', {
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
        'id': 'markerLinjer',
        'type': 'line',
        'source': 'marker',
        'layout': {},
        'paint': {
            'line-color': '#088',
            'line-opacity': 0.8
        }
    }, 'waterway-label');     


    map.addLayer({
        'id': 'markerPolygon',
        'type': 'fill',
        'source': 'marker',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.6
        }
    }, 'markerLinjer');

    map.on('click', 'markerPolygon', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h2>'+e.features[0].properties.EjerNr+'</h2>')
            .addTo(map);
    });


    alasql("DROP TABLE IF EXISTS data; \
    CREATE TABLE data; \
    SELECT * INTO data FROM ?", [KORTxyz.data], function(){
      console.log("OK")
    });
  
  

}

upload = function(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               KORTxyz.data = JSON.parse(xmlhttp.responseText).features.map(function(e) {obj=e.properties; obj["geom"] = e.geometry; return obj});
               addData();
           }
           else if (xmlhttp.status == 400) {
          		iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: 'Error message 400'
				});
           }
           else {
	   			iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: 'something else other than 200 was returned'
				});
           }
        }
    };

    xmlhttp.open("GET", "http://jordbrugsanalyser.dk/geoserver/Jordbrugsanalyser/ows?service=WFS&request=GetFeature&typeName=Jordbrugsanalyser:Marker16&outputFormat=JSON&srsName=EPSG:4326&BBOX=662464.0001278251,6162387.19999875,668147.2001642366,6168940.799998963", true);
    xmlhttp.send();



}