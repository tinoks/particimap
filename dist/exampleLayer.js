dataConfig = {
	LineString:{
            'fill-color': '#088',
            'fill-opacity': 0.6
    },
    Polygon: {
            'fill-color': '#088',
            'fill-opacity': 0.6
    }
	popup: '<h2>'+e.features[0].properties.AfgKat+'</h2>'+
           '<button onclick="console.log('+e.features[0].properties.MarkNr+')" style="background-color:green;font-family:helvetica;border:0;width:50%;height:32px;">  JA  </button>'+
           '<button onclick="console.log('+e.features[0].properties.MarkNr+')" style="background-color:red;font-family:helvetica;border:0;width:50%;height:32px;">  NEJ  </button>'
}