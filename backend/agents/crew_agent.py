from crewai import Agent, Task, Crew, Process

def run_crew_analysis(query: str, mode: str) -> str:
    llm_model = 'groq/llama-3.3-70b-versatile'

    agent_juriste = Agent(
        role='Expert Juridique BTP',
        goal="Identifier les risques juridiques dans les appels d'offres.",
        backstory="Avocat spécialisé BTP, expert en pénalités et clauses.",
        verbose=False,
        llm=llm_model
    )

    agent_financier = Agent(
        role='Directeur Financier',
        goal="Évaluer la rentabilité et les risques financiers.",
        backstory="CFO obsédé par les marges.",
        verbose=False,
        llm=llm_model
    )
    
    agent_ingenieur = Agent(
        role='Ingénieur Travaux (Expert REX)',
        goal="Identifier les risques techniques (sols, fondations, etc.).",
        backstory="Ingénieur chantier avec 30 ans d'expérience.",
        verbose=False,
        llm=llm_model
    )

    if mode == "Juridique":
        agents = [agent_juriste]
        tache = Task(
            description=f"Analyse cette requête d'un point de vue purement juridique: '{query}'",
            expected_output="Analyse juridique détaillée.",
            agent=agent_juriste
        )
        tasks = [tache]
    elif mode == "Ingénieur":
        agents = [agent_ingenieur]
        tache = Task(
            description=f"Analyse cette requête d'un point de vue purement technique/terrain: '{query}'",
            expected_output="Analyse technique et REX.",
            agent=agent_ingenieur
        )
        tasks = [tache]
    else:
        # Mode complet
        agents = [agent_ingenieur, agent_juriste, agent_financier]
        t1 = Task(description=f"Analyse technique de: '{query}'", expected_output="Rapport technique court", agent=agent_ingenieur)
        t2 = Task(description=f"Analyse juridique de: '{query}'", expected_output="Rapport juridique court", agent=agent_juriste)
        t3 = Task(description="Lis les rapports tech et juridique. Donne une décision finale GO/NO GO claire et justifiée.", expected_output="Décision finale", agent=agent_financier)
        tasks = [t1, t2, t3]

    equipe = Crew(
        agents=agents,
        tasks=tasks,
        process=Process.sequential,
        verbose=False
    )
    
    resultat = equipe.kickoff()
    return str(resultat)
