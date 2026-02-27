from neo_ollama_chat.config import get_config
from neo_ollama_chat.indexer import build_index


if __name__ == "__main__":
    cfg = get_config()
    build_index(cfg)
    print(f"Índice criado em: {cfg.index_dir}")
