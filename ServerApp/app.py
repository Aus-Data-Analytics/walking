from flask import Flask, render_template, url_for, redirect, send_from_directory, request, jsonify
from helpers import *

# Zone files
crash_sites_file = "dangerszones.json"

#Web App
app = Flask(__name__)

@app.route('/<path:path>')
def send_file(path):
    return send_from_directory('', path)

@app.route('/warning')
def warning():
    return render_template("warning.html")

@app.route('/check')
def check_geo():
    lat = float(request.args.get('lat'))
    lon =float(request.args.get('lon'))

    crash_warning = zone_checker(lat, lon, crash_sites_file)

    return jsonify(
        lat = lat,
        lon = lon,
        crash_site = crash_warning
    )
