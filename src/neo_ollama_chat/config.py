from dataclasses import dataclass
from pathlib import Path
import os

from dotenv import load_dotenv


load_dotenv()


@dataclass(frozen=True)
class AppConfig:
    ollama_base_url: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    llm_model: str = os.getenv("OLLAMA_LLM_MODEL", "llama3.1")
    embed_model: str = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")
    index_dir: Path = Path(os.getenv("INDEX_DIR", "storage/index"))
    knowledge_dir: Path = Path(os.getenv("KNOWLEDGE_DIR", "knowledge_base"))


def get_config() -> AppConfig:
    return AppConfig()
