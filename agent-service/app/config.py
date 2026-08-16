import os
import sys

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    sys.exit("GROQ_API_KEY is not set")

GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
PORT = int(os.getenv("PORT", "8001"))
CHECKPOINT_DB_PATH = os.getenv("CHECKPOINT_DB_PATH", "checkpoints.sqlite")
