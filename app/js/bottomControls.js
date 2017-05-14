user = function(el){
  if(document.getElementsByTagName("userbar").length == 1){
    document.getElementsByTagName("userbar")[0].classList.toggle("show")
    el.classList.toggle("show");
    setTimeout(function(){
      document.getElementById('map').removeChild(document.getElementsByTagName("userbar")[0])
    },300)
  } else {
    require('../tags/userbar.tag');
    document.getElementById('map').appendChild(document.createElement("userbar"));
    riot.mount('userbar',{});
    Ps.initialize(document.getElementsByTagName("userbar")[0]);
    document.getElementsByTagName("userbar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
}




settings = function(el){
  if(document.getElementsByTagName("settingsbar").length == 1){
    document.getElementsByTagName("settingsbar")[0].classList.toggle("show")
    el.classList.toggle("show");
    setTimeout(function(){
      document.getElementById('map').removeChild(document.getElementsByTagName("settingsbar")[0])
    },300)
  } else {
    require('../tags/settingsbar.tag');
    document.getElementById('map').appendChild(document.createElement("settingsbar"));
    riot.mount('settingsbar',{});
    Ps.initialize(document.getElementsByTagName("settingsbar")[0]);
    document.getElementsByTagName("settingsbar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
}

help = function(el){
  if(document.getElementsByTagName("helpbar").length == 1){
    document.getElementsByTagName("helpbar")[0].classList.toggle("show")
    el.classList.toggle("show");
    setTimeout(function(){
      document.getElementById('map').removeChild(document.getElementsByTagName("helpbar")[0])
    },300)
  } else {
    require('../tags/helpbar.tag');
    document.getElementById('map').appendChild(document.createElement("helpbar"));
    riot.mount('helpbar',{});
    Ps.initialize(document.getElementsByTagName("helpbar")[0]);
    document.getElementsByTagName("helpbar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
}
