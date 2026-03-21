import arxiv
import requests
import xml.etree.ElementTree as ET

def search_arxiv(query: str, max_results: int = 10):
    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )
    papers = []
    for result in client.results(search):
        papers.append({
            "title": result.title,
            "authors": ", ".join([a.name for a in result.authors]),
            "abstract": result.summary,
            "url": result.entry_id,
            "source": "ArXiv",
            "published": str(result.published.date())
        })
    return papers

def search_pubmed(query: str, max_results: int = 10):
    search_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    search_params = {
        "db": "pubmed", "term": query,
        "retmax": max_results, "retmode": "json"
    }
    search_response = requests.get(search_url, params=search_params)
    ids = search_response.json().get("esearchresult", {}).get("idlist", [])
    if not ids:
        return []
    fetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
    fetch_params = {"db": "pubmed", "id": ",".join(ids), "retmode": "xml"}
    fetch_response = requests.get(fetch_url, params=fetch_params)
    root = ET.fromstring(fetch_response.content)
    papers = []
    for article in root.findall(".//PubmedArticle"):
        try:
            title = article.findtext(".//ArticleTitle") or "No Title"
            abstract = article.findtext(".//AbstractText") or "No abstract available"
            authors_list = article.findall(".//Author")
            authors = ", ".join([
                f"{a.findtext('ForeName', '')} {a.findtext('LastName', '')}".strip()
                for a in authors_list
            ])
            pmid = article.findtext(".//PMID") or ""
            year = article.findtext(".//PubDate/Year") or "Unknown"
            papers.append({
                "title": title,
                "authors": authors,
                "abstract": abstract,
                "url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
                "source": "PubMed",
                "published": year
            })
        except:
            continue
    return papers

def search_all(query: str, max_results: int = 5):
    arxiv_results = search_arxiv(query, max_results)
    pubmed_results = search_pubmed(query, max_results)
    semantic_results = search_semantic_scholar(query, max_results)
    return arxiv_results + pubmed_results + semantic_results
def search_semantic_scholar(query: str, max_results: int = 5):
    try:
        url = "https://api.semanticscholar.org/graph/v1/paper/search"
        params = {
            "query": query,
            "limit": max_results,
            "fields": "title,authors,abstract,year,externalIds,openAccessPdf"
        }
        res = requests.get(url, params=params, timeout=10)
        data = res.json()

        papers = []
        for p in data.get("data", []):
            papers.append({
                "title": p.get("title", "Unknown"),
                "authors": ", ".join([a.get("name", "") for a in p.get("authors", [])]),
                "abstract": p.get("abstract") or "No abstract available",
                "url": f"https://semanticscholar.org/paper/{p.get('paperId', '')}",
                "source": "Semantic Scholar",
                "published": str(p.get("year", "Unknown"))
            })
        return papers
    except Exception as e:
        print(f"Semantic Scholar error: {e}")
        return []