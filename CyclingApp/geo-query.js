var dangerZones;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    $('#currentLat').text(startPos.coords.latitude);
    $('#currentLon').text(startPos.coords.longitude);
	//document.getElementById('status').innerHTML = "Location updated"
	$('#status').text("Location updated");
	
	$('#warning').text("Unk");

	var here = turf.point([position.coords.longitude, position.coords.latitude]);

	if (turf.inside(here, turf.multiPolygon(dangerZones))) {
	//if (localCheckDanger(position)) {
			$('#warning').text("Danger!");
		} else {
			$('#warning').text("All cool");
		}
	}
	
  
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
   $('#status').text("Error " + error.code)
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.watchPosition(geoSuccess, geoError);
  $('#status').text("Loaded");
  
  //file = "canberra.geojson"
 file = "dangerzones.json"
  //file = "dz1.json"
  //file = "switzerland.geojson"

  status = $.getJSON(file, function(data) {
	  dangerZones = data;
	  $('#output').text(JSON.stringify(dangerZones));
  });
  $('#testing').text(JSON.stringify(status));

};


localCheckDanger = function (position) {
			$('warning').text("Called!");

     var here = turf.point([position.coords.longitude, position.coords.latitude]);
	return turf.inside(here, dangerZones);
}