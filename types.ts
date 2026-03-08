export enum Level {
  A2_B1 = 'A2_B1',
  B1_SOLID = 'B1_SOLID',
}

export enum TaskType {
  MINI_SPEAKING = 'Mini Speaking Task (1–2 phút)',
  ROLE_PLAY = 'Role-play with Coach',
  DEEP_QUESTION = 'Deep Question Practice',
  PICTURE_BASED = 'Picture-based Speaking',
  SUMMARIZE = 'Summarize & React',
  SHADOWING = 'Shadowing Script',
}

export enum Topic {
  COLLABORATION = 'Collaboration & Future Skills',
  AI_LITERACY = 'AI Literacy in Schools',
  BURNOUT = 'Burnout & Wellbeing',
  VN_VS_GLOBAL = 'Vietnam vs. Global Practices',
  WORKSHOPS = 'I Can School Workshops',
  REAL_SITUATION = 'Tình huống giao tiếp thực tế (Ấn Độ)',
}

export interface VocabItem {
  word: string;
  definition: string;
  vnMeaning: string;
  example: string;
}

export interface PronunciationTip {
  word: string;
  tip: string;
  phonetic?: string;
}

export interface ShadowingChunk {
  text: string; // Text with CAPS for stress and || for pauses
  pace: string;
}

export interface ShadowingData {
  script: string;
  chunks: ShadowingChunk[];
  keywords: string[];
}

export interface FeedbackData {
  mistakes: { original: string; correction: string; explanation: string }[];
  improvedVersion: string;
  whyBetter: string;
  patterns: string[];
  followUpQuestions: string[];
  pronunciation: PronunciationTip[];
  vocabUsed: string[];
  intonationTips?: string[]; // Specific for shadowing
}

export interface TaskData {
  title: string;
  instructionsVN: string;
  instructionsEN: string[];
  context?: string; // Extra context from PDF
  shadowingData?: ShadowingData; // Specific for shadowing task
}

export interface HistoryItem {
  id: string;
  date: Date;
  task: string;
  duration: number;
  score: number; // 0-100 complexity proxy
  improvement: number; // % error reduction proxy
}

// Speech Recognition Types Shim
export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: (event: any) => void;
}

export interface WindowWithSpeech extends Window {
  SpeechRecognition: { new (): SpeechRecognition };
  webkitSpeechRecognition: { new (): SpeechRecognition };
}