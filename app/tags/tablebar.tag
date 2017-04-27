<tablebar>

  <!-- layout -->

 <rtable 
     id="tab" 
     filter="column: gender, value: female"
     styles="tableClass:table table-hover table-condensed, colHeaderClass:header, sortUpClass:glyphicon glyphicon-arrow-up white, sortDownClass:glyphicon glyphicon-arrow-down white"
     >
 </rtable>
  

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
  #table-tab1 .col-id {background-color:#A4A4A4}

  </style>

  <!-- logic -->
  <script>
  require('./rtable.js')
    
  var rtable = riot.mount('rtable#tab', {data: [
  { "id": 1, "name": "Fay May", "age": 24, "card": "red", "gender": "female", "email": "faymay@enersave.com", "credit": 3429.92},
  { "id": 11,"name": "Estelle Palmer", "age": 24, "card": "green", "gender": "female", "email": "estellepalmer@enersave.com", "credit": 825.87 },
  { "id": 21, "name": "Lacy Holt", "age": 21,"card": "blue", "gender": "female","email": "lacyholt@enersave.com","credit": 3956.81},
  { "id": 31, "name": "Antoinette Grant", "age": 49, "card": "blue", "gender": "female", "email": "antoinettegrant@enersave.com", "credit": 1849.77},
  { "id": 41, "name": "Sherri Franco", "age": 54, "card": "red", "gender": "female", "email": "sherrifranco@enersave.com", "credit": 3495.8},
  { "id": 51, "name": "Bell Patterson", "age": 25, "card": "blue", "gender": "male", "email": "bellpatterson@enersave.com", "credit": 386.41},
  { "id": 61, "name": "Chris Holder", "age": 53, "card": "green", "gender": "female", "email": "chrisholder@enersave.com","credit": 3131.99},
  { "id": 71, "name": "Beasley Shaw", "age": 30, "card": "red", "gender": "male", "email": "beasleyshaw@enersave.com", "credit": 1986.29  },
  { "id": 81, "name": "Lesley Shelton", "age": 51, "card": "green", "gender": "female", "email": "lesleyshelton@enersave.com", "credit": -220.54},
  { "id": 91, "name": "Mccall Santos", "age": 26, "card": "blue", "gender": "male", "email": "mccallsantos@enersave.com", "credit": 3846.88},
  { "id": 101, "name": "Hardy Weaver", "age": 55, "card": "blue", "gender": "male", "email": "hardyweaver@enersave.com", "credit": 2414.67},
  { "id": 111, "name": "Kerry Douglas", "age": 59, "card": "blue", "gender": "female", "email": "kerrydouglas@enersave.com", "credit": 3559.74},
  { "id": 121, "name": "Ella Wallace", "age": 40, "card": "red", "gender": "female", "email": "ellawallace@enersave.com", "credit": -946.34},
  { "id": 131, "name": "Knox Wooten", "age": 20, "card": "green", "gender": "male", "email": "knoxwooten@enersave.com","credit": 3095.09},
  { "id": 141, "name": "Kellie Mccullough", "age": 57, "card": "green", "gender": "female", "email": "kelliemccullough@enersave.com", "credit": -120.03},
  { "id": 151, "name": "Lorrie Harding", "age": 49, "card": "green", "gender": "female", "email": "lorrieharding@enersave.com", "credit": 2241.86},
  { "id": 161, "name": "Nannie Woodward", "age": 32, "card": "green", "gender": "female", "email": "nanniewoodward@enersave.com", "credit": 353.26},
  { "id": 171, "name": "Tyler Mccoy", "age": 48, "card": "blue", "gender": "male", "email": "tylermccoy@enersave.com","credit": -371.47},
  { "id": 181, "name": "Herminia Roach", "age": 57, "card": "red", "gender": "female","email": "herminiaroach@enersave.com","credit": 577.87},
  { "id": 191, "name": "Salinas Graham", "age": 41, "card": "blue", "gender": "male","email": "salinasgraham@enersave.com","credit": 1711.81}
]});

  </script>

</tablebar>