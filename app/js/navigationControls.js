
rotation = function(){
	if(!!(map.getPitch)){
		if(map.getPitch() == 0){
		map.easeTo({pitch: 60})
		} else{
		map.easeTo({pitch: 0})
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

gps = function(el){
	console.log(el.classList);
	if(el.classList[0] == "off"){
		el.className = "on";
		addGPS();

		function success(pos) {
		  KORTxyz.GPS = {
		  	lng: pos.coords.longitude,
		  	lat: pos.coords.latitude,
		  	time: pos.timestamp
		  };
		  updateGPS(pos.coords);
		}

		function error(err) {
			iziToast.error({
				icon: 'material-icons',iconText: 'error',
			    message: err.message
			});
			el.className = "off";
		};

		id = navigator.geolocation.watchPosition(success, error,{enableHighAccuracy: true,timeout: 60000, maximumAge: 60000});
	} else {
		navigator.geolocation.clearWatch(id);
		el.className = "off";
		removeGPS();
	}
}

luftfoto = function(el){
	if(el.classList.contains("show")){
		removeLuftfoto();
		el.classList.remove("show");
	}else{
		addLuftfoto();
		el.classList.add("show");
	}
} ;