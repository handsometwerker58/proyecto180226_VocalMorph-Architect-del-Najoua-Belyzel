
import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  Settings2, 
  Music, 
  CheckCircle2, 
  Upload, 
  Zap, 
  Info,
  Waves,
  Cpu,
  AudioLines
} from 'lucide-react';
import { analyzeVocalStyle } from './services/geminiService';
import { VocalAnalysis, MixingStep, RVCStep } from './types';
import VocalAnalyzer from './components/VocalAnalyzer';
import ElevenLabsUploader from './components/ElevenLabsUploader';
import RVCWorkflow from './components/RVCWorkflow';
import MixingCheatSheet from './components/MixingCheatSheet';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'cloning' | 'mixing'>('analysis');
  const [analysis, setAnalysis] = useState<VocalAnalysis | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  useEffect(() => {
    handleFetchAnalysis();
  }, []);

  const handleFetchAnalysis = async () => {
    setIsLoadingAnalysis(true);
    try {
      const result = await analyzeVocalStyle("Najoua Belyzel");
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to fetch analysis", error);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg shadow-violet-900/20">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            VocalMorph <span className="text-violet-400">Architect</span>
          </h1>
        </div>
        
        <nav className="flex gap-1">
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'analysis' ? 'bg-violet-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            Artist Analysis
          </button>
          <button 
            onClick={() => setActiveTab('cloning')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'cloning' ? 'bg-violet-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            ElevenLabs & RVC
          </button>
          <button 
            onClick={() => setActiveTab('mixing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'mixing' ? 'bg-violet-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            Mixing Cheat Sheet
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
        {/* Dynamic Content Based on Tab */}
        {activeTab === 'analysis' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Najoua Belyzel Study</h2>
              <p className="text-slate-400">Deconstructing the vocal profile for precise cloning and emulation.</p>
            </div>
            <VocalAnalyzer analysis={analysis} isLoading={isLoadingAnalysis} />
          </section>
        )}

        {activeTab === 'cloning' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Voice Assets</h2>
                <p className="text-slate-400">Integration and conversion pipeline management.</p>
              </div>
              <ElevenLabsUploader />
            </div>
            <div className="space-y-8">
               <RVCWorkflow />
            </div>
          </section>
        )}

        {activeTab === 'mixing' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Synth-Pop Mixing Suite</h2>
              <p className="text-slate-400">Ableton Live processing chain for high-end vocal transparency.</p>
            </div>
            <MixingCheatSheet />
          </section>
        )}
      </main>

      <footer className="mt-20 border-t border-white/5 p-12 text-center text-slate-500 text-sm">
        <p>© 2024 VocalMorph Architect | Professional Grade Music Technology Workflows</p>
      </footer>
    </div>
  );
};

export default App;
