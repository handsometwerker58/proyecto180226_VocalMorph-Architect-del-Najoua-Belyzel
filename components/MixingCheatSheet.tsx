
import React from 'react';
import { MixingStep } from '../types';
import { AudioLines, Zap, Mic, Sliders, Waves } from 'lucide-react';

const STEPS: MixingStep[] = [
  { 
    plugin: 'Subtractive EQ', 
    purpose: 'Remove mud and resonance', 
    settings: 'High pass at 120Hz. Notch out 250Hz -3dB (the "RVC Boxiness").', 
    icon: 'sliders' 
  },
  { 
    plugin: 'OTT / Multiband', 
    purpose: 'The "Pop" sheen', 
    settings: 'Amount 20%. Boost highs. Tame the mid-range transients.', 
    icon: 'zap' 
  },
  { 
    plugin: 'Exciter / Saturator', 
    purpose: 'Add harmonic presence', 
    settings: 'Tube mode. Drive +3dB. Mix 10% for air (20kHz+).', 
    icon: 'waves' 
  },
  { 
    plugin: 'Parallel Compression', 
    purpose: 'Stable volume / Consistency', 
    settings: 'Fast attack, fast release. 4:1 Ratio. Smash and blend in 30%.', 
    icon: 'audio-lines' 
  },
  { 
    plugin: 'Plate Reverb', 
    purpose: 'Synth-Pop space', 
    settings: 'Pre-delay 15ms. Decay 2.1s. Sidechain to dry vocal.', 
    icon: 'mic' 
  },
];

const MixingCheatSheet: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Visual Rack */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {STEPS.map((step, i) => (
          <div 
            key={i} 
            className="flex-1 glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform"
          >
            {/* Background Icon Watermark */}
            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 group-hover:rotate-0 transition-transform">
               <AudioLines className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.2em] mb-4 block">Insert {i + 1}</span>
              <h3 className="text-xl font-bold mb-2">{step.plugin}</h3>
              <p className="text-xs text-slate-400 mb-6 font-medium bg-white/5 px-3 py-1 rounded-full w-fit">
                {step.purpose}
              </p>
              
              <div className="bg-slate-900 rounded-xl p-4 border border-white/5">
                <p className="text-sm text-slate-300 font-mono leading-relaxed">
                  {step.settings}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
          <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Vocal Alignment Tip
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Since RVC can introduce artifacts in the high end, use a **De-Esser** after your saturator but before your Reverb. This prevents the "digital fizz" from triggering the reverb's tail, which is common in breathy voices like Najoua's.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20">
          <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Spatial Positioning
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            For true Synth-Pop width, use **Parallel Wide Vocals**. Duplicate the vocal track, pitch shift up 7 cents on one and down 7 cents on the other. Pan L/R 100%. Low cut at 500Hz. Blend them -15dB below the main mono vocal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MixingCheatSheet;
