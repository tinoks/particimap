<cloud_openbar>

  <!-- layout -->

<div each={ KORTxyz.sources} class="card" id={name} onclick="fetchData(this.id,'&propertyName=kat_navn,svar,sync,geom')">
  <div class="container">
    <h4><b>{title}</b></h4> 
    <p>{abstract}</p> 
  </div>
</div>

  <!-- logic -->
  <script>
    fetchData = function(name,limits){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if (xmlhttp.status == 200) {
                   KORTxyz.data = JSON.parse(xmlhttp.responseText).features.map(function(e) {obj=e.properties; obj["id"] = e.id; obj["geom"] = e.geometry; return obj});
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

        xmlhttp.open("GET", 
          config.server+
          "service=WFS&version=1.0.0&request=GetFeature&typeName="+name+
          "&maxFeatures=2000&outputFormat=application%2Fjson&srsName=EPSG:4326"+
           limits,
           true, KORTxyz.user.name,KORTxyz.user.pw);
        xmlhttp.send();
    }
  </script>


  <!-- style -->
<style>

cloud_openbar{
  position: absolute;
  z-index: 10;
  margin: 0 0 0 20; 
  height: calc(100% - 40px);
  height: -moz-calc(100% - 40px);
  height: -webkit-calc(100% - 40px);
  width:260px;
  padding:20px;
  background: white;
  right:-300px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 0px 0px grey; 
}
cloud_openbar.show {
    right:0;
    box-shadow: 0px 0px 12px grey; 
  }

.card {
    box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.2);
    transition: 0.5s;
    width: 100%;
    cursor: pointer;
}

.card:hover {
    box-shadow: 6px 6px 22px 0 rgba(0,0,0,0.2);
}

.container {
    padding: 2px 16px;
    margin-bottom:10px;
}

  </style>


</cloud_openbar>