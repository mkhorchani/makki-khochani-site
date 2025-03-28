from scholarly import scholarly
import json

scholar_id = "btji37cAAAAJ"

author = scholarly.search_author_id(scholar_id)
author = scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])

# Write citation metrics
metrics = {
    "name": author.get("name"),
    "h_index": author.get("hindex"),
    "h_index5y": author.get("hindex5y"),
    "i10_index": author.get("i10index"),
    "i10_index5y": author.get("i10index5y"),
    "citations": author.get("citedby"),
    "citations5y": author.get("citedby5y"),
    "citations_by_year": [
        {"year": str(year), "citations": count}
        for year, count in sorted(author.get("cites_per_year", {}).items())
    ]
}

with open("public/data/metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

# Get publication data
publications = []
for pub in author.get("publications", []):
    pub_details = scholarly.fill(pub)
    bib = pub_details.get("bib", {})
    publications.append({
        "title": bib.get("title"),
        "authors": bib.get("author"),
        "journal": bib.get("journal"),
        "year": bib.get("pub_year"),
        "publisher_url": bib.get("url"),
        "url": f"https://scholar.google.com/scholar?oi=bibs&hl=en&q={bib.get('title', '').replace(' ', '+')}"
    })

# Sort publications by year (most recent first)
publications = sorted(publications, key=lambda p: int(p["year"]) if p["year"] else 0, reverse=True)

# Write to publications.json
with open("public/data/publications.json", "w") as f:
    json.dump(publications, f, indent=2)

