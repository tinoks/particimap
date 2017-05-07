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

cloud_open = function(el){

  if(document.getElementsByTagName("cloud_openbar").length == 1){
    document.getElementsByTagName("cloud_openbar")[0].classList.toggle("show")
    el.classList.toggle("show");
  } else {
    
    require('../tags/cloud_openbar.tag');
    document.getElementById('map').appendChild(document.createElement("cloud_openbar"));
    riot.mount('cloud_openbar');
    Ps.initialize(document.getElementsByTagName("cloud_openbar")[0]);
    document.getElementsByTagName("cloud_openbar")[0].classList.toggle("show");

    el.classList.toggle("show");
  }

}



upload = function(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               KORTxyz.data = JSON.parse(xmlhttp.responseText).features.map(function(e) {obj=e.properties; obj["geom"] = e.geometry; return obj});
               KORTxyz.data.update = function(svar,id){
                  
                  
               }
               addData();
              alasql("DROP TABLE IF EXISTS data; \
                      CREATE TABLE data; \
                      SELECT * INTO data FROM ?", [KORTxyz.data], 
                      function(){
                          iziToast.show({
                            icon: 'material-icons',
                            iconText: 'error',
                            message: 'Data added!'
                          });
                      });
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

    xmlhttp.open("GET", "marker.json", true);
    xmlhttp.send();



}


directions = function(){
  var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
             if (xmlhttp.status == 200) {
                 KORTxyz.route = JSON.parse(xmlhttp.responseText);
                 addRoute();
                  iziToast.show({
                    icon: 'material-icons',
                    iconText: 'directions',
                    message: Math.round(KORTxyz.route.trips[0].duration/60/60*100)/100 + ' timer <br>' + 
                             Math.round(KORTxyz.route.trips[0].distance/1000*100)/100 + ' km'

                  });
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

      xmlhttp.open("GET", "route.json", true);
      xmlhttp.send();
}