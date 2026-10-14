export type SubjectId = 'physics' | 'chemistry' | 'maths';

export type Priority = 'High' | 'Medium' | 'Low';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ChapterItem {
  id: string;
  subject: SubjectId;
  chapter: string;
  avgMarks: number; // Estimated avg marks across shifts (2021-2025 PYQ)
  weightagePercent: number; // Approximate percentage of total subject paper
  difficulty: Difficulty;
  classLevel: '11th' | '12th';
  coreTopics: string[];
}

export interface ChapterProgress {
  rev1: boolean;
  rev2: boolean;
  pyq5: boolean;
  isWeak: boolean;
  notes: string;
  lastUpdated?: string;
}

export type AllProgressMap = Record<string, ChapterProgress>;

export interface SubjectStats {
  subject: SubjectId;
  totalChapters: number;
  completedChapters: number;
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  weightedPercentage: number;
  totalMarks: number;
  completedMarks: number;
}

export interface OverallStats {
  totalChapters: number;
  completedChapters: number;
  totalTasks: number;
  completedTasks: number;
  overallPercentage: number;
  weightedPercentage: number;
  totalMarks: number;
  completedMarks: number;
  weakCount: number;
  highPriorityDone: number;
  highPriorityTotal: number;
}

export interface ExamPreset {
  id: string;
  name: string;
  date: string; // ISO string or YYYY-MM-DD
  description: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progressPercent: number;
  maxRequirement: string;
}
