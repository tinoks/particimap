
require('leaflet');
require('../../node_modules/leaflet/dist/leaflet.css');


map = L.map('map',{
	preferCanvas:true,
	attributionControl: false, 
	zoomControl:false
});


var bbox = localStorage.getItem('bbox');
if(bbox){
          bbox =bbox.split(";").map(e=>e.split(",").reverse().map(e=>parseFloat(e)))
        }else{
          false
        };
if(!!(bbox)){map.fitBounds(bbox,{linear:true});}
else{map.setView([56.3,10.6], 7);}


map.on('moveend',function(){
    bbox = map.getBounds();
    localStorage.setItem('bbox',
        [bbox._southWest.lng,bbox._southWest.lat] + ";" + 
		[bbox._northEast.lng,bbox._northEast.lat]
    )
});

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

basemap = L.tileLayer('https://api.mapbox.com/styles/v1/tinoks/cj23f64ly007t2sqrue8w3wpc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA', {
	maxZoom: 18
}).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/tinoks/cj23f8dyn007v2sqr576t3vlo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGlub2tzIiwiYSI6Ikp4OE0yWjQifQ.8ShzvCuk6zpjf9n_1pS_fA',{
	pane: 'labels'
}).addTo(map);


addGPS = function(){
	GPSpoint = L.circle([0,0], {radius: 200}).addTo(map);
	GPSpoint.setStyle({color:'red',fillColor:'red'})

}

updateGPS = function(crd){
	GPSpoint.setRadius(crd.accuracy);
    GPSpoint.setLatLng([crd.latitude,crd.longitude]);
    map.panTo([crd.latitude,crd.longitude]);
}

removeGPS = function(){
    map.removeLayer(GPSpoint);

}


addData = function(data){
	// Removes Layer if exists;

	// Load Configuration Data		
   if(typeof scriptTag != "undefined"){
        document.body.removeChild(scriptTag)
   }
   scriptTag = document.createElement('script');
   scriptTag.src = "exampleLayer.js";
   scriptTag.async = false;
   document.body.appendChild(scriptTag);
   scriptTag.onload = function(){
		if(typeof dataLayer != "undefined"){map.removeLayer(dataLayer)}

   		// DATA
		dataLayer = L.geoJSON({"type": "FeatureCollection","features": data.map(function(obj) {
		            returndata = {"type": "Feature", "properties":{}};
		              Object.keys(obj).map(function(objectKey, index) {
		              if(objectKey != "geom"){ returndata.properties[objectKey] = obj[objectKey] }
		            else{ returndata.geometry = obj[objectKey]; }
		              });
		            return returndata;
		          })}).addTo(map);

		// STYLE
		if(typeof dataConfig.Polygon != "undefined"){
			dataLayer.setStyle({
				fillOpacity: dataConfig.Polygon["fill-opacity"] || 0.6,

				color: dataConfig.LineString["line-color"] || "#"+((1<<24)*Math.random()|0).toString(16),
				opacity: dataConfig.LineString["line-opacity"] || 0.8,
     			weight: dataConfig.LineString["line-width"] || 2
			})

			if(typeof dataConfig.Polygon["fill-color"] != "object"){
				dataLayer.setStyle({
					fillOpacity: dataConfig.Polygon["fill-color"] || "#"+((1<<24)*Math.random()|0).toString(16)
				})
			}else{
				function style(feature){
					var config = dataConfig.Polygon["fill-color"];
					var prop = config.property;
					var match = config.stops.filter(e => e[0] == feature.properties[prop])[0];
					return {
					  fillColor: typeof match != "undefined" ? match[1] : config.default
					}
				}
				dataLayer.setStyle(style)
			}

		}

		//POPUP
		dataLayer.on("click",function(e){
		   popup = L.popup()
		    .setLatLng(e.latlng)
		    .setContent(dataConfig.popup(e.layer.feature))
		    .openOn(map);
		    popup.feature = e;

		})
   }
}

// *** TODO *** ///
updateData = function(e){
	addData(e);
}

addRoute = function(data){
	if(typeof route != "undefined"){map.removeLayer(route);}
    route = L.geoJSON(data[0].geometry).addTo(map);
}

addLuftfoto = function(){
	ortofoto = L.tileLayer('https://{s}.services.kortforsyningen.dk/orto_foraar_webm?login=StatForvaltIT&password=180laksp&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=orto_foraar&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg', {
			maxZoom: 18
		}).addTo(map);
	map.removeLayer(basemap);
}


removeLuftfoto = function(){
	map.removeLayer(ortofoto);
	basemap.addTo(map);
}


blink = function(data){
	console.log(data)
        map.fitBounds(L.geoJSON(data).getBounds(),{
          padding: [20,20]
        });

}