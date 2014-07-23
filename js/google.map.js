//// Start Google Maps ////
function initialize() {
  var myOptions = {
	zoom: 14,
	center: new google.maps.LatLng(40.242761, -76.661515),
	mapTypeId: google.maps.MapTypeId.TERRAIN
  }
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDBcoAWKkY0VhTqvg24VgAOissxy63GYDc&sensor=TRUE&callback=initialize";
  document.body.appendChild(script);
}
window.onload = loadScript;
//// End Google Maps ////