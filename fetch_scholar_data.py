from scholarly import scholarly
import json

scholar_id = "btji37cAAAAJ"

author = scholarly.search_author_id(scholar_id)
author = scholarly.fill(author, sections=["basics", "indices", "publications"])

metrics = {
    "name": author.get("name"),
    "h_index": author.get("hindex"),
    "h_index5y": author.get("hindex5y"),
    "i10_index": author.get("i10index"),
    "i10_index5y": author.get("i10index5y"),
    "citations": author.get("citedby"),
    "citations5y": author.get("citedby5y")
}
with open("public/data/metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

pubs = []
for pub in author.get("publications", []):
    p = scholarly.fill(pub)
    pubs.append({
        "title": p.get("bib", {}).get("title"),
        "authors": p.get("bib", {}).get("author"),
        "journal": p.get("bib", {}).get("journal"),
        "year": p.get("bib", {}).get("pub_year"),
        "url": f"https://scholar.google.com/scholar?oi=bibs&hl=en&q={p.get('bib', {}).get('title', '').replace(' ', '+')}"
    })

with open("public/data/publications.json", "w") as f:
    json.dump(pubs, f, indent=2)

