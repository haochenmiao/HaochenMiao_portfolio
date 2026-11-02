# Florida Flood Risk — portfolio detail spec (Option 2: Planning dashboard)

One-line pitch: "A planner-grade overlay of CDC social vulnerability and FEMA flood zones for Cape Coral — the same layer toggles a municipal GIS tool would ship with."

Role tracks: GIS Analyst (primary) + Data Engineer (secondary, for the FIPS-join notebook and REST pulls)
Location: Cape Coral, FL
Repo: https://github.com/haochenmiao/Florida-Flood-Risk-master
Live 2D: pulled from the repo's GitHub Pages URL (verify at setup)
Live 3D: Mapbox GL build in the same repo

Data sources (cite verbatim, these are the credibility anchor):
- CDC/ATSDR Social Vulnerability Index 2020 (census-tract GeoJSON)
- FEMA National Flood Hazard Layer REST API (zones A, AE variants, D, X, levee-reduced)
- Lee County / Cape Coral open data for schools, libraries, fire stations
- Census TIGER for city boundary
- Local hydrography for surface water

Stack: Leaflet 1.7.1 · Mapbox GL JS 2.8.1 · HTML/CSS/JS vanilla · GeoPandas · QGIS (styling) · Jupyter (FIPS join) · GitHub Pages

Palette (civic / planning department feel, distinct from Sound Transit red):
- Base dark: #0e1620 (deep navy, not black)
- Panel: #1a2432
- Border: #2a3a4a
- Text primary: #ffffff / secondary #b8c5d6 / muted #7a8ba3
- Flood blue (primary accent): #2563eb
- Flood blue light: #60a5fa
- SVI red ramp: #fca5a5 → #dc2626 → #991b1b
- Infrastructure amber: #f59e0b (schools), red #ef4444 (fire)
Type: Inter or Space Grotesk for UI, JetBrains Mono for all numbers, FIPS codes, and layer IDs

Honesty: no predictive model, no forecast — this is an overlay/visualization tool. SVI vintage 2020. Flood zones current NFHL. No field validation.

Layer list (left panel, 8 toggles): FEMA flood zones, CDC SVI, Schools, Fire stations, Libraries, Roads, Surface water, City boundary

Metric tiles to show (right under the map): % area in Zone AE · # schools in flood zone · # fire stations in flood zone · mean SVI of coastal tracts. These are placeholders — compute real values from the GeoJSONs in a later prompt.
