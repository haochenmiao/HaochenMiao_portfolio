# Wildfire Geospatial Analysis — portfolio detail spec (Option 1: before/after split hero)

One-line pitch: "A two-notebook geospatial pipeline that compares US wildfire occurrence across 1985–1999 and 2000–2014, state by state."

Role tracks: GIS Analyst + Data Engineer (notebook pipeline)
Scope: continental US, state-level aggregation
GitHub: https://github.com/haochenmiao/WildfireGeospatialAnalysis
Live links (notebooks rendered on GitHub):
- Prep: https://github.com/haochenmiao/WildfireGeospatialAnalysis/blob/main/WildfireDataPreparation_Conversion.ipynb
- Analysis: https://github.com/haochenmiao/WildfireGeospatialAnalysis/blob/main/WildfireAnalysis_1985_1999_2000_2014.ipynb
- nbviewer fallback: https://nbviewer.org/github/haochenmiao/WildfireGeospatialAnalysis/blob/main/<notebook>.ipynb

The two periods compared (use these labels verbatim everywhere):
- 1985 – 1999
- 2000 – 2014

Methods:
- CRS reprojection EPSG:4326 → EPSG:5070 (Albers Equal Area, continental US) for area-safe stats
- Spatial join of fire points to state polygons (geopandas.sjoin, predicate="within")
- Group by period + state, count fires per group
- Choropleth per period using YlOrRd colormap, quantile breaks
- Kernel density surfaces per period

Stack chips: GeoPandas · Fiona · Shapely · Rasterio · GDAL · pyproj · Matplotlib · Jupyter

Palette (wildfire warmth — distinct from Sound Transit red, Florida Flood blue, Washington purple):
- Base: #1a1410 (warm charcoal)
- Panel: #241b14
- Border: #3a2e22
- Text primary #fff / secondary #d4c7b5 / muted #8b7d6a
- Ramp (YlOrRd matched): #fde68a · #fcd34d · #fbbf24 · #f59e0b · #ea580c · #dc2626 · #991b1b
- Accent (interactive, CTAs): #ea580c; hover #f97316; chip border #f59e0b
Type: Space Grotesk UI, JetBrains Mono for stats, EPSG codes, state abbreviations, dates

Honest limits:
- Occurrence count only — not acres burned
- Dataset ends 2014, so no Camp Fire (2018), Dixie (2021), Maui (2023), etc.
- Descriptive, not causal
- If headline stats (e.g. "+42%", "871K") haven't been computed from the actual notebooks yet, LEAVE THEM AS TODO markers until Prompt 2 runs — do not invent numbers.
