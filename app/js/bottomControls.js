user = function(el){
	console.log(el);

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
