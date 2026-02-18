
import React, { useState } from 'react';
import { CheckCircle2, Circle, Zap, Terminal, Music2, Cpu } from 'lucide-react';
import { RVCStep } from '../types';

const INITIAL_STEPS: RVCStep[] = [
  { 
    title: 'Acapella Extraction', 
    description: 'Use UVR5 (Ultimate Vocal Remover) with MDX-Net models to isolate Najoua\'s dry vocal from the synth-pop instrumental.', 
    tools: ['UVR5', 'MDX-Net'], 
    completed: false 
  },
  { 
    title: 'Input Alignment', 
    description: 'Ensure your ElevenLabs reference voice matches the target song\'s BPM and key for better prosody mapping.', 
    tools: ['Ableton Live', 'Melodyne'], 
    completed: false 
  },
  { 
    title: 'RVC Inference', 
    description: 'Run the RVC WebUI. Select your custom .pth and .index files. Set F0 method to "rmvpe" for best pitch tracking.', 
    tools: ['RVC-WebUI', 'RMVPE'], 
    completed: false 
  },
  { 
    title: 'Spectral Matching', 
    description: 'Apply the RVC index rate (0.3 - 0.7) to blend original timbre with the user model characteristics.', 
    tools: ['Python', 'RVC Index'], 
    completed: false 
  }
];

const RVCWorkflow: React.FC = () => {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const toggleStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
  };

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Zap className="w-6 h-6 text-violet-400" />
        <h3 className="text-xl font-bold">RVC Implementation Guide</h3>
      </div>

      <div className="space-y-6">
        {steps.map((step, i) => (
          <div 
            key={i} 
            onClick={() => toggleStep(i)}
            className={`flex gap-4 p-4 rounded-xl cursor-pointer border transition-all ${
              step.completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="shrink-0 mt-1">
              {step.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <Circle className="w-6 h-6 text-slate-700" />
              )}
            </div>
            <div>
              <h4 className={`font-bold mb-1 transition-colors ${step.completed ? 'text-emerald-400' : 'text-slate-100'}`}>
                {step.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">{step.description}</p>
              <div className="flex gap-2">
                {step.tools.map((tool, j) => (
                  <span key={j} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-slate-500 border border-white/5">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-dashed border-white/10 flex items-center gap-4">
        <Terminal className="w-5 h-5 text-slate-500" />
        <p className="text-xs text-slate-500 font-mono">Ready for inference: user_model_v2_f0_rmvpe.pth</p>
      </div>
    </div>
  );
};

export default RVCWorkflow;
