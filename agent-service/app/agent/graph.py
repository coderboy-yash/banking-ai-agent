from langchain_core.messages import SystemMessage
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition

from app.agent.llm import get_llm
from app.agent.prompts import SYSTEM_PROMPT
from app.agent.state import ChatState
from app.agent.tools import TOOLS


def build_graph(checkpointer):
    llm_with_tools = get_llm().bind_tools(TOOLS)

    def chatbot_node(state: ChatState) -> dict:
        response = llm_with_tools.invoke([SystemMessage(content=SYSTEM_PROMPT), *state["messages"]])
        return {"messages": [response]}

    graph = StateGraph(ChatState)
    graph.add_node("chatbot", chatbot_node)
    graph.add_node("tools", ToolNode(TOOLS))
    graph.add_edge(START, "chatbot")
    graph.add_conditional_edges("chatbot", tools_condition, {"tools": "tools", END: END})
    graph.add_edge("tools", "chatbot")
    return graph.compile(checkpointer=checkpointer)
