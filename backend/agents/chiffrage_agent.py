import os
from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

@tool
def consulter_base_de_prix(type_batiment: str) -> str:
    """Consulte la base de données de NovaBuild pour trouver le prix au m2."""
    prix_au_m2 = {"gymnase": 1500.0, "college": 2200.0, "bureaux": 1800.0, "hopital": 3000.0}
    type_normalise = type_batiment.lower()
    # Gestion des accents basique
    if "ô" in type_normalise: type_normalise = type_normalise.replace("ô", "o")
    if type_normalise in prix_au_m2:
        return f"Le prix de base pour {type_batiment} est de {prix_au_m2[type_normalise]} €/m2."
    return "Erreur: Type de bâtiment inconnu dans la base."

@tool
def calculatrice_universelle(expression_mathematique: str) -> str:
    """Évalue N'IMPORTE QUELLE expression mathématique pure."""
    try:
        resultat = eval(expression_mathematique)
        return str(resultat)
    except Exception as e:
        return f"Erreur dans l'expression mathématique : {e}"

tools = [consulter_base_de_prix, calculatrice_universelle]

def run_dynamic_agent(question: str) -> str:
    llm = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0)
    agent_executor = create_react_agent(llm, tools)
    
    system_prompt = (
        "Tu es l'Agent Financier de NovaBuild. "
        "1. Cherche le prix avec 'consulter_base_de_prix'. "
        "2. Calcule le total avec 'calculatrice_universelle'. "
        "3. Ajoute une courte recommandation sur les risques (ex: étude de sol)."
    )

    response = agent_executor.invoke({
        "messages": [("system", system_prompt), ("user", question)]
    })
    
    return response["messages"][-1].content
