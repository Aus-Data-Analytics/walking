var debug = false;
var localMode = false; // True for stand-alone app, false to call back to web service
var demoMode = false; // Go into danger mode after a time period for demonstration purposes.
var demoTimeStart = 5000; // ms to go to danger mode
var demoCaution = 3000;
var demoToDanger = 2000;
var demoTimeDuration = 3000; // ms duration of danger mode

var serviceUrl = "http://127.0.0.1:5000/check";
var file = "dangerzones.json";
// These are for testing:
//var file = "canberra.geojson"
//var file = "dz1.json"
//var file = "switzerland.geojson"

var dangerZones;
var warningPlayed = false;
var cautionPlayed = true;
var allClearPlayed = true;

var alertAudio = new Audio('alert.mp3');
var cautionAudio = new Audio('alert.mp3'); // FIXME
var allClearAudio = new Audio('all-clear.mp3');


// Modes
var allClearMode = 1;
var cautionMode = 2;
var dangerMode = 3;
var unkMode = 4;

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
				var danger = allClearMode;
				if (turf.inside(here, turf.multiPolygon(dangerZones))) {
					danger = dangerMode;
				}
				updateDisplay(danger)
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
						var danger = allClearMode;
						if (result.danger_warning) {
							danger = dangerMode;
						} else if (result.school_warning) {
							danger = cautionMode
						}
						updateDisplay(danger);
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
		
	if (!demoMode) {
		navigator.geolocation.watchPosition(geoSuccess, geoError);
	}
	
	if (demoMode) {
		updateDisplay(allClearMode);
		setTimeout(function() { 
			updateDisplay(cautionMode);
			setTimeout(function() { 
				updateDisplay(allClearMode)
				setTimeout(function () {
					updateDisplay(dangerMode);
					setTimeout(function () {
						updateDisplay(allClearMode);
						}, demoTimeDuration);
				}, demoToDanger); 
				}, demoCaution);
			
			 }, demoTimeStart);
	}
	
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


function updateDisplay(mode) {
	if (mode == allClearMode) {
		$('#warningmsg').text("Ride Carefully");
		$('#alertdisplay').addClass("noalert");
		$('#alertdisplay').removeClass("alert");
		$('#alertdisplay').removeClass("caution");
		$('#alertdisplay').removeClass("unknown");
		if (!allClearPlayed) {
			allClearAudio.play();
			warningPlayed = false;
			allClearPlayed = true;
		}
	} else if (mode == cautionMode) {
		$('#warningmsg').text("Caution");
		$('#alertdisplay').addClass("caution");
		$('#alertdisplay').removeClass("noalert");
		$('#alertdisplay').removeClass("alert");
		$('#alertdisplay').removeClass("unknown");
		if (!warningPlayed) {
			cautionAudio.play();
			warningPlayed = true;
			allClearPlayed = false;
		}
	} else if (mode == dangerMode) {
		$('#warningmsg').text("Danger!");
		$('#alertdisplay').addClass("alert");
		$('#alertdisplay').removeClass("noalert");
		$('#alertdisplay').removeClass("caution");
		$('#alertdisplay').removeClass("unknown");
		if (!warningPlayed) {
			alertAudio.play();
			warningPlayed = true;
			allClearPlayed = false;
		}
	} else if (mode == unkMode) {
		$('#warningmsg').text("Network problem");
		$('#alertdisplay').addClass("unknown");
		$('#alertdisplay').removeClass("noalert");
		$('#alertdisplay').removeClass("caution");
		$('#alertdisplay').removeClass("alert");
	}
}

function updateDisplayDanger(warning) {
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

function displayCaution() {
	
	
}

function displayUnknownState() {
	$('#warningmsg').text("Network problem");
	$('#alertdisplay').addClass("unknown");
	$('#alertdisplay').removeClass("noalert");
	$('#alertdisplay').removeClass("alert");
}

