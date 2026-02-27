from .config import get_config
from .indexer import load_query_engine


def run_chat() -> None:
    config = get_config()
    query_engine = load_query_engine(config)

    print("Chat pronto! Digite sua pergunta (ou 'sair' para encerrar).")
    while True:
        question = input("\nVocê: ").strip()
        if not question:
            continue
        if question.lower() in {"sair", "exit", "quit"}:
            print("Até mais!")
            break

        response = query_engine.query(question)
        print(f"\nAssistente: {response}")
