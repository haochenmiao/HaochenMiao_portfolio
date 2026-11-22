# Blogs section — topic-coded compact grid (Option 3)

Goal: replace the current `.icon-box` cards (which look like a services section) with real blog cards — cover image, platform badge, topic chip, title, excerpt, date, read time, colored top stripe by topic.

Audience: recruiters and peers skimming for writing in a specific domain.

Fixed topic palette (do not invent new ones — reuse):
- ML → #17d672 (green, matches existing site accent)
- Applied AI → #8ab6ff (blue)
- GIS → #c58aff (purple)
- Data engineering → #f59e0b (amber)
- Civic tech → #ef4a9d (pink)

Platform badges:
- Medium — black bg #0a0a0a, white text, thin #333 border, serif "M" prefix
- LinkedIn — solid #0a66c2 bg, white "in" prefix
- Dev.to — black bg, white "</>" prefix
- Personal — transparent, 0.5px white border
- ArcGIS StoryMaps — solid #007ac2 bg, white text, "◴" prefix

Card anatomy (top to bottom):
1. 3px solid top border in the topic color
2. Cover image (16/9)
3. Body: platform + topic chips row · title · excerpt (2 lines) · meta row (date · read-time)

Filter row below the grid: All · ML · Applied AI · GIS · Data eng · Civic tech
Clicking a filter hides cards whose topic class doesn't match. "All" shows everything.

Posts to include now:
1. Advanced model selection with PyCaret for stock prediction — Medium, ML, 2024-02, 7 min
   URL: https://medium.com/@miaohaochen0423/advanced-model-selection-using-pycaret-in-python-9bc5e86529b1
2. SafeGPT · an AI driver assistant for traffic and construction — LinkedIn, Applied AI, 2023-12, 3 min
   URL: https://www.linkedin.com/feed/update/urn:li:activity:7143749751019028481/

Leave the markup extensible — a third card should be one copy-paste.

## Adding a new post

1. Save a 1200x675 cover image to assets/img/blogs/<slug>.jpg (or run scripts/make_blog_placeholder.py).
2. Inside <div class="row blog-grid"> in index.html, add:

<div class="col-lg-4 col-md-6 blog-item topic-{TOPIC_CLASS}">
  <a class="blog-card {TOPIC_SHORT}" href="{POST_URL}" target="_blank" rel="noopener">
    <div class="blog-cover">
      <img src="assets/img/blogs/{SLUG}.jpg" alt="{ALT_TEXT}">
    </div>
    <div class="blog-body">
      <div class="blog-tags">
        <span class="plat plat-{PLATFORM}">{PLATFORM_LABEL}</span>
        <span class="topic topic-{TOPIC_SHORT}-chip">{TOPIC_LABEL}</span>
      </div>
      <h4>{POST_TITLE}</h4>
      <p>{EXCERPT · 1–2 sentences, ~180 chars}</p>
      <div class="blog-meta">
        <span>{MONTH YEAR}</span><span class="dot"></span><span>{N} min read</span>
        <span class="read-cta">Read on {PLATFORM_LABEL} ↗</span>
      </div>
    </div>
  </a>
</div>

Allowed values:
- TOPIC_CLASS / TOPIC_SHORT: ml, ai, gis, de, civic
- PLATFORM: medium, linkedin, devto, personal, arcgis
- PLATFORM_LABEL: Medium, LinkedIn, Dev.to, Personal, ArcGIS StoryMaps
- TOPIC_LABEL: ML, Applied AI, GIS, Data eng, Civic tech
