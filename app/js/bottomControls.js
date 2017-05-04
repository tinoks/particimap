user = function(el){
  if(document.getElementsByTagName("userbar").length == 1){
    document.getElementsByTagName("userbar")[0].classList.toggle("show")
    el.classList.toggle("show");
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
  } else {
    require('../tags/settingsbar.tag');
    document.getElementById('map').appendChild(document.createElement("settingsbar"));
    riot.mount('settingsbar',{});
    Ps.initialize(document.getElementsByTagName("settingsbar")[0]);
    document.getElementsByTagName("settingsbar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
}
