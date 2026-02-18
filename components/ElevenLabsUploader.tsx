
import React, { useState } from 'react';
import { Upload, Link as LinkIcon, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

const ElevenLabsUploader: React.FC = () => {
  const [modelId, setModelId] = useState('');
  const [status, setStatus] = useState<'idle' | 'linking' | 'linked'>('idle');

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelId) return;
    setStatus('linking');
    setTimeout(() => setStatus('linked'), 1500);
  };

  return (
    <div className="glass-card p-8 rounded-2xl space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/eleven/40/40" className="rounded-lg" alt="Logo" />
          <div>
            <h3 className="font-bold text-lg">ElevenLabs Sync</h3>
            <p className="text-xs text-slate-400">Professional Voice API Integration</p>
          </div>
        </div>
        <a href="https://elevenlabs.io" target="_blank" className="text-slate-400 hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <form onSubmit={handleLink} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Voice Model ID</label>
          <div className="relative">
            <input 
              type="text" 
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              placeholder="e.g. 21m00Tcm4TlvDq8ikWAM"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <ShieldCheck className={`w-5 h-5 ${modelId ? 'text-emerald-500' : 'text-slate-700'}`} />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={status !== 'idle' || !modelId}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            status === 'linked' 
              ? 'bg-emerald-600 text-white cursor-default' 
              : 'bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-50'
          }`}
        >
          {status === 'idle' && (
            <>
              <LinkIcon className="w-4 h-4" />
              Link Private Model
            </>
          )}
          {status === 'linking' && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Authenticating...
            </div>
          )}
          {status === 'linked' && (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Model Synchronized
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-white/5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Supports Professional Voice Cloning (PVC) models</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>High-fidelity 44.1kHz audio output</span>
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsUploader;
