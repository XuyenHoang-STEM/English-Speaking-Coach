export type EntityId = string;
export type IsoDateTime = string;

export type LearnerLevel = 'A2' | 'A2_B1' | 'B1';

export interface Project {
  id: EntityId;
  name: string;
  goal: string;
  targetEventAt?: IsoDateTime;
  learnerLevel: LearnerLevel;
  status: 'active' | 'archived';
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}
export interface Material {
  id: EntityId;
  projectId: EntityId;
  title: string;
  kind: 'pasted_text' | 'note' | 'file';
  status: 'ready' | 'processing' | 'failed';
  content?: string;
  createdAt: IsoDateTime;
}

export interface Persona {
  name: string;
  role: string;
  communicationGoal: string;
  notes?: string;
}

export interface Scenario {
  id: EntityId;
  projectId: EntityId;
  title: string;
  learnerGoal: string;
  situation: string;
  persona?: Persona;
  sourceMaterialIds: EntityId[];
}

export interface PreparationPlan {
  id: EntityId;
  projectId: EntityId;
  title: string;
  scenarioIds: EntityId[];
  status: 'draft' | 'accepted';
  revision: number;
  generatedBy?: AiArtifactProvenance;
  updatedAt: IsoDateTime;
}

export interface PracticeAttempt {
  id: EntityId;
  projectId: EntityId;
  scenarioId: EntityId;
  sequence: number;
  transcript: string;
  confidence?: 1 | 2 | 3 | 4 | 5;
  createdAt: IsoDateTime;
}

export interface FeedbackObservation {
  category: 'clarity' | 'grammar' | 'vocabulary' | 'pronunciation';
  original?: string;
  suggestion: string;
  explanationVi?: string;
}

export interface CoachFeedback {
  id: EntityId;
  attemptId: EntityId;
  understoodIntent: string;
  observations: FeedbackObservation[];
  speakableVersion: string;
  retryPrompt: string;
  followUpQuestion?: string;
  limitations: string[];
  generatedBy: AiArtifactProvenance;
}

export interface ReadinessSignal {
  key: 'plan_coverage' | 'scenario_coverage' | 'recent_retries' | 'confidence';
  label: string;
  value: number;
  weight: number;
  explanation: string;
}

export interface ReadinessSnapshot {
  projectId: EntityId;
  value: number;
  signals: ReadinessSignal[];
  calculatedAt: IsoDateTime;
}

export interface AiArtifactProvenance {
  provider: string;
  model: string;
  contractVersion: string;
  sourceMaterialIds: EntityId[];
  generatedAt: IsoDateTime;
}
