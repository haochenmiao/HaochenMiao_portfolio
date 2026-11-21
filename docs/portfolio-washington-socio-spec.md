# Washington Socioeconomic Map — portfolio detail spec (Option 2: live-tool mockup)

One-line pitch: "A 3D tract map of Washington where polygon height and color both read the same normalized value, across six equity indicators."

Role tracks: GIS Analyst + Data Visualization
Scope: statewide (Washington, all census tracts)
Live URL: https://haochenmiao.github.io/Washington_Socioeconomic_Map/
GitHub: https://github.com/haochenmiao/Washington_Socioeconomic_Map

Live site has four pages — reference them individually:
- Intro / disclaimer: index.html
- Map: map.html
- Data details: data_info.html
- About: about_me.html

The six indicators (use these labels verbatim — they match the live app):
1. Low Birth Weight
2. People of Color
3. No High School Diploma
4. Population Living in Poverty
5. Unaffordable Housing (>30% of income on housing)
6. Unemployed Population

Methods: min-max normalization per indicator; the same scalar drives polygon HEIGHT and COLOR; tracts clipped to land using Census cartographic boundary.

Data sources:
- Washington Geospatial Open Data Portal (six indicators)
- US Census Bureau cartographic boundary (land clip)
- Maps of World (city coordinates for search, converted to CSV)

Stack: Mapbox GL JS · D3.js · Bootstrap 5 · Font Awesome · Google Fonts · GitHub Pages + Vercel

Palette (distinct from Sound Transit red and Florida Flood blue — this project gets purple):
- Base dark: #121014
- Panel: #1a1620 / #1f1a24
- Border: #2e2834
- Text primary #fff / secondary #bfb3c9 / muted #8d7f99
- Accent: #a855f7 (primary) · #c084fc (hover) · #f0abfc (highlight)
- Gradient ramp for swatches: #3d1a5c → #7a2e96 → #a855f7 → #c084fc → #f0abfc
Type: Space Grotesk for UI, JetBrains Mono for FIPS codes, formulas, numeric values

Honest limits:
- Indicator vintages vary (note each at build time)
- README's Unemployment link currently points to a toxic-releases page — do NOT propagate that broken link from the portfolio
- No statistical inference, just spatial description of normalized values
- Equity indicators are proxies, not outcomes
