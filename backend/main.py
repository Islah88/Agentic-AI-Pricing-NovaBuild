from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.chiffrage_agent import run_dynamic_agent
from agents.crew_agent import run_crew_analysis

app = FastAPI(title="NovaBuild Enterprise API")

# Configuration CORS pour autoriser le frontend Next.js (port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChiffrageRequest(BaseModel):
    surface: float
    type_batiment: str

class AnalyseRequest(BaseModel):
    query: str
    mode: str = "complet"

@app.get("/")
def read_root():
    return {"status": "NovaBuild API is running"}

@app.post("/api/chiffrage")
def chiffrage(request: ChiffrageRequest):
    question = f"Je dois chiffrer un {request.type_batiment} de {request.surface} m2. Quel est le prix estimé ?"
    response = run_dynamic_agent(question)
    return {"result": response}

@app.post("/api/analyse")
def analyse(request: AnalyseRequest):
    response = run_crew_analysis(request.query, request.mode)
    return {"result": response}
