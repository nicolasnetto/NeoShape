import os
from typing import List, Dict

import requests
from openai import OpenAI


Message = Dict[str, str]


def _chat_openai(messages: List[Message], temperature: float) -> str:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise ValueError("OPENAI_API_KEY não foi configurada no .env")

    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
    )

    text = response.choices[0].message.content
    return text or "(sem resposta)"


def _chat_ollama(messages: List[Message], temperature: float) -> str:
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
    model = os.getenv("OLLAMA_MODEL", "llama3.1")

    payload = {
        "model": model,
        "messages": messages,
        "stream": False,
        "options": {"temperature": temperature},
    }

    url = f"{base_url}/api/chat"
    response = requests.post(url, json=payload, timeout=120)
    response.raise_for_status()
    data = response.json()

    return data.get("message", {}).get("content", "(sem resposta)")


def chat_with_ai(messages: List[Message], temperature: float = 0.7) -> str:
    provider = os.getenv("AI_PROVIDER", "openai").strip().lower()

    if provider == "openai":
        return _chat_openai(messages, temperature)
    if provider == "ollama":
        return _chat_ollama(messages, temperature)

    raise ValueError("AI_PROVIDER inválido. Use 'openai' ou 'ollama'.")
