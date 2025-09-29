import json
import os
from jinja2 import Template

# Paths
DATA_FILE = "../assets/data/districts.json"
TEMPLATE_FILE = "../pages/districts/template.html"
OUTPUT_DIR = "../pages/districts/generated"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load districts data
with open(DATA_FILE, "r", encoding="utf-8") as f:
    districts = json.load(f)

# Load template
with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
    template = Template(f.read())

# Generate HTML files
for d in districts:
    html_content = template.render(
        DISTRICT_NAME_EN=d["name_en"],
        DISTRICT_NAME_HI=d["name_hi"],
        STATE_NAME_EN=d["state_en"],
        STATE_NAME_HI=d["state_hi"],
        POPULATION=d["population"],
        AREA=d["area"],
        DISTRICT_ID=d["id"],
        DISTRICT_DESCRIPTION_EN=d.get("description_en", "No description available."),
        DISTRICT_DESCRIPTION_HI=d.get("description_hi", "कोई विवरण उपलब्ध नहीं है।")
    )

    # Save as individual HTML
    output_path = os.path.join(OUTPUT_DIR, f"{d['id']}.html")
    with open(output_path, "w", encoding="utf-8") as out:
        out.write(html_content)

print(f"✅ Generated {len(districts)} district pages in {OUTPUT_DIR}")
