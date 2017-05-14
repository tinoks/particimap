<tablebar>

  <!-- layout -->

<table style="width:100%">
  <thead>
    <tr>
      <th each="{ name, i in opts.data[0] }" onclick={ reorder }>{ i }</th> 
    </tr>
  </thead>
  <tbody>
    <tr each={ elem, i in opts.data } onclick="alert('test')">
      <td  no-reorder each={ d, val in elem} >{ elem[val] }</td>
    </tr>
  </tbody>
</table>

  <!-- style -->
  <style>

    tablebar{
      position: absolute;
      z-index: 1000;
      margin: 0 0 0 20; 
      height: 100%;
      width:300px;
      padding:0px;
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
      border: 1px solid grey;
      border-collapse: collapse;
      font-size: 10px;
    }

    tbody tr:hover {
      background-color: lightgrey;
    }

    th{
      letter-spacing: 1;
      cursor: pointer;
    }
  </style>

  <!-- logic -->
  <script>
  this.on('mount',function(){
    setTimeout(function(){
     document.getElementsByTagName("tablebar")[0].classList.toggle("show");
    },1)
   });

   reorder(e) {
      opts.data.sort(function (a, b) {
        return a[e.item.i] - b[e.item.i];
      });
    }

  </script>

</tablebar>