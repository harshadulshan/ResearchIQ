import requests

def get_citations_semantic(title: str):
    try:
        search_url = "https://api.semanticscholar.org/graph/v1/paper/search"
        params = {
            "query": title,
            "limit": 1,
            "fields": "title,authors,year,references,citations"
        }
        res = requests.get(search_url, params=params, timeout=10)
        data = res.json()

        if not data.get("data"):
            return [], []

        paper = data["data"][0]
        paper_id = paper.get("paperId")

        detail_url = f"https://api.semanticscholar.org/graph/v1/paper/{paper_id}"
        detail_params = {"fields": "references,citations"}
        detail_res = requests.get(detail_url, params=detail_params, timeout=10)
        detail = detail_res.json()

        references = []
        for ref in detail.get("references", [])[:10]:
            references.append({
                "cited_title": ref.get("title", "Unknown"),
                "cited_authors": ", ".join([a.get("name", "") for a in ref.get("authors", [])]),
                "cited_url": f"https://semanticscholar.org/paper/{ref.get('paperId', '')}",
                "cited_year": str(ref.get("year", ""))
            })

        citations = []
        for cit in detail.get("citations", [])[:10]:
            citations.append({
                "cited_title": cit.get("title", "Unknown"),
                "cited_authors": ", ".join([a.get("name", "") for a in cit.get("authors", [])]),
                "cited_url": f"https://semanticscholar.org/paper/{cit.get('paperId', '')}",
                "cited_year": str(cit.get("year", ""))
            })

        return references, citations

    except Exception as e:
        print(f"Citation error: {e}")
        return [], []