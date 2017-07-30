#!/usr/bin/env python

import sys
import json

file = sys.argv[1]

json_data=open(file).read()

coords = []
json = json.loads(json_data)
if json["type"] != "FeatureCollection":
	raise Exception("Wrong type")
	
features = json["features"]
for feature in features:
	if feature["type"] != "Feature":
		raise Exception("Not a feature")
	
	geometry = feature["geometry"]
	if geometry["type"] != "Polygon":
		raise Excpetion("Not a polygon")
	coords.append(geometry["coordinates"])
	
print(coords)