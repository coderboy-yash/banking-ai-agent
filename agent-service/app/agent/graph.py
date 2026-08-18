from langchain_core.messages import SystemMessage
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition

from app.agent.llm import get_llm
from app.agent.prompts import BANK_SYSTEM_PROMPT, PERSONAL_SYSTEM_PROMPT
from app.agent.state import ChatState
from app.agent.tools_bank import TOOLS as TOOLS_BANK
from app.agent.tools_personal import TOOLS_PERSONAL


def _build_graph(checkpointer, system_prompt, tools):
    llm_with_tools = get_llm().bind_tools(tools)

    def chatbot_node(state: ChatState) -> dict:
        response = llm_with_tools.invoke([SystemMessage(content=system_prompt), *state["messages"]])
        return {"messages": [response]}

    graph = StateGraph(ChatState)
    graph.add_node("chatbot", chatbot_node)
    graph.add_node("tools", ToolNode(tools))
    graph.add_edge(START, "chatbot")
    graph.add_conditional_edges("chatbot", tools_condition, {"tools": "tools", END: END})
    graph.add_edge("tools", "chatbot")
    return graph.compile(checkpointer=checkpointer)


def build_bank_graph(checkpointer):
    return _build_graph(checkpointer, BANK_SYSTEM_PROMPT, TOOLS_BANK)


def build_personal_graph(checkpointer):
    return _build_graph(checkpointer, PERSONAL_SYSTEM_PROMPT, TOOLS_PERSONAL)
