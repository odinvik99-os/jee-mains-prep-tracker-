import { OverallStats, SubjectStats } from '../types/jee';
import { ProgressRing3D } from './ProgressRing3D';
import { ExamCountdown } from './ExamCountdown';
import { PomodoroTimer } from './PomodoroTimer';
import { Target, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';

interface StatsDashboardProps {
  overallStats: OverallStats;
  physicsStats: SubjectStats;
  chemistryStats: SubjectStats;
  mathsStats: SubjectStats;
  weightedMode: boolean;
  examDate: string;
  onUpdateExamDate: (d: string) => void;
}

export function StatsDashboard({
  overallStats,
  physicsStats,
  chemistryStats,
  mathsStats,
  weightedMode,
  examDate,
  onUpdateExamDate
}: StatsDashboardProps) {
  const displayPercentage = weightedMode
    ? overallStats.weightedPercentage
    : overallStats.overallPercentage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {/* Col 1: 3D Holographic Overall Progress Core & Quick Metric Counters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              3D JEE Preparation Core
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {overallStats.completedChapters}/{overallStats.totalChapters} Chapters Done
          </span>
        </div>

        {/* 3D Rotating Ring/Globe */}
        <ProgressRing3D
          percentage={displayPercentage}
          weightedMode={weightedMode}
          completedTasks={overallStats.completedTasks}
          totalTasks={overallStats.totalTasks}
        />

        {/* Metric Badges */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-0.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Est. Marks</span>
            </div>
            <span className="font-mono text-base font-bold text-white">
              ~{overallStats.completedMarks.toFixed(1)} <span className="text-xs text-slate-500 font-normal">/ {overallStats.totalMarks.toFixed(0)}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>High Yield</span>
            </div>
            <span className="font-mono text-base font-bold text-white">
              {overallStats.highPriorityDone} <span className="text-xs text-slate-500 font-normal">/ {overallStats.highPriorityTotal}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Weak Bookmarks</span>
            </div>
            <span className="font-mono text-base font-bold text-amber-300">
              {overallStats.weakCount} Chapters
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-0.5">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span>Subj Balance</span>
            </div>
            <span className="text-xs font-mono font-medium text-slate-300">
              P:{physicsStats.completedChapters} C:{chemistryStats.completedChapters} M:{mathsStats.completedChapters}
            </span>
          </div>
        </div>
      </div>

      {/* Col 2: JEE Exam Countdown */}
      <ExamCountdown examDate={examDate} onUpdateExamDate={onUpdateExamDate} />

      {/* Col 3: Focus Pomodoro Timer */}
      <PomodoroTimer />
    </div>
  );
}
