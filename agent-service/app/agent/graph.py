from langchain_core.messages import SystemMessage
from langgraph.graph import END, START, StateGraph

from app.agent.llm import get_llm
from app.agent.prompts import SYSTEM_PROMPT
from app.agent.state import ChatState


def chatbot_node(state: ChatState) -> dict:
    llm = get_llm()
    response = llm.invoke([SystemMessage(content=SYSTEM_PROMPT), *state["messages"]])
    return {"messages": [response]}


def build_graph(checkpointer):
    graph = StateGraph(ChatState)
    graph.add_node("chatbot", chatbot_node)
    graph.add_edge(START, "chatbot")
    graph.add_edge("chatbot", END)
    return graph.compile(checkpointer=checkpointer)
