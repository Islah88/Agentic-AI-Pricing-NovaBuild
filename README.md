# 🏗️ Agentic-AI-Pricing-NovaBuild

![NovaBuild AI Architecture](https://islah88.github.io/images/novabuild.png)
![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-Agentic_AI-1c1c1c?style=for-the-badge)
![CrewAI](https://img.shields.io/badge/CrewAI-Multi_Agents-ff4b4b?style=for-the-badge)

## 📌 À Propos du Projet
**NovaBuild AI** est un système intelligent "Enterprise-Ready" qui démontre des compétences en **Orchestration Multi-Agents** et en **raisonnement complexe d'IA** (Agentic AI). Ce projet s'adresse aux défis complexes de l'industrie (comme le BTP ou la construction), où la précision des données et la conformité sont critiques.

L'objectif principal de ce projet est de montrer comment une IA peut **éviter les hallucinations** en utilisant des outils externes (calculatrice, bases de données de prix) et comment plusieurs agents IA (Juriste, Financier, Ingénieur) peuvent débattre pour fournir une réponse complète et vérifiée.

---

## 🧠 Architecture Technique (Multi-Agents)

Le projet a évolué d'un simple script Streamlit à une véritable architecture découplée (Backend API + Frontend).

- **Backend (Le "Cerveau")** : `FastAPI` (Python)
- **Frontend (Interface Utilisateur)** : `Next.js` (React, TypeScript), `TailwindCSS`
- **Orchestration IA Dynamique** : `LangGraph` (pour le graphe de décision et l'usage d'outils externes pour contourner les hallucinations)
- **Système Multi-Agents Collaboratif** : `CrewAI` (pour simuler le débat entre experts métiers : Juriste, Financier, Ingénieur)

---

## ✨ Fonctionnalités Principales

1. **Agent Autonome Anti-Hallucination (LangGraph)** :
   - L'IA ne devine pas les prix. Elle est dotée d'outils (ex: accès à une base de données de prix des matériaux de construction, calculatrice).
   - Capacité de raisonnement étape par étape (ReAct) pour extraire l'information et calculer un devis précis.
2. **Débat Multi-Agents (CrewAI)** :
   - Requête de l'utilisateur soumise à un comité d'agents IA.
   - **L'Ingénieur** valide la faisabilité technique.
   - **Le Financier** optimise les coûts et la rentabilité.
   - **Le Juriste** vérifie la conformité (normes environnementales, contrats).
   - Synthèse finale générée à partir du consensus des agents.
3. **Architecture Web** : Interface fluide via Next.js communiquant avec un moteur FastAPI.

---

## ⚙️ Installation & Lancement Local

### Prérequis
- `Python 3.10+`
- `Node.js 18+`
- Une clé API pour le LLM (ex: OpenAI, Anthropic, ou Groq selon la configuration)

### 1. Démarrer le Backend (Moteur Agents)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows : venv\Scripts\activate
pip install -r requirements.txt

# Configurer l'environnement
echo "OPENAI_API_KEY=votre_cle_ici" > .env

# Lancer FastAPI
uvicorn main:app --reload
```

### 2. Démarrer le Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 💼 Contexte de Réalisation & Objectif
Ce projet a été conçu dans un cadre d'apprentissage continu sur les conceptes nouvelles sur l'IA et son apport (eventuel) dans le secteur industriel et de la construction. 

Il illustre ma maîtrise des paradigmes de l'IA moderne :
- Passer du simple "Chatbot" à un système "Agentique" capable d'action.
- Gérer la fiabilité des LLMs en environnements d'entreprise (sécurité juridique et financière).
- Architecturer et déployer des solutions complètes (Back/Front).

---

---

## 👨‍💻 À Propos de l'Auteur

**El Islah Mhoma** — *Support IT & Management SI | Développeur Automatisation SaaS*
- Passionné par l'infrastructure, la résolution de problèmes (Support N2/N3) et la création d'outils internes pour soulager les équipes opérationnelles.
- [LinkedIn](https://linkedin.com/in/el-islah-mhoma/) | [Portfolio](https://islah88.github.io/)
