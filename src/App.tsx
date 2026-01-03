import { useState } from 'react';
import { usePatientData } from './hooks/usePatientData';
import type { AppMode } from './types';
import { IdentificationForm } from './components/forms/IdentificationForm';
import { AnamnesisForm } from './components/forms/AnamnesisForm';
import { PhysicalExamForm } from './components/forms/PhysicalExamForm';
import { DocsForm } from './components/forms/DocsForm';
import { FinalReport } from './components/forms/FinalReport';
import { Activity, User, MessageSquare, Stethoscope, FileText, FileCheck } from 'lucide-react';

function App() {
  const { data, updateField, updateAll } = usePatientData();
  const [mode, setMode] = useState<AppMode>('OBST');
  const [activeTab, setActiveTab] = useState<'id' | 'anamnese' | 'exame' | 'docs' | 'final'>('id');

  const tabs = [
    { id: 'id', label: 'Identificação', icon: User },
    { id: 'anamnese', label: 'Anamnese ✨', icon: MessageSquare }, // Sparkles included in label for now
    { id: 'exame', label: 'Exame Físico', icon: Stethoscope },
    { id: 'docs', label: 'Docs & IA', icon: FileText },
    { id: 'final', label: 'Gerar Prontuário', icon: FileCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <header className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://i.postimg.cc/zvZch7RF/D9233933-7ECF-4893-9A6F-C8DA69D360A2.png"
              alt="Logo Plantão Obstétrico"
              className="h-24 w-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
            <div className={`p-3 rounded-xl transition-colors ${mode === 'OBST' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">MedAssist GO</h1>
              <p className={`text-xs font-bold uppercase mt-1 tracking-wide ${mode === 'OBST' ? 'text-blue-500' : 'text-pink-500'}`}>
                {mode === 'OBST' ? 'Urgência Obstétrica' : 'Consulta Ginecológica'}
              </p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setMode('OBST')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${mode === 'OBST' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              OBSTETRÍCIA
            </button>
            <button
              onClick={() => setMode('GYN')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${mode === 'GYN' ? 'bg-white text-pink-600 shadow-sm border border-pink-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              GINECOLOGIA
            </button>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="flex overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-xs font-bold uppercase whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-2 border-b-2 
                    ${isActive
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                    ${tab.id === 'final' && isActive ? '!bg-slate-800 !text-white !border-slate-800' : ''}
                    ${tab.id === 'final' && !isActive ? 'bg-slate-50 hover:bg-slate-100' : ''}
                 `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </nav>

        {/* MAIN CONTENT */}
        <main>
          {activeTab === 'id' && <IdentificationForm data={data} onChange={updateField} mode={mode} />}
          {activeTab === 'anamnese' && <AnamnesisForm data={data} onChange={updateField} mode={mode} />}
          {activeTab === 'exame' && <PhysicalExamForm data={data} onChange={updateField} />}
          {activeTab === 'docs' && <DocsForm data={data} onChange={updateField} onUpdateAll={updateAll} />}
          {activeTab === 'final' && <FinalReport data={data} onChange={updateField} mode={mode} />}
        </main>

      </div>
    </div>
  );
}

export default App;
