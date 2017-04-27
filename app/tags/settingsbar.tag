<settingsbar>

  <!-- layout -->
<div id="container">
  <label class="switch">
    <input type="checkbox" id="Foelgcompas" onclick="KORTxyz.settings.followCompas? KORTxyz.settings.followCompas=false : KORTxyz.settings.followCompas=true">
    <div class="slider round"></div>
  </label>
  <h2 style="padding-left:30px">Følg compas</h2>
</div>

<div id="container">
  <label class="switch">
    <input type="checkbox" id="dummySwitch">
    <div class="slider round"></div>
  </label>
  <h2 style="padding-left:30px">Dummy Switch</h2>
</div>

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
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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

  <!-- logic -->
  <script>

  </script>

</settingsbar>