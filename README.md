# Cycling Safety App

Warn when approaching cycling black spots.

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

Then navigate to the site, for example (from above) ```http://127.0.0.1:5000/static/cycling.html```

## Testing Status

### Web-App
Tested using a web service for danger information:
* Mac (macOS 10.12.6):
   * Safari 10.1.2 - access location appears unreliable for reasons TBD
   * Firefox 53.0.3 (64-bit) - OK
   * Chrome 60.0.3112.78 (Official Build) (64-bit) - OK
* Windows 10:
   * Chrome 59 - OK

### Stand-Alone
Tested in "stand alone" mode (not using a web service for danger information. This is mainly for development use.

* Mac:
   * Safari 10.1.2 - access location appears unreliable for reasons TBD
   * Firefox 53.0.3 (64-bit) - OK
   * Chrome 60.0.3112.78 (Official Build) (64-bit) - execution prevented by restriction on loading resources from file:// protocol.
   
## Credits/Attribution

Sound files downloaded from http://soundbible.com/tags-alert.html .
