import { useState } from 'react';
import { ChapterItem, AllProgressMap, SubjectStats, SubjectId } from '../types/jee';
import { ChapterCard } from './ChapterCard';
import { Atom, FlaskConical, Sigma, ChevronDown, ChevronUp, CheckCheck, RotateCcw } from 'lucide-react';

interface SubjectSectionProps {
  subject: SubjectId;
  title: string;
  chapters: ChapterItem[];
  progressMap: AllProgressMap;
  stats: SubjectStats;
  weightedMode: boolean;
  nextBestChapterId?: string;
  onToggleTask: (chapterId: string, taskKey: 'rev1' | 'rev2' | 'pyq5') => void;
  onToggleWeak: (chapterId: string) => void;
  onUpdateNotes: (chapterId: string, notes: string) => void;
  onMarkAllTask: (subject: SubjectId, taskKey: 'rev1' | 'rev2' | 'pyq5', value: boolean) => void;
  onResetSubject: (subject: SubjectId) => void;
}

export function SubjectSection({
  subject,
  title,
  chapters,
  progressMap,
  stats,
  weightedMode,
  nextBestChapterId,
  onToggleTask,
  onToggleWeak,
  onUpdateNotes,
  onMarkAllTask,
  onResetSubject
}: SubjectSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBatchMenu, setShowBatchMenu] = useState(false);

  const displayPercentage = weightedMode ? stats.weightedPercentage : stats.percentage;

  // Icon mapping
  const subjectConfig = {
    physics: {
      icon: Atom,
      accent: 'text-cyan-400',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      bar: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-500/30',
      bgGlow: 'from-cyan-950/20 via-slate-900 to-slate-900',
      headerGlow: 'bg-cyan-500/10'
    },
    chemistry: {
      icon: FlaskConical,
      accent: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      bar: 'from-emerald-500 to-teal-400',
      border: 'border-emerald-500/30',
      bgGlow: 'from-emerald-950/20 via-slate-900 to-slate-900',
      headerGlow: 'bg-emerald-500/10'
    },
    maths: {
      icon: Sigma,
      accent: 'text-violet-400',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
      bar: 'from-violet-500 to-fuchsia-500',
      border: 'border-violet-500/30',
      bgGlow: 'from-violet-950/20 via-slate-900 to-slate-900',
      headerGlow: 'bg-violet-500/10'
    }
  };

  const config = subjectConfig[subject];
  const Icon = config.icon;

  return (
    <section id={`section-${subject}`} className="scroll-mt-24 mb-10">
      {/* Subject Header Card */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 mb-5 bg-gradient-to-r ${config.bgGlow} ${config.border} shadow-xl backdrop-blur-md transition-all`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${config.headerGlow} border ${config.border} shadow-inner`}>
              <Icon className={`w-6 h-6 ${config.accent}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${config.badge}`}>
                  {chapters.length} Chapters
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target Marks: ~{stats.totalMarks.toFixed(1)} pts · Completed:{' '}
                <span className="text-slate-200 font-medium">~{stats.completedMarks.toFixed(1)} pts</span>
              </p>
            </div>
          </div>

          {/* Progress Bar & Quick Stats */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="w-full">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400 font-medium">
                  {stats.completedChapters} of {stats.totalChapters} mastered ({stats.completedTasks}/{stats.totalTasks} tasks)
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  {displayPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${config.bar} transition-all duration-500 ease-out`}
                  style={{ width: `${displayPercentage}%` }}
                />
              </div>
            </div>

            {/* Quick Actions Dropdown / Button */}
            <div className="relative shrink-0 flex items-center gap-1.5">
              <button
                onClick={() => setShowBatchMenu(!showBatchMenu)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Batch actions for this subject"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Batch</span>
              </button>

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition-colors"
                title={isCollapsed ? 'Expand Subject' : 'Collapse Subject'}
              >
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>

              {/* Batch popup */}
              {showBatchMenu && (
                <div className="absolute right-0 top-10 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-20 text-xs space-y-1">
                  <button
                    onClick={() => {
                      onMarkAllTask(subject, 'rev1', true);
                      setShowBatchMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    Mark All Rev 1 Done
                  </button>
                  <button
                    onClick={() => {
                      onMarkAllTask(subject, 'rev2', true);
                      setShowBatchMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    Mark All Rev 2 Done
                  </button>
                  <button
                    onClick={() => {
                      onMarkAllTask(subject, 'pyq5', true);
                      setShowBatchMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-200 transition-colors"
                  >
                    Mark All 5-Yr PYQs Done
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={() => {
                      if (confirm(`Reset all tasks in ${title}?`)) {
                        onResetSubject(subject);
                      }
                      setShowBatchMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-rose-950/60 text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset {title}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Grid (Sorted Descending by Marks) */}
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {chapters.map((chapter, index) => {
            const chapProgress = progressMap[chapter.id] || {
              rev1: false,
              rev2: false,
              pyq5: false,
              isWeak: false,
              notes: ''
            };
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                rank={index + 1}
                progress={chapProgress}
                isNextBest={chapter.id === nextBestChapterId}
                onToggleTask={onToggleTask}
                onToggleWeak={onToggleWeak}
                onUpdateNotes={onUpdateNotes}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
