<helpbar>

  <!-- layout -->
  <div each={ data } id="container">
    <i class="material-icons" style="padding-right:10">{icon}</i><h4>{text}</h4>
  </div>
    
  <!-- logic -->
  <script>
  this.data =[
    {icon:"3d_rotation",
     text:"Vider kameravinklen så kortet ses strå"},

    {icon:"fullscreen",
     text:"Sætter kortet i fuldskærm"},

    {icon:"gps_fixed",
     text:"Tænder for GPS tracking. Rød betyder at den er slukket og grøn at den er tændt."},

    {icon:"gradient",
     text:"Henter flyfotos som baggrund."},

    {icon:"toc",
     text:"Tabeloversigt over markerne"},

    {icon:"supervisor_account",
     text:"Hvor langt de enkelte ansøgere er fra at opfylde KFA"},

    {icon:"file_upload",
     text:"Indlæser data på kortet"},

    {icon:"directions",
     text:"Beregner den optimale rute mellem markerne."},

    {icon:"person",
     text:"Bruger login siden."},
    
    {icon:"settings",
     text:"Her kan du ændre i opsætningen. Fx sætte kortet til at rotere ud fra GPS'ens signal"},
    
    {icon:"help",
     text:"Hjælp "}
  ];
  </script>

  <!-- style -->
  <style>

  helpbar{
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
  helpbar.show {
      right:0;
      box-shadow: 0px 0px 12px grey; 
    }

  #container {
    display: flex;                  /* establish flex container */
    flex-direction: row;            /* default value; can be omitted */
    wrap: nowrap;              /* default value; can be omitted */
    align-items: center;
    justify-content: left;
  }
  </style>

</helpbar>