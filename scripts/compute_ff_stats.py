#!/usr/bin/env python3
"""Compute the four Florida Flood Risk metric tiles from the live repo's GeoJSONs.

Reads the four .js layer files from Florida-Flood-Risk-master (each is a single
`var X = {...};` assignment), parses them as GeoJSON, projects to EPSG:3857 for
area work, and prints the four numbers that go into portfolio-details-florida-flood.html.
"""
import io, json, re, urllib.request
import geopandas as gpd
from shapely.geometry import shape

BASE = "https://raw.githubusercontent.com/haochenmiao/Florida-Flood-Risk-master/main/"
FLOOD_ZONES = {"A", "AE", "AH", "AO", "V", "VE"}
COAST_BUFFER_M = 500

def load(name):
    txt = urllib.request.urlopen(BASE + name).read().decode("utf-8")
    txt = re.sub(r"^\s*var\s+\w+\s*=\s*", "", txt).rstrip().rstrip(";")
    gj = json.loads(txt)
    return gpd.GeoDataFrame.from_features(gj["features"], crs="EPSG:4326")

city   = load("Boundary.js").to_crs(3857)
floods = load("Floods.js").to_crs(3857)
svi    = load("SVI.js").to_crs(3857)
schools= load("Schools.js").to_crs(3857)
fire   = load("Fire.js").to_crs(3857)

city_poly = city.geometry.union_all()
fz_col = next(c for c in floods.columns if c.upper() == "FLD_ZONE")
hazard = floods[floods[fz_col].isin(FLOOD_ZONES)]
hazard_poly = hazard.geometry.union_all()

pct_ae = 100 * city_poly.intersection(hazard_poly).area / city_poly.area
n_schools = schools[schools.within(hazard_poly) | schools.intersects(hazard_poly)].shape[0]
n_fire    = fire[fire.within(hazard_poly) | fire.intersects(hazard_poly)].shape[0]

# Coastal tracts: SVI tracts whose geometry sits within 500m of the city boundary line
coast = city.boundary.union_all().buffer(COAST_BUFFER_M)
svi_col = next((c for c in svi.columns if c.upper() == "RPL_THEMES"), None)
coastal = svi[svi.intersects(coast)]
mean_svi = coastal[svi_col].astype(float).mean() if svi_col else float("nan")

print(f"% city area in zones A/AE/AH/AO/V/VE : {pct_ae:.1f}%")
print(f"Schools in flood zone                : {n_schools}")
print(f"Fire stations in flood zone          : {n_fire}")
print(f"Mean {svi_col} of coastal tracts     : {mean_svi:.2f}")
