import os
import json
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# --- Initialize FastAPI ---
app = FastAPI(
    title="Course Companion AI Agent Backend (Hackathon IV)",
    description="Groq-powered AI coaching and content streaming specialist with advanced prompt engineering.",
    version="1.0.0"
)

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Groq Client ---
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))

# --- Models ---
class ChatRequest(BaseModel):
    message: str
    context: str = ""
    history: list[dict] = []

class SummarizationRequest(BaseModel):
    content: str

# --- Constants ---
MODEL = "llama-3.3-70b-versatile"

# --- Utility Functions ---
async def groq_stream_response(messages: list) -> AsyncGenerator[str, None]:
    """Generates a streaming response from Groq's Llama model."""
    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            stream=True,
        )
        for chunk in completion:
            if chunk.choices[0].delta.content:
                yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

# --- Endpoints ---
@app.get("/health")
async def health_check():
    """Returns the health status of the backend."""
    return {"status": "ok", "service": "course-companion-backend"}

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """Provides a streaming chat interface for the Course Companion."""
    system_prompt = (
        "You are an expert AI Coach for the Panaversity Course Companion. "
        "Your mission is to help students master AI Ethics, Modern Web Design, and Hybrid AI. "
        "Instruction: Be supportive, Socratic, and deep-dive into complex concepts. "
        "If a student is stuck, offer a hint instead of the full answer. "
        "Format your responses as clean Markdown."
    )
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history for context
    for msg in request.history:
        messages.append(msg)
    
    # Add current context if provided
    current_content = f"CONTEXT (Optional): {request.context}\n\nUSER QUESTION: {request.message}"
    messages.append({"role": "user", "content": current_content})
    
    return StreamingResponse(
        groq_stream_response(messages),
        media_type="text/event-stream"
    )

@app.post("/content/summarize")
async def summarize_content(request: SummarizationRequest):
    """Summarizes course content into key takeaways using Groq."""
    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an expert summarization agent. Extract the 3 most important takeaways from this content in a bulleted list."},
                {"role": "user", "content": request.content}
            ]
        )
        return {"summary": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent/coach")
async def ai_coach(request: ChatRequest):
    """Dedicated AI coaching endpoint for behavioral and technical guidance."""
    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are a career and technical coach for Panaversity students. Offer guidance on how to build a portfolio, learn faster, and stay ethical in AI."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"advice": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
