from flask import Flask, render_template, url_for, redirect, send_from_directory
from helpers import *

app = Flask(__name__)

@app.route('/<path:path>')
def send_file(path):
    return send_from_directory('', path)

@app.route('/warning')
def warning(lat=0, long=0):
    danger = zone_checker(lat, long)

    return render_template("warning.html")

#    if danger == True:
#        return 'Danger ' + str(lat) + str(long)
#    else:
#        return 'Safe'
