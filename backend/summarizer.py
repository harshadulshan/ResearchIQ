import re

def simple_summarize(text: str, sentences: int = 4) -> str:
    text = re.sub(r'\s+', ' ', text).strip()
    split = re.split(r'(?<=[.!?]) +', text)
    selected = split[:sentences]
    return ' '.join(selected)

def extract_keywords(text: str) -> list:
    stopwords = set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to',
        'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were',
        'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
        'would', 'could', 'should', 'may', 'might', 'this', 'that', 'these',
        'those', 'we', 'our', 'us', 'it', 'its', 'as', 'which', 'who',
        'also', 'not', 'no', 'can', 'such', 'than', 'more', 'their'
    ])
    words = re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())
    freq = {}
    for word in words:
        if word not in stopwords:
            freq[word] = freq.get(word, 0) + 1
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [w[0] for w in sorted_words[:8]]

def summarize_paper(abstract: str) -> str:
    if not abstract or len(abstract) < 100:
        return abstract or 'No abstract available'

    summary = simple_summarize(abstract, sentences=4)
    keywords = extract_keywords(abstract)

    if keywords:
        keyword_str = ', '.join(keywords[:5])
        summary += f' [Key topics: {keyword_str}]'

    return summary