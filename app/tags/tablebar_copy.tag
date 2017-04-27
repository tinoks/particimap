<tablebar>

  <!-- layout -->

<table style="width:100%">
  <thead>
  <tr>
    <th  each="{ name, i in KORTxyz.tabledata[0] }" onclick={ reorder }>{ i }</th> 
  </tr>
  </thead>
  <tr each="{ item in KORTxyz.tabledata }">
    <virtual each="{ name, value in item }">
    <td>{name}</td>
    <td>{value}</td>
    <td>{Ha}</td>
    <virtual>
  </tr>
</table>

  <!-- style -->
  <style>

    tablebar{
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
    
    tablebar.show {
      right:0;
      box-shadow: 0px 0px 12px grey; 
    }
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 15px;
}

  </style>

  <!-- logic -->
  <script>

 reorder(e) {
      // riot will render the <bar> component
      // replacing <foo>
      console.log(e.item.i)

      KORTxyz.tabledata.sort(function (a, b) {
        return a[e.item.i] - b[e.item.i];
      });
    }

  </script>

</tablebar>