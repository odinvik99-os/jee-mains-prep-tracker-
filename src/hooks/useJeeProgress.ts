import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  AllProgressMap,
  ChapterItem,
  ChapterProgress,
  OverallStats,
  SubjectId,
  SubjectStats,
  AchievementBadge
} from '../types/jee';
import { ALL_CHAPTERS, PHYSICS_CHAPTERS, CHEMISTRY_CHAPTERS, MATHS_CHAPTERS, getPriority } from '../data/chapters';
import { sound } from '../utils/audio';
import { fireChapterCompletionConfetti, fireGrandCelebration } from '../utils/confetti';

const STORAGE_KEY = 'jee_prep_progress_v2';
const SETTINGS_KEY = 'jee_prep_settings_v2';

const DEFAULT_EXAM_DATE = '2026-01-22'; // Default to JEE Main 2026 Session 1

const getTodayString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysDifference = (dateStr1: string, dateStr2: string) => {
  const d1 = new Date(dateStr1).getTime();
  const d2 = new Date(dateStr2).getTime();
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export function useJeeProgress() {
  // Load progress map
  const [progress, setProgress] = useState<AllProgressMap>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved JEE progress', e);
    }
    const initial: AllProgressMap = {};
    ALL_CHAPTERS.forEach((c) => {
      initial[c.id] = { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
    });
    return initial;
  });

  // Settings
  const [weightedMode, setWeightedMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.weightedMode);
      }
    } catch {}
    return false;
  });

  const [examDate, setExamDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.examDate || DEFAULT_EXAM_DATE;
      }
    } catch {}
    return DEFAULT_EXAM_DATE;
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.streak || 0;
      }
    } catch {}
    return 1;
  });

  const [lastStudiedDate, setLastStudiedDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.lastStudiedDate || getTodayString();
      }
    } catch {}
    return getTodayString();
  });

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          weightedMode,
          examDate,
          streak,
          lastStudiedDate
        })
      );
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [weightedMode, examDate, streak, lastStudiedDate]);

  // Record daily study activity for streak
  const recordActivity = useCallback(() => {
    const today = getTodayString();
    if (lastStudiedDate === today) {
      return; // Already recorded today
    }

    const diffDays = getDaysDifference(lastStudiedDate, today);
    if (diffDays === 1) {
      // Studied consecutive day
      setStreak((prev) => prev + 1);
    } else {
      // Streak reset to 1
      setStreak(1);
    }
    setLastStudiedDate(today);
  }, [lastStudiedDate]);

  // Toggle chapter task
  const toggleTask = useCallback(
    (chapterId: string, taskKey: 'rev1' | 'rev2' | 'pyq5') => {
      setProgress((prev) => {
        const current = prev[chapterId] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
        const nextValue = !current[taskKey];
        const updated: ChapterProgress = {
          ...current,
          [taskKey]: nextValue,
          lastUpdated: new Date().toISOString()
        };

        // Play subtle sound
        sound.playTick(nextValue);
        recordActivity();

        // Check if now all 3 are completed
        const isCompleteNow = updated.rev1 && updated.rev2 && updated.pyq5;
        const wasCompleteBefore = current.rev1 && current.rev2 && current.pyq5;

        if (isCompleteNow && !wasCompleteBefore) {
          setTimeout(() => {
            sound.playCompletionFanfare();
            fireChapterCompletionConfetti();
          }, 60);
        }

        return {
          ...prev,
          [chapterId]: updated
        };
      });
    },
    [recordActivity]
  );

  // Toggle weak chapter star
  const toggleWeak = useCallback((chapterId: string) => {
    setProgress((prev) => {
      const current = prev[chapterId] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
      sound.playTick(!current.isWeak);
      return {
        ...prev,
        [chapterId]: {
          ...current,
          isWeak: !current.isWeak
        }
      };
    });
  }, []);

  // Update chapter notes
  const updateNotes = useCallback((chapterId: string, notes: string) => {
    setProgress((prev) => {
      const current = prev[chapterId] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
      return {
        ...prev,
        [chapterId]: {
          ...current,
          notes
        }
      };
    });
  }, []);

  // Quick subject batch actions
  const markAllSubjectTask = useCallback((subject: SubjectId, taskKey: 'rev1' | 'rev2' | 'pyq5', value: boolean) => {
    const chapters = ALL_CHAPTERS.filter((c) => c.subject === subject);
    setProgress((prev) => {
      const next = { ...prev };
      chapters.forEach((c) => {
        const cur = next[c.id] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
        next[c.id] = { ...cur, [taskKey]: value, lastUpdated: new Date().toISOString() };
      });
      return next;
    });
    sound.playTick(value);
  }, []);

  // Reset a subject
  const resetSubject = useCallback((subject: SubjectId) => {
    const chapters = ALL_CHAPTERS.filter((c) => c.subject === subject);
    setProgress((prev) => {
      const next = { ...prev };
      chapters.forEach((c) => {
        next[c.id] = { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
      });
      return next;
    });
    sound.playTick(false);
  }, []);

  // Reset everything
  const resetAll = useCallback(() => {
    const next: AllProgressMap = {};
    ALL_CHAPTERS.forEach((c) => {
      next[c.id] = { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
    });
    setProgress(next);
    sound.playTick(false);
  }, []);

  // Export JSON
  const exportData = useCallback(() => {
    const data = {
      version: 2,
      exportDate: new Date().toISOString(),
      progress,
      settings: {
        weightedMode,
        examDate,
        streak,
        lastStudiedDate
      }
    };
    return JSON.stringify(data, null, 2);
  }, [progress, weightedMode, examDate, streak, lastStudiedDate]);

  // Import JSON
  const importData = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.progress === 'object') {
        setProgress(parsed.progress);
        if (parsed.settings) {
          if (typeof parsed.settings.weightedMode === 'boolean') setWeightedMode(parsed.settings.weightedMode);
          if (parsed.settings.examDate) setExamDate(parsed.settings.examDate);
          if (parsed.settings.streak) setStreak(parsed.settings.streak);
          if (parsed.settings.lastStudiedDate) setLastStudiedDate(parsed.settings.lastStudiedDate);
        }
        fireGrandCelebration();
        return { success: true };
      }
      return { success: false, error: 'Invalid JSON format: missing progress map' };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }, []);

  // Calculate stats per subject
  const computeSubjectStats = useCallback(
    (subject: SubjectId, chapters: ChapterItem[]): SubjectStats => {
      let completedChapters = 0;
      let completedTasks = 0;
      let totalMarks = 0;
      let completedMarks = 0;
      const totalTasks = chapters.length * 3;

      chapters.forEach((chap) => {
        totalMarks += chap.avgMarks;
        const p = progress[chap.id] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
        let chapterTasksDone = 0;
        if (p.rev1) chapterTasksDone++;
        if (p.rev2) chapterTasksDone++;
        if (p.pyq5) chapterTasksDone++;

        completedTasks += chapterTasksDone;
        if (chapterTasksDone === 3) completedChapters++;

        // Each task is 1/3 of the chapter's marks
        completedMarks += chap.avgMarks * (chapterTasksDone / 3);
      });

      const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const weightedPercentage = totalMarks > 0 ? (completedMarks / totalMarks) * 100 : 0;

      return {
        subject,
        totalChapters: chapters.length,
        completedChapters,
        totalTasks,
        completedTasks,
        percentage,
        weightedPercentage,
        totalMarks,
        completedMarks
      };
    },
    [progress]
  );

  const physicsStats = useMemo(() => computeSubjectStats('physics', PHYSICS_CHAPTERS), [computeSubjectStats]);
  const chemistryStats = useMemo(() => computeSubjectStats('chemistry', CHEMISTRY_CHAPTERS), [computeSubjectStats]);
  const mathsStats = useMemo(() => computeSubjectStats('maths', MATHS_CHAPTERS), [computeSubjectStats]);

  const subjectStatsMap: Record<SubjectId, SubjectStats> = useMemo(
    () => ({
      physics: physicsStats,
      chemistry: chemistryStats,
      maths: mathsStats
    }),
    [physicsStats, chemistryStats, mathsStats]
  );

  // Overall Stats
  const overallStats: OverallStats = useMemo(() => {
    const totalChapters = ALL_CHAPTERS.length;
    const totalTasks = totalChapters * 3;
    const completedTasks = physicsStats.completedTasks + chemistryStats.completedTasks + mathsStats.completedTasks;
    const completedChapters = physicsStats.completedChapters + chemistryStats.completedChapters + mathsStats.completedChapters;
    const totalMarks = physicsStats.totalMarks + chemistryStats.totalMarks + mathsStats.totalMarks;
    const completedMarks = physicsStats.completedMarks + chemistryStats.completedMarks + mathsStats.completedMarks;

    const overallPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const weightedPercentage = totalMarks > 0 ? (completedMarks / totalMarks) * 100 : 0;

    let weakCount = 0;
    let highPriorityDone = 0;
    let highPriorityTotal = 0;

    ALL_CHAPTERS.forEach((c) => {
      const p = progress[c.id];
      if (p?.isWeak) weakCount++;
      const isHigh = getPriority(c.avgMarks) === 'High';
      if (isHigh) {
        highPriorityTotal++;
        if (p?.rev1 && p?.rev2 && p?.pyq5) {
          highPriorityDone++;
        }
      }
    });

    return {
      totalChapters,
      completedChapters,
      totalTasks,
      completedTasks,
      overallPercentage,
      weightedPercentage,
      totalMarks,
      completedMarks,
      weakCount,
      highPriorityDone,
      highPriorityTotal
    };
  }, [physicsStats, chemistryStats, mathsStats, progress]);

  // Next Best Chapter Suggestion (Highest score ROI)
  // Evaluates incomplete chapters based on:
  // 1. Weak star gets a 1.3x urgency multiplier
  // 2. High avgMarks priority
  // 3. Lowest task completion (most room to gain marks quickly)
  const nextBestChapter = useMemo<ChapterItem | null>(() => {
    const candidates = ALL_CHAPTERS.filter((c) => {
      const p = progress[c.id];
      if (!p) return true;
      return !(p.rev1 && p.rev2 && p.pyq5);
    });

    if (candidates.length === 0) return null;

    // Score function
    return candidates.sort((a, b) => {
      const pA = progress[a.id] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
      const pB = progress[b.id] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };

      const doneA = (pA.rev1 ? 1 : 0) + (pA.rev2 ? 1 : 0) + (pA.pyq5 ? 1 : 0);
      const doneB = (pB.rev1 ? 1 : 0) + (pB.rev2 ? 1 : 0) + (pB.pyq5 ? 1 : 0);

      // Remaining potential marks
      const remainingMarksA = a.avgMarks * ((3 - doneA) / 3);
      const remainingMarksB = b.avgMarks * ((3 - doneB) / 3);

      const scoreA = remainingMarksA * (pA.isWeak ? 1.4 : 1.0);
      const scoreB = remainingMarksB * (pB.isWeak ? 1.4 : 1.0);

      return scoreB - scoreA;
    })[0];
  }, [progress]);

  // Dynamic achievement badges based on real progress
  const achievements = useMemo<AchievementBadge[]>(() => {
    const totalDone = overallStats.completedChapters;
    const phyPct = weightedMode ? physicsStats.weightedPercentage : physicsStats.percentage;
    const chemPct = weightedMode ? chemistryStats.weightedPercentage : chemistryStats.percentage;
    const mathPct = weightedMode ? mathsStats.weightedPercentage : mathsStats.percentage;
    const overallPct = weightedMode ? overallStats.weightedPercentage : overallStats.overallPercentage;

    return [
      {
        id: 'first-step',
        title: 'First Step',
        description: 'Complete all 3 milestones for your first chapter',
        iconName: 'Flag',
        unlocked: totalDone >= 1,
        progressPercent: Math.min(100, (totalDone / 1) * 100),
        maxRequirement: '1 Chapter'
      },
      {
        id: 'streak-master',
        title: 'Consistent Aspirant',
        description: 'Maintain a 3-day active preparation streak',
        iconName: 'Flame',
        unlocked: streak >= 3,
        progressPercent: Math.min(100, (streak / 3) * 100),
        maxRequirement: '3 Days'
      },
      {
        id: 'high-yield-hero',
        title: 'High-Yield Conqueror',
        description: 'Finish at least 5 High-Priority chapters',
        iconName: 'Target',
        unlocked: overallStats.highPriorityDone >= 5,
        progressPercent: Math.min(100, (overallStats.highPriorityDone / 5) * 100),
        maxRequirement: '5 High-Yield Chapters'
      },
      {
        id: 'physics-wizard',
        title: 'Physics Maestro',
        description: 'Reach 50% completion in Physics',
        iconName: 'Zap',
        unlocked: phyPct >= 50,
        progressPercent: Math.min(100, (phyPct / 50) * 100),
        maxRequirement: '50% Physics'
      },
      {
        id: 'chem-catalyst',
        title: 'Chemical Catalyst',
        description: 'Reach 50% completion in Chemistry',
        iconName: 'FlaskConical',
        unlocked: chemPct >= 50,
        progressPercent: Math.min(100, (chemPct / 50) * 100),
        maxRequirement: '50% Chemistry'
      },
      {
        id: 'maths-titan',
        title: 'Maths Titan',
        description: 'Reach 50% completion in Mathematics',
        iconName: 'Sigma',
        unlocked: mathPct >= 50,
        progressPercent: Math.min(100, (mathPct / 50) * 100),
        maxRequirement: '50% Maths'
      },
      {
        id: 'half-century',
        title: 'Halfway to IIT',
        description: 'Reach 50% overall JEE syllabus completion',
        iconName: 'Award',
        unlocked: overallPct >= 50,
        progressPercent: Math.min(100, (overallPct / 50) * 100),
        maxRequirement: '50% Overall'
      },
      {
        id: 'jee-centurion',
        title: 'JEE Legend',
        description: '100% complete syllabus revision & PYQs',
        iconName: 'Crown',
        unlocked: overallPct >= 99.9,
        progressPercent: Math.min(100, overallPct),
        maxRequirement: '100% Overall'
      }
    ];
  }, [overallStats, physicsStats, chemistryStats, mathsStats, weightedMode, streak]);

  return {
    progress,
    weightedMode,
    setWeightedMode,
    examDate,
    setExamDate,
    streak,
    lastStudiedDate,
    toggleTask,
    toggleWeak,
    updateNotes,
    markAllSubjectTask,
    resetSubject,
    resetAll,
    exportData,
    importData,
    subjectStatsMap,
    overallStats,
    nextBestChapter,
    achievements
  };
}
