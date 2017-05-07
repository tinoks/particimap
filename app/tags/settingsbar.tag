<settingsbar>

  <!-- layout -->
<div id="container">
  <label class="switch">
    <input type="checkbox" id="Foelgcompas" 
      onclick="KORTxyz.settings.followCompas? KORTxyz.settings.followCompas=false : KORTxyz.settings.followCompas=true;localStorage.setItem('followCompas',KORTxyz.settings.followCompas);">
    <div class="slider"></div>
  </label>
  <h4 style="padding-left:30px">Følg compas</h4>
</div>

<div id="container">
  <label class="switch">
    <input type="checkbox" id="useWebGL" onclick="useWebGL()">
    <div class="slider"></div>
  </label>
  <h4 style="padding-left:30px">Brug WebGL</h4>
</div>


<!-- logic -->
<script>
this.on('mount', function() {
  document.getElementById("Foelgcompas").checked = KORTxyz.settings.followCompas;
  document.getElementById("useWebGL").checked = KORTxyz.settings.useWebGL;
})

 useWebGL = function(){
    KORTxyz.settings.useWebGL? KORTxyz.settings.useWebGL=false : KORTxyz.settings.useWebGL=true;
    localStorage.setItem('useWebGL',KORTxyz.settings.useWebGL);
    iziToast.show({
      icon: 'material-icons',
      iconText: 'priority_high',
      message: 'Kræver en genindlæsning for at træde i kræft'
    }); 
  }
</script>


  <!-- style -->
<style>

settingsbar{
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
settingsbar.show {
    right:0;
    box-shadow: 0px 0px 12px grey; 
  }

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4caf50;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}



#container {
  display: flex;                  /* establish flex container */
  flex-direction: row;            /* default value; can be omitted */
  wrap: nowrap;              /* default value; can be omitted */
  align-items: center;
  justify-content: left;
}

label {
    display: inline-block;
    vertical-align: middle;
}
  </style>


</settingsbar>