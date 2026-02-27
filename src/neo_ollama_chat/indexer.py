from llama_index.core import Settings, StorageContext, VectorStoreIndex, load_index_from_storage
from llama_index.core.readers import SimpleDirectoryReader
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.ollama import Ollama

from .config import AppConfig


def _apply_models(config: AppConfig) -> None:
    Settings.llm = Ollama(model=config.llm_model, base_url=config.ollama_base_url)
    Settings.embed_model = OllamaEmbedding(model_name=config.embed_model, base_url=config.ollama_base_url)


def build_index(config: AppConfig) -> None:
    if not config.knowledge_dir.exists():
        raise FileNotFoundError(f"Pasta de conhecimento não encontrada: {config.knowledge_dir}")

    _apply_models(config)
    docs = SimpleDirectoryReader(str(config.knowledge_dir)).load_data()
    if not docs:
        raise ValueError("Nenhum documento encontrado para indexação.")

    index = VectorStoreIndex.from_documents(docs)
    config.index_dir.mkdir(parents=True, exist_ok=True)
    index.storage_context.persist(str(config.index_dir))


def load_query_engine(config: AppConfig):
    if not config.index_dir.exists():
        raise FileNotFoundError(
            "Índice não encontrado. Rode o comando de ingestão primeiro: python scripts/ingest.py"
        )

    _apply_models(config)
    storage = StorageContext.from_defaults(persist_dir=str(config.index_dir))
    index = load_index_from_storage(storage)
    return index.as_query_engine(similarity_top_k=3)
