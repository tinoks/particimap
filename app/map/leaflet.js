
require('leaflet');
require('../../node_modules/leaflet/dist/leaflet.css');

map = L.map('map',{
	preferCanvas:true,
	attributionControl: false, 
	zoomControl:false
}).setView([56.3,10.6], 7);

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

}

updateGPS = function(lng,lat){

}

removeGPS = function(){

}


addData = function(data){

    dataLayer = L.geoJSON({"type": "FeatureCollection","features": data.map(function(obj) {
                returndata = {"type": "Feature", "properties":{}};
                  Object.keys(obj).map(function(objectKey, index) {
                  if(objectKey != "geom"){ returndata.properties[objectKey] = obj[objectKey] }
                else{ returndata.geometry = obj[objectKey]; }
                  });
                return returndata;
              })},{

    }).addTo(map);
}

// *** TODO *** ///
updateData = function(){


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
