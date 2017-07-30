# Cycling Safety App

Warn when approaching cycling black spots.

The app displays a green display during normal operation. It will play a warning tone when entering the area around a high accident zone and display a red screen with a warning. The screen will return to green and and "all clear" tone is played when the rider leaves the area surrounding the high accident zone.

Additionally, an amber screen and a different warning tone is displayed when the rider enters the region around a school. This is because with school buses, parents picking up children, etc., there is likely to be congestion which could be hazardous. Again, an all clear is given when the rider leaves this area.

## Dependencies

The web server requires Flask and the geojson-utils package.

The web app contains all the necessary dependencies (jQuery, turfjs).

## Running

All code required is in the ```walking/ServerApp``` directory.

```
MacBook:ServerApp stephen$ export FLASK_APP=app.py
MacBook:ServerApp stephen$ flask run
 * Serving Flask app "app"
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Then navigate to the site, for example (from above) ```http://127.0.0.1:5000/warning```

The ```CyclingApp``` folder contains a development version of the code. Copies of the audio files used with
their original file names are also provided.

## Configuration

The JavaScript file has a ```demoMode``` flag at the beginning of the script. If this is set to ```true```
the page will not request access to location services but will provide a demo of the three warning 
states.

## Testing Status

### Web-App
Tested using a web service (running locally) for danger information:
* Mac (macOS 10.12.6):
   * Safari 10.1.2 - access to location appears unreliable for reasons TBD
   * Firefox 53.0.3 (64-bit) - OK
   * Chrome 60.0.3112.78 (Official Build) (64-bit) - OK
* Windows 10:
   * Chrome 59 - OK

Using a web service not running locally can result in the browser rejecting access to location services for websites not loaded
over a secure connection (https). Demo mode works fine.

In demo mode, it has been tested on both Android and iOS mobile devices.
   
### Stand-Alone
Tested in "stand alone" mode (not using a web service for danger information. This is mainly for development use.

* Mac:
   * Safari 10.1.2 - access location appears unreliable for reasons TBD
   * Firefox 53.0.3 (64-bit) - OK
   * Chrome 60.0.3112.78 (Official Build) (64-bit) - execution prevented by restriction on loading resources from file:// protocol.
   
## Credits/Attribution

Sound files downloaded from http://soundbible.com/tags-alert.html .
