# NeoShape - Chat com LlamaIndex + Ollama

Projeto simples em **Python** para fazer perguntas sobre arquivos locais.

## Como funciona

1. Você coloca documentos na pasta `knowledge_base/`.
2. O script `scripts/ingest.py` cria um índice vetorial com LlamaIndex.
3. O script `scripts/chat.py` abre um chat no terminal e responde usando esse índice.

## Estrutura

```text
NeoShape/
├─ knowledge_base/        # Coloque aqui seus .txt, .md, .pdf etc.
├─ scripts/
│  ├─ ingest.py           # Gera/atualiza o índice
│  └─ chat.py             # Chat no terminal
├─ src/neo_ollama_chat/
│  ├─ config.py           # Configurações via .env
│  ├─ indexer.py          # Criação e carga do índice
│  └─ chat.py             # Loop de conversa
├─ .env.example
├─ requirements.txt
└─ README.md
```

## Pré-requisitos

- Python 3.10+
- Ollama rodando localmente
- Modelos baixados no Ollama (exemplo):

```bash
ollama pull llama3.1
ollama pull nomic-embed-text
```

## Instalação

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

> Se necessário, ajuste os modelos no `.env`.

## Uso

### 1) Adicione conteúdo

Coloque seus arquivos em `knowledge_base/`.

### 2) Gere o índice

```bash
PYTHONPATH=src python scripts/ingest.py
```

### 3) Inicie o chat

```bash
PYTHONPATH=src python scripts/chat.py
```

Digite sua pergunta. Para sair, use `sair`.

## Observações

- Sempre que alterar os documentos, rode novamente o `ingest.py`.
- O índice é salvo em `storage/index`.
