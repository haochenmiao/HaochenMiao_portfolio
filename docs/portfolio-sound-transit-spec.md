# Sound Transit Accessibility Atlas — portfolio detail spec

One-line pitch: "GTFS Pathways tells you what connects to what inside a transit station. This project extends it with ADAAG-aligned attributes that tell you whether the connection is actually usable."

Role tracks: GIS Analyst + Data Engineer (dual-badge)
Timeline: Sept 2023 – Mar 2024 (original); replica Oct 2025
Live URLs:
- 2D atlas: https://haochenmiao.github.io/sound-transit-accessibility/web/2d/
- 3D section: https://haochenmiao.github.io/sound-transit-accessibility/web/3d/
- Source: https://github.com/haochenmiao/sound-transit-accessibility

Palette (match the live maps):
- Light: bone #f6f4ef, Link-rail red #c62828, 2-Line green #007cad, Link-green #28813f
- Dark: inkwell #0d0f12, lifted-ink #f1efe8, accent #ef5350
- Severity ramp: #4e8c6a → #d9a441 → #cc6a1a → #a1282b
Type: Space Grotesk (display + body), JetBrains Mono (data/code/metrics)

Numbers to cite: 380 stops · 23 Link stations · 11 segments · 4 audited · 24 nodes · 63 pathways · 24 barriers (4 blocking / 5 moderate / 15 minor) · 8 added ADAAG fields · ~30% QA time reduction · ~10K daily riders impacted

Three riders: Wheelchair user · Blind rider · Mobility-impaired rider

8 schema fields with ADAAG anchors:
has_handrail (§505), audible_signals (§407.4), tactile_paving (§705), braille_signage (§703.3), audible_wayfinding (§707), lighting_quality (§215), tactile_warning_strip (§705.1), compliance_adaag (rolled-up)

Rules: no emoji, no icons, no gradients, no generic rounded-lg cards. Dashboard-grade typography. JetBrains Mono for every number, code identifier, and coordinate.
