<userbar>

  <!-- layout -->
  <div show={ noUser }>
  <div class="spinnerContainer" show={ loading }>
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
    <div class="group">
      <input ref="name" type="text" onblur="isused(this)"><span class="highlight"></span><span class="bar"></span>
      <label>Name</label>
    </div>
    <div class="group">
      <input ref="pw" type="email" type="password" onblur="isused(this)" class=""><span class="highlight"></span><span class="bar"></span>
      <label>Password</label>
    </div>
  </div>
    <button id="submitButton" type="button" class="button buttonBlue" onclick="{ login }">{ buttontext }
      <div class="ripples buttonRipples"><span class="ripplesCircle" style="top: 9.76563px; left: 41.5px;"></span></div>
    </button>

  <!-- logic -->
  <script>

  this.noUser = !(!!KORTxyz.user);
  this.buttontext = !(!!KORTxyz.user) ? "Login" : "Logout";
  this.loading = false;

  isused = function(el){
    test = el;
    if(el.value != ""){
      el.classList.add("used");
    }else{
      el.classList.remove("used");
    }
  }


  login() {

    if(this.buttontext == "Login"){
      if(this.refs.name.value.length>0){
        this.loading = true;

        name = this.refs.name.value;
        pw = this.refs.pw.value;
        
        xmlHttp=new XMLHttpRequest();
        xmlHttp.mozBackgroundRequest = true;
        xmlHttp.onload = () =>{
          this.loading = false;
          this.noUser = !(!!KORTxyz.user);
          this.buttontext = !(!!KORTxyz.user) ? "Login" : "Logout";
          this.update();
        } 

        xmlHttp.open("GET",
                "http://jordbrugsanalyser.dk/geoserver/ows?"+
                "service=WFS&version=1.0.0&request=GetFeature&srsName=EPSG:4326&"+
                "typeName=Jordbrugsfhanalyser:CHR15&propertyName=the_geom,CVRNR&outputFormat=json"+
                "&maxFeatures=1",
                true,name,pw);
        xmlHttp.send(null);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
              KORTxyz.user = { name:name, pw:pw};
              console.log("DSone")
          }
          else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
            iziToast.error({
              icon: 'material-icons',
              iconText: 'error',
                message: 'Forkert Brugernavn/password'
            }); 
            return false   
          }
        }; 
      }else{
        iziToast.error({
          icon: 'material-icons',
          iconText: 'error',
            message: 'Skriv et brugernavn'
        });
      }
    } else {
      delete KORTxyz.user;
    }
      this.noUser = !(!!KORTxyz.user);
      this.buttontext = !(!!KORTxyz.user) ? "Login" : "Logout";
   }

</script>


  <!-- style -->
<style>

userbar{
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
userbar.show {
    right:0;
    box-shadow: 0px 0px 12px grey; 
  }


form {
  width: 380px;
  margin: 4em auto;
  padding: 3em 2em 2em 2em;
  border: 1px solid #ebebeb;
  box-shadow: rgba(0,0,0,0.14902) 0px 1px 1px 0px,rgba(0,0,0,0.09804) 0px 1px 2px 0px;
}

.group { 
  position: relative; 
  margin-bottom: 45px; 
}

input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  -webkit-appearance: none;
  display: block;
  color: #636363;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #757575;
}

input:focus { outline: none; }


/* Label */

label {
  color: #999; 
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  -webkit-transition:all 0.2s ease;
  transition: all 0.2s ease;
}


/* active */

input:focus ~ label, input.used ~ label {
  top: -20px;
  -webkit-transform: scale(.75);
          transform: scale(.75); left: -2px;
  /* font-size: 14px; */
  color: #4a89dc;
}


/* Underline */

.bar {
  position: relative;
  display: block;
  width: 100%;
}

.bar:before, .bar:after {
  content: '';
  height: 2px; 
  width: 0;
  bottom: 0px; 
  position: absolute;
  background: #4a89dc; 
  -webkit-transition:all 0.2s ease; 
  transition: all 0.2s ease;
}

.bar:before { left: 50%; }

.bar:after { right: 50%; }


/* active */

input:focus ~ .bar:before, input:focus ~ .bar:after { width: 50%; }


/* Highlight */

.highlight {
  position: absolute;
  height: 60%; 
  width: 100px; 
  top: 25%; 
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}


/* active */

input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
          animation: inputHighlighter 0.3s ease;
}


/* Animations */

@-webkit-keyframes inputHighlighter {
  from { background: #4a89dc; }
  to  { width: 0; background: transparent; }
}

@keyframes inputHighlighter {
  from { background: #4a89dc; }
  to  { width: 0; background: transparent; }
}


/* Button */

.button {
  position: relative;
  display: inline-block;
  padding: 12px 24px;
  margin: .3em 0 1em 0;
  width: 100%;
  vertical-align: middle;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  letter-spacing: 1px;
  background: transparent;
  border: 0;
  cursor: pointer;
  -webkit-transition:all 0.15s ease;
  transition: all 0.15s ease;
}
.button:focus { outline: 0; }


/* Button modifiers */

.buttonBlue {
  background: #4a89dc;
  text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
}

.buttonBlue:hover { background: #357bd8; }


.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.spinnerContainer {
    position: absolute;
    z-index: 1;
    width: 260;
    height: 100%;
}
  </style>


</userbar>