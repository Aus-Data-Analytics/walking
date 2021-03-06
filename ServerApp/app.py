from flask import Flask, render_template, url_for, redirect, send_from_directory, request, jsonify
from helpers import *

# Zone files
danger_zones_file = "danger_zones.json"
school_zones_file = "school_zones.json"

#Web App
app = Flask(__name__)

@app.route('/<path:path>')
def send_file(path):
    return send_from_directory('static', path)

@app.route('/warning')
def warning():
    return render_template("warning.html")

@app.route('/check')
def check_geo():
    lat = float(request.args.get('lat'))
    lon =float(request.args.get('lon'))

    danger_warning = zone_checker(lat, lon, danger_zones_file)
    school_warning = zone_checker(lat, lon, school_zones_file)

    return jsonify(
        lat = lat,
        lon = lon,
        danger_zone = danger_warning,
        school_zone = school_warning
    )
