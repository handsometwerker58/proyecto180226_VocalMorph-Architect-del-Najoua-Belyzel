
import React from 'react';
import { VocalAnalysis } from '../types';
import { Waves, Wind, Layers, Music, Lightbulb, Loader2 } from 'lucide-react';

interface Props {
  analysis: VocalAnalysis | null;
  isLoading: boolean;
}

const VocalAnalyzer: React.FC<Props> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 glass-card rounded-2xl">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Analyzing Najoua's vocal frequency response...</p>
      </div>
    );
  }

  if (!analysis) return null;

  const dataPoints = [
    { label: 'Vibrato', value: analysis.vibrato, icon: <Waves className="w-5 h-5" />, color: 'text-cyan-400' },
    { label: 'Breathiness', value: analysis.breathiness, icon: <Wind className="w-5 h-5" />, color: 'text-blue-400' },
    { label: 'Range', value: analysis.range, icon: <Music className="w-5 h-5" />, color: 'text-purple-400' },
    { label: 'Texture', value: analysis.texture, icon: <Layers className="w-5 h-5" />, color: 'text-pink-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataPoints.map((point, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <div className={`${point.color} mb-3`}>{point.icon}</div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{point.label}</h3>
            <p className="text-slate-100 text-lg leading-snug">{point.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border-violet-500/20">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold">Pro-Cloning Insight: Emulating the 'Najoua Edge'</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {analysis.technicalTips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-slate-300">
              <span className="text-violet-500 font-bold shrink-0">{i + 1}.</span>
              <span className="text-sm lg:text-base leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VocalAnalyzer;
