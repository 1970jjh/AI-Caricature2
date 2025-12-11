export interface AnalysisResult {
  syncRate: number;
  syncAnalysis: string;
  physiognomy: string;
}

export interface GenerationResult {
  caricatureImage: string; // Base64 string
  photoCaricatureImage: string; // Base64 string
  analysis: AnalysisResult;
}

export enum AppState {
  LOCKED = 'LOCKED',
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export const POSES = [
  '손하트❤️',
  'V자 포즈 ✌️',
  '엄지척 👍',
  '윙크 😉',
  '하이파이브 🙌',
  '양손 들기 🙋',
  '턱 괴기 🤔',
  '생각하는 포즈 💭',
  '점프 🦘',
  '달리기 🏃',
  '앉아있기 🪑',
  '누워있기 😴',
  '팔짱 끼기 💪',
  '손 흔들기 👋',
  '하트 그리기 💕',
  '더블 브이 ✌️✌️',
  '손가락 총 👉',
  '깍지 끼기 🙏',
  '손 모으기 🤲',
  '만세 🎉'
] as const;

export type PoseType = typeof POSES[number];