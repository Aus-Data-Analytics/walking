import json
from geojson_utils import point_in_multipolygon
from geojson import Point

def zone_checker(lat, lon, polygon_file):
    # load danger zones multipolygon file
    #blackspot_file = 'dangerzones.json' # danger zones
    #blackspot_file = 'canberra.geojson' # for testing
    #blackspot_file = 'switzerland.geojson' # for testing

    file = open(polygon_file, 'r')
    zones_str = file.read()
    file.close()

    # convert data to json
    coord_json = Point((lat, lon))  #coordinates from function args
    zones_json = json.loads(zones_str) #zone shapes from file

    # determine if coordinates location lies in multiPolygon zone data
    zone = point_in_multipolygon(coord_json, zones_json)

    # Return True if coordinates are within multipolygon zones file
    return zone

if __name__ == "__main__":
    # use test coordinates
    test = zone_checker(149.141787, -35.311173)
    print(test)
