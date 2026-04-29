"use client";

import { useState } from "react";

export default function Dashboard() {
  // States for Chiffrage Agent
  const [surface, setSurface] = useState(1250);
  const [batiment, setBatiment] = useState("Gymnase");
  const [calcResult, setCalcResult] = useState<string | null>(null);
  const [isCalcLoading, setIsCalcLoading] = useState(false);

  // States for CrewAI Agent
  const [agentMode, setAgentMode] = useState("complet");
  const [query, setQuery] = useState("");
  const [ragResult, setRagResult] = useState<string | null>(null);
  const [isRagLoading, setIsRagLoading] = useState(false);

  const runChiffrage = async () => {
    setIsCalcLoading(true);
    setCalcResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/chiffrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surface, type_batiment: batiment })
      });
      const data = await res.json();
      setCalcResult(data.result);
    } catch (e) {
      setCalcResult("Erreur de connexion avec le Backend FastAPI. Assurez-vous que le serveur Python tourne sur le port 8000.");
    }
    setIsCalcLoading(false);
  };

  const runAnalyse = async () => {
    if (!query) return;
    setIsRagLoading(true);
    setRagResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode: agentMode })
      });
      const data = await res.json();
      setRagResult(data.result);
    } catch (e) {
      setRagResult("Erreur de connexion avec le Backend FastAPI. Assurez-vous que le serveur Python tourne sur le port 8000.");
    }
    setIsRagLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#161b22] border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-[#00C9FF]">🟢 System Status</h2>
        <div className="text-sm space-y-4 text-gray-400">
          <p><strong className="text-gray-200">🧠 LLM Core:</strong> Llama-3.3-70b</p>
          <p><strong className="text-gray-200">⚡ Backend:</strong> FastAPI (Python)</p>
          <p><strong className="text-gray-200">⚛️ Frontend:</strong> Next.js (React)</p>
          <hr className="border-gray-700" />
          <p>✅ Agent Chiffrage</p>
          <p>✅ Expert Juridique</p>
          <p>✅ Directeur Financier</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] mb-2">
          Enterprise AI Command Center
        </h1>
        <p className="text-gray-400 text-lg mb-10">Architecture de production: FastAPI (Backend) & Next.js (Frontend)</p>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { label: "Volume Chiffré par l'IA", value: "14.5 M€", delta: "+2.3 M€" },
            { label: "Précision des Estimations", value: "98.4%", delta: "+1.2%" },
            { label: "Risques Évités", value: "245 k€", delta: "Analyse Juridique" },
            { label: "Temps de Réponse", value: "1.8 sec", delta: "-4h (Humain)" }
          ].map((kpi, i) => (
            <div key={i} className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 shadow-lg hover:border-[#00C9FF] transition-all">
              <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
              <h3 className="text-3xl font-bold">{kpi.value}</h3>
              <p className="text-green-400 text-sm mt-2">{kpi.delta}</p>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column: Chiffrage */}
          <div className="bg-[#1a1a24] border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-2">🏗️ Agent Financier (LangGraph)</h3>
            <p className="text-gray-400 mb-6">Connecté en direct au serveur FastAPI.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Surface (m²): {surface}</label>
                <input 
                  type="range" min="100" max="5000" step="50" value={surface} 
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="w-full accent-[#00C9FF]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Type d'ouvrage</label>
                <select 
                  value={batiment} onChange={(e) => setBatiment(e.target.value)}
                  className="w-full bg-[#1e1e2f] border border-gray-600 rounded-lg p-3 text-white"
                >
                  <option>Gymnase</option>
                  <option>Bureaux</option>
                  <option>Collège</option>
                  <option>Hôpital</option>
                </select>
              </div>
            </div>

            <button 
              onClick={runChiffrage} disabled={isCalcLoading}
              className="w-full bg-gradient-to-r from-[#2b5876] to-[#4e4376] hover:from-[#00C9FF] hover:to-[#92FE9D] hover:text-black transition-all rounded-lg py-3 font-semibold disabled:opacity-50"
            >
              {isCalcLoading ? "Analyse en cours..." : "Lancer le Calcul IA"}
            </button>

            {calcResult && (
              <div className="mt-6 bg-[#161b22] border border-gray-600 rounded-lg p-4 text-sm text-gray-300">
                <p className="font-semibold text-green-400 mb-2">✅ Résultat de l'API Python :</p>
                <div className="whitespace-pre-wrap">{calcResult}</div>
              </div>
            )}
          </div>

          {/* Right Column: CrewAI */}
          <div className="bg-[#1a1a24] border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-2">⚖️ Cellule Multi-Agents (CrewAI)</h3>
            <p className="text-gray-400 mb-6">Orchestration complexe via Backend Python.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Sélectionnez l'interlocuteur IA</label>
                <select 
                  value={agentMode} onChange={(e) => setAgentMode(e.target.value)}
                  className="w-full bg-[#1e1e2f] border border-gray-600 rounded-lg p-3 text-white"
                >
                  <option value="complet">Équipe Complète (Décision Stratégique)</option>
                  <option value="Juridique">Expert Juridique Seul</option>
                  <option value="Ingénieur">Ingénieur Travaux Seul</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Requête du client / Extrait DCE</label>
                <textarea 
                  value={query} onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-[#1e1e2f] border border-gray-600 rounded-lg p-3 text-white h-24"
                  placeholder="Ex: Risques sur fondations, délais très courts..."
                />
              </div>
            </div>

            <button 
              onClick={runAnalyse} disabled={isRagLoading}
              className="w-full bg-gradient-to-r from-[#2b5876] to-[#4e4376] hover:from-[#00C9FF] hover:to-[#92FE9D] hover:text-black transition-all rounded-lg py-3 font-semibold disabled:opacity-50"
            >
              {isRagLoading ? "Les agents réfléchissent..." : "Lancer l'Équipe IA"}
            </button>

            {ragResult && (
              <div className="mt-6 bg-[#161b22] border border-gray-600 rounded-lg p-4 text-sm text-gray-300">
                <p className="font-semibold text-yellow-400 mb-2">✅ Rapport de l'API Python :</p>
                <div className="whitespace-pre-wrap">{ragResult}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
