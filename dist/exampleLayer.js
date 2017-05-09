dataConfig = {
  Polygon: {
    'fill-color': '#088',
    'fill-opacity': 0.6
  },
	LineString:{
    'fill-color': '#088',
    'fill-opacity': 0.6
  },
  Polygon: {
    'fill-color': '#088',
    'fill-opacity': 0.6
  },
  popup:  function(f){
    return  '<h2>'+f.properties.kat_navn+'</h2>'+
            '<button onclick="dataConfig.wfsT(this)" id="JA '+f.properties.id+'" style="background-color:green;font-family:helvetica;border:0;width:50%;height:32px;">  JA  </button>'+
            '<button onclick="dataConfig.wfsT(this)" id="NEJ '+f.properties.id+'" style="background-color:red;font-family:helvetica;border:0;width:50%;height:32px;">  NEJ  </button>'   
  },
  wfsT: function(elem){
    console.log(elem.id.split(" "));
    console.log();
  },
  updateData: function(id,svar){
  alasql("UPDATE data SET svar= ? WHERE gid= ?", [svar, id]);
  KORTxyz.data.filter(e => e.gid==id)[0].svar = svar;
  updatedData = {"type": "FeatureCollection","features": KORTxyz.data.map(function(obj) {
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

}
  

/*
    var xhttp = new XMLHttpRequest(),
      postData = 
      '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs">'+
      '<wfs:Update typeName="RFV:'+zone+'">'+
      '<wfs:Property><wfs:Name>RFV</wfs:Name><wfs:Value>' + RFVvalue + '</wfs:Value></wfs:Property>'+
      '<wfs:Property><wfs:Name>User</wfs:Name><wfs:Value>' + username + '</wfs:Value></wfs:Property>'+
      '<wfs:Property><wfs:Name>Time</wfs:Name><wfs:Value>' + new Date().getTime() + '</wfs:Value></wfs:Property>'+
      '<wfs:Property><wfs:Name>North</wfs:Name><wfs:Value>' + pos[0] + '</wfs:Value></wfs:Property>'+
      '<wfs:Property><wfs:Name>East</wfs:Name><wfs:Value>' + pos[1] + '</wfs:Value></wfs:Property>'+
      '<ogc:Filter><ogc:FeatureId fid="' + id + '"/></ogc:Filter></wfs:Update></wfs:Transaction>';
    xhttp.open("POST", "http://p-rfvweb01.int.addom.dk:8080/geoserver/wfs", true);
    xhttp.setRequestHeader("Content-type", "text/xml;charset=utf-8");
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        event.setStyle({
          fillColor: rfvColor[RFVvalue],
          color: 'grey',
          weight:1
        });
        event.feature.properties.RFV = RFVvalue;
        document.getElementById("countText").innerHTML = marker.toGeoJSON().features.filter(function test(v){return v.properties.RFV == 2;}).length;

      } else if (xhttp.readyState == 4 && xhttp.status != 200) {
        event.setStyle({color: 'red'})
        store.set(id, {id:id,zone:zone,RFVvalue:RFVvalue,username:username,time:new Date().getTime(),pos0:pos[0],pos1:pos[1]})

      }
    }
    xhttp.send(postData);
    */
