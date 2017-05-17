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
                    [0, 'red'],
                    [1, 'green']
                ]
            },
    'fill-opacity': 0.6
  },
  popup:  function(f){
    return  '<h2>'+f.properties.kat_navn+'</h2>'+
            '<button onclick="dataConfig.updateData(this)" id="1 '+f.properties.id+'" style="background-color:green;font-family:helvetica;border:0;width:50%;height:32px;">  JA  </button>'+
            '<button onclick="dataConfig.updateData(this)" id="0 '+f.properties.id+'" style="background-color:red;font-family:helvetica;border:0;width:50%;height:32px;">  NEJ  </button>'   
  },
  updateData: function(elem){
    var value = elem.id.split(" ")[0];
    var id = elem.id.split(" ")[1];
	  alasql(["UPDATE data SET svar="+ value +",\
            north="+KORTxyz.GPS.lat+",\
            east="+KORTxyz.GPS.lng+",\
            time="+KORTxyz.GPS.time+",\
            username='"+KORTxyz.user.name+"',\
            sync=1 WHERE id='"+id+"'"]).then(
      alasql("Select * from data",function(e){
        popup.remove();
        updateData(e);
        }
      )
    )
	},
  sync: function(){
    if(dataConfig.sync.running){
      currentData = dataConfig.sync.data.pop();
      console.log(currentData);
      if(currentData != undefined){
        var xhttp = new XMLHttpRequest();
        var postData = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs">'+
        '<wfs:Update typeName="RFV:'+currentData.id.split(".")[0]+'">'+
        '<wfs:Property><wfs:Name>svar</wfs:Name><wfs:Value>'+currentData.svar+'</wfs:Value></wfs:Property>'+
        '<wfs:Property><wfs:Name>username</wfs:Name><wfs:Value>'+currentData.username+'</wfs:Value></wfs:Property>'+
        '<wfs:Property><wfs:Name>north</wfs:Name><wfs:Value>'+currentData.north+'</wfs:Value></wfs:Property>'+
        '<wfs:Property><wfs:Name>east</wfs:Name><wfs:Value>'+currentData.east+'</wfs:Value></wfs:Property>'+
        '<wfs:Property><wfs:Name>time</wfs:Name><wfs:Value>'+currentData.time+'</wfs:Value></wfs:Property>'+
        '<ogc:Filter><ogc:FeatureId fid="'+currentData.id+'"/></ogc:Filter></wfs:Update></wfs:Transaction>';

        xhttp.open("POST", config.server, true, KORTxyz.user.name, KORTxyz.user.pw);
        xhttp.setRequestHeader("Content-type", "text/xml;charset=utf-8");

        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            alasql("UPDATE data SET sync=0 WHERE id=?",currentData.id);
            dataConfig.sync();
          } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.error(xhttp.response);
          }
        }
        xhttp.send(postData);
      }else{
        dataConfig.sync.running = false;
          iziToast.show({
            icon: 'material-icons',
            iconText: 'sync',
            message: 'Alt synkroniseret.'
          });
      }

    } else {
      dataConfig.sync.running = true;
      alasql("SELECT * FROM data WHERE sync=1",function(e){
        dataConfig.sync.data = e;
        dataConfig.sync();
      })
    }
  }
}
  