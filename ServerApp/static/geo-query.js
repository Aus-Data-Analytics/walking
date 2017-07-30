var debug = true;
var localMode = false; // True for stand-alone app, false to call back to web service
var serviceUrl = "http://127.0.0.1:5000/check";
var file = "dangerzones.json";
// These are for testing:
//var file = "canberra.geojson"
//var file = "dz1.json"
//var file = "switzerland.geojson"

var dangerZones;
var warningPlayed = false;
var allClearPlayed = true;

var alertAudio = new Audio('alert.mp3');
var allClearAudio = new Audio('all-clear.mp3');

window.onload = function() {
	$('#warningmsg').text("Loading...");
	$('#alertdisplay').addClass("unknown");
	var geoSuccess = function(position) {
			if (debug) {
				$('#currentLat').text(position.coords.latitude);
				$('#currentLon').text(position.coords.longitude);
				$('#status').text("Location updated");
			}
			if (localMode) {
				var here = turf.point([position.coords.longitude, position.coords.latitude]);
				updateDisplay(turf.inside(here, turf.multiPolygon(dangerZones)))
			} else {
				$.ajax({
					url: serviceUrl,
					type: "get",
					data: {
						lat: position.coords.latitude,
						lon: position.coords.longitude
					},
					success: function(result) {
						//console.log(result);
						//response = JSON.parse(result);
						updateDisplay(result.blackspot);
					},
					error: function(xhr) {
						displayUnknownState();
					}
				});
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
	if (debug) {
		$('#status').text("Loaded");
		$('#debug').removeClass("nodisplay")
	}
	status = $.getJSON(file, function(data) {
		dangerZones = data;
		if (debug) {
			$('#output').text(JSON.stringify(dangerZones));
		}
	});
	if (debug) {
		$('#testing').text(JSON.stringify(status));
	}
};

function updateDisplay(warning) {
	if (warning) {
		$('#warningmsg').text("Danger!");
		$('#alertdisplay').addClass("alert");
		$('#alertdisplay').removeClass("noalert");
		$('#alertdisplay').removeClass("unknown");
		if (!warningPlayed) {
			alertAudio.play();
			warningPlayed = true;
			allClearPlayed = false;
		}
	} else {
		$('#warningmsg').text("Ride Carefully");
		$('#alertdisplay').removeClass("alert");
		$('#alertdisplay').addClass("noalert");
		$('#alertdisplay').removeClass("unknown");
		if (!allClearPlayed) {
			allClearAudio.play();
			warningPlayed = false;
			allClearPlayed = true;
		}
	}
}

function displayUnknownState() {
	$('#warningmsg').text("Network problem");
	$('#alertdisplay').addClass("unknown");
	$('#alertdisplay').removeClass("noalert");
	$('#alertdisplay').removeClass("alert");
}