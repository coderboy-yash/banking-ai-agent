from uuid import uuid4

from fastapi import APIRouter, HTTPException, Request
from langchain_core.messages import HumanMessage

from app.api.schemas import ChatRequest, ChatResponse

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, request: Request):
    session_id = req.session_id or str(uuid4())
    thread_id = f"{session_id}:{req.mode}"

    auth_header = request.headers.get("authorization", "")
    auth_token = auth_header[7:].strip() if auth_header.lower().startswith("bearer ") else None

    graph = request.app.state.personal_graph if req.mode == "personal" else request.app.state.bank_graph
    try:
        result = await graph.ainvoke(
            {"messages": [HumanMessage(content=req.message)]},
            config={"configurable": {"thread_id": thread_id, "auth_token": auth_token}},
        )
    except Exception:
        raise HTTPException(status_code=502, detail="assistant is temporarily unavailable, try again")
    return ChatResponse(reply=result["messages"][-1].content, session_id=session_id)
