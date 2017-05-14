table = function(el){

  if(document.getElementsByTagName("tablebar").length == 1){
    document.getElementsByTagName("tablebar")[0].classList.toggle("show")
    el.classList.toggle("show");
    setTimeout(function(){
      document.getElementById('map').removeChild(document.getElementsByTagName("tablebar")[0])
    },300)
  } else {
    require('../tags/tablebar.tag');
    document.getElementById('map').appendChild(document.createElement("tablebar"));
    el.classList.toggle("show");
    alasql(["select * from data"]).then(
      function(res){
        var data = res[0].map(
          function(obj) {
            temp = {};
              Object.keys(obj).map(function(objectKey, index) {
                if(objectKey != "geom"){ temp[objectKey] = obj[objectKey] }
              });
            return temp;
        });
        riot.mount('tablebar',{data:data});
        Ps.initialize(document.getElementsByTagName("tablebar")[0]);
      }
    )
  }
}



cloud_open = function(el){
  if(document.getElementsByTagName("cloud_openbar").length == 1){
    document.getElementsByTagName("cloud_openbar")[0].classList.toggle("show")
    el.classList.toggle("show");
    setTimeout(function(){
      document.getElementById('map').removeChild(document.getElementsByTagName("cloud_openbar")[0])
    },300)
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
               var response = JSON.parse(xmlhttp.responseText).features.map(function(e) {obj=e.properties; obj["geom"] = e.geometry; return obj});
               addData(response);
              alasql("DROP TABLE IF EXISTS data; \
                      CREATE TABLE data; \
                      SELECT * INTO data FROM ?", [response], 
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
                 response = JSON.parse(xmlhttp.responseText).trips;
                 addRoute(response);

                 alasql("DROP TABLE IF EXISTS route; \
                    CREATE TABLE route; \
                    SELECT * INTO route FROM ?", [response],
                    function(){
                      iziToast.show({
                        icon: 'material-icons',
                        iconText: 'directions',
                        message: Math.round(response[0].duration/60/60*100)/100 + ' timer <br>' + 
                                 Math.round(response[0].distance/1000*100)/100 + ' km'
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
      var getCentroid2 = function (arr) {
          var twoTimesSignedArea = 0;
          var cxTimes6SignedArea = 0;
          var cyTimes6SignedArea = 0;

          var length = arr.length

          var x = function (i) { return arr[i % length][0] };
          var y = function (i) { return arr[i % length][1] };

          for ( var i = 0; i < arr.length; i++) {
              var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
              twoTimesSignedArea += twoSA;
              cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
              cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
          }
          var sixSignedArea = 3 * twoTimesSignedArea;
          return [ Math.round(cxTimes6SignedArea / sixSignedArea * 10000)/10000, Math.round(cyTimes6SignedArea / sixSignedArea * 10000)/10000];       
      }
      alasql("SELECT geom FROM data;",function(data){
        var coordinates = data.map(function(obj){
            return getCentroid2(obj.geom.coordinates[0][0])[0] +","+ getCentroid2(obj.geom.coordinates[0][0])[1];
        })
        console.log(coordinates);
        xmlhttp.open("GET", "http://80.241.215.222:5000/trip/v1/driving/"+coordinates.join(";")+"?geometries=geojson&steps=false&overview=full", true);
        xmlhttp.send();
        iziToast.show({
          icon: 'material-icons',
          iconText: 'directions',
          message: 'Ruteberegning imellem '+ coordinates.length +' punkter er kaldt'
        });
      })


}