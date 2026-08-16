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
    try:
        result = await request.app.state.graph.ainvoke(
            {"messages": [HumanMessage(content=req.message)]},
            config={"configurable": {"thread_id": session_id}},
        )
    except Exception:
        raise HTTPException(status_code=502, detail="assistant is temporarily unavailable, try again")
    return ChatResponse(reply=result["messages"][-1].content, session_id=session_id)
