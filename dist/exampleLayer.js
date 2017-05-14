dataConfig = {
  Point: {
    'color': '#088',
    'opacity': 0.6
  },
	LineString:{
      'line-color': 'grey',
      'line-opacity': 0.8,
      'line-width': 2
  },
  Polygon: {
    'fill-color': {
                "property": "svar",
                "type": "categorical",
                "default": "lightgrey",
                "stops": [
                    ['JA', 'green'],
                    ['NEJ', 'red']
                    ]
            },
    'fill-opacity': 0.6
  },
  popup:  function(f){
    return  '<h2>'+f.properties.AfgNavn+'</h2>'+
            '<button onclick="dataConfig.wfsT(this)" id="JA '+f.properties.EjerNr+'" style="background-color:green;font-family:helvetica;border:0;width:50%;height:32px;">  JA  </button>'+
            '<button onclick="dataConfig.wfsT(this)" id="NEJ '+f.properties.EjerNr+'" style="background-color:red;font-family:helvetica;border:0;width:50%;height:32px;">  NEJ  </button>'   
  },
  wfsT: function(elem){
    
    dataConfig.updateData(elem.id.split(" ")[0],elem.id.split(" ")[1])
  },
  updateData: function(value,id){
	  alasql(["UPDATE data SET svar='"+ value +"' WHERE EjerNr= "+id]).then(
      alasql("Select * from data",function(e){
        updateData(e);
        popup.remove();
        }
      )
    )
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
