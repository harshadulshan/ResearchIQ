from groq import Groq

GROQ_API_KEY = "your_groq_api_key_here get one at https://groq.com/console/api-keys"

def chat_with_paper(paper_title: str, paper_abstract: str, user_message: str, history: list):
    client = Groq(api_key=GROQ_API_KEY)

    system_prompt = f"""You are ResearchIQ, an AI research assistant.
You are helping the user understand this research paper:

Title: {paper_title}
Abstract: {paper_abstract}

Answer questions clearly and helpfully about this paper."""

    messages = [{"role": "system", "content": system_prompt}]

    for h in history:
        role = h.role if hasattr(h, 'role') else h["role"]
        message = h.message if hasattr(h, 'message') else h["message"]
        messages.append({"role": role, "content": message})

    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        max_tokens=1024
    )

    return response.choices[0].message.content