# NeoShape AI Starter (pronto para VS Code)

Projeto pronto para baixar, abrir no VS Code e rodar um app de IA com chat.

## Como baixar o projeto

Você pode baixar de 2 formas:

### Opção 1 (recomendado): Git clone

```bash
git clone <URL_DO_REPOSITORIO>
cd NeoShape
```

### Opção 2: Download ZIP

1. Clique em **Code** no GitHub.
2. Clique em **Download ZIP**.
3. Extraia o arquivo e abra a pasta no VS Code.

## O que este projeto entrega

- App web de chat com IA usando **Streamlit**.
- Suporte a 2 modos:
  - **OpenAI API** (GPT) via chave de API.
  - **Ollama local** (sem custo de API, rodando localmente).
- Estrutura simples e organizada para você evoluir rápido.

## Estrutura

```bash
.
├── app.py
├── ai_client.py
├── requirements.txt
└── .env.example
```

## 1) Abrir no VS Code

1. Baixe/clone este projeto.
2. Abra a pasta no VS Code.
3. Abra o terminal integrado.

## 2) Criar ambiente virtual e instalar dependências

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Windows (PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 3) Configurar variáveis

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Depois edite `.env`.

### Opção A: OpenAI

```env
AI_PROVIDER=openai
OPENAI_API_KEY=coloque_sua_chave_aqui
OPENAI_MODEL=gpt-4o-mini
```

### Opção B: Ollama local

1. Instale o Ollama: https://ollama.com
2. Baixe um modelo (exemplo):

```bash
ollama pull llama3.1
```

3. Configure `.env`:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
```

## 4) Rodar

```bash
streamlit run app.py
```

## 5) Funcionalidades prontas

- Chat com histórico em sessão.
- Controle de temperatura no sidebar.
- Botão para limpar conversa.
- Tratamento de erro amigável.

## Próximos passos (opcional)

- Adicionar upload de PDF e RAG.
- Salvar histórico em banco.
- Autenticação de usuários.
- Deploy em Render, Railway, Fly.io ou VPS.
