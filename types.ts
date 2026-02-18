
export interface VocalAnalysis {
  vibrato: string;
  breathiness: string;
  range: string;
  texture: string;
  technicalTips: string[];
}

export interface MixingStep {
  plugin: string;
  purpose: string;
  settings: string;
  icon: string;
}

export interface RVCStep {
  title: string;
  description: string;
  tools: string[];
  completed: boolean;
}
