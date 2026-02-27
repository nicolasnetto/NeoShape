import streamlit as st
from dotenv import load_dotenv

from ai_client import chat_with_ai


load_dotenv()

st.set_page_config(page_title="NeoShape AI Chat", page_icon="🤖", layout="centered")
st.title("🤖 NeoShape AI Chat")
st.caption("Projeto pronto para você abrir no VS Code e rodar.")

with st.sidebar:
    st.header("Configuração")
    temperature = st.slider("Temperatura", min_value=0.0, max_value=1.5, value=0.7, step=0.1)
    if st.button("🧹 Limpar conversa"):
        st.session_state["messages"] = [
            {"role": "system", "content": "Você é um assistente útil e objetivo."}
        ]
        st.rerun()

if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "system", "content": "Você é um assistente útil e objetivo."}
    ]

for msg in st.session_state["messages"]:
    if msg["role"] == "system":
        continue
    with st.chat_message("user" if msg["role"] == "user" else "assistant"):
        st.markdown(msg["content"])

prompt = st.chat_input("Digite sua pergunta...")

if prompt:
    st.session_state["messages"].append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Pensando..."):
            try:
                answer = chat_with_ai(st.session_state["messages"], temperature=temperature)
            except Exception as exc:
                answer = f"❌ Erro ao gerar resposta: {exc}"
            st.markdown(answer)

    st.session_state["messages"].append({"role": "assistant", "content": answer})
