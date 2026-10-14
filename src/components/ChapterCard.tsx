import React, { useState, useRef } from 'react';
import { ChapterItem, ChapterProgress, Priority } from '../types/jee';
import { getPriority } from '../data/chapters';
import { Star, FileText, Check, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterItem;
  rank: number;
  progress: ChapterProgress;
  isNextBest?: boolean;
  onToggleTask: (chapterId: string, taskKey: 'rev1' | 'rev2' | 'pyq5') => void;
  onToggleWeak: (chapterId: string) => void;
  onUpdateNotes: (chapterId: string, notes: string) => void;
}

export function ChapterCard({
  chapter,
  rank,
  progress,
  isNextBest = false,
  onToggleTask,
  onToggleWeak,
  onUpdateNotes
}: ChapterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const priority: Priority = getPriority(chapter.avgMarks);

  // Calculate chapter completion
  const completedTasksCount =
    (progress.rev1 ? 1 : 0) + (progress.rev2 ? 1 : 0) + (progress.pyq5 ? 1 : 0);
  const progressPercent = Math.round((completedTasksCount / 3) * 100);
  const isAllDone = completedTasksCount === 3;

  // 3D CSS perspective tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Maximum tilt angle: 10 degrees
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Color accents based on subject
  const subjectThemes = {
    physics: {
      accentText: 'text-cyan-400',
      progressBar: 'from-cyan-500 to-blue-500',
      activeCheckbox: 'bg-cyan-500 border-cyan-400 text-slate-950',
      borderDone: 'border-cyan-500/50 bg-cyan-950/20',
      glowShadow: 'hover:shadow-cyan-500/10'
    },
    chemistry: {
      accentText: 'text-emerald-400',
      progressBar: 'from-emerald-500 to-teal-400',
      activeCheckbox: 'bg-emerald-500 border-emerald-400 text-slate-950',
      borderDone: 'border-emerald-500/50 bg-emerald-950/20',
      glowShadow: 'hover:shadow-emerald-500/10'
    },
    maths: {
      accentText: 'text-violet-400',
      progressBar: 'from-violet-500 to-fuchsia-500',
      activeCheckbox: 'bg-violet-500 border-violet-400 text-slate-950',
      borderDone: 'border-violet-500/50 bg-violet-950/20',
      glowShadow: 'hover:shadow-violet-500/10'
    }
  };

  const theme = subjectThemes[chapter.subject];

  const priorityStyles: Record<Priority, { label: string; badge: string }> = {
    High: {
      label: 'High Yield',
      badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    },
    Medium: {
      label: 'Medium Yield',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    },
    Low: {
      label: 'Low Yield',
      badge: 'bg-slate-700/40 text-slate-400 border-slate-700'
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`relative rounded-xl border backdrop-blur-md p-4 transition-shadow duration-300 shadow-lg ${
        isAllDone
          ? theme.borderDone
          : isNextBest
          ? 'border-amber-500/60 bg-gradient-to-b from-amber-950/25 via-slate-900 to-slate-900'
          : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
      } ${theme.glowShadow}`}
    >
      {/* Next Best recommendation badge */}
      {isNextBest && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wide shadow-md">
          <Sparkles className="w-3 h-3" />
          <span>RECOMMENDED NEXT</span>
        </div>
      )}

      {/* Header: Rank + Chapter Name + Actions */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/80 shrink-0">
            #{String(rank).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-semibold text-slate-100 truncate flex items-center gap-1.5">
              <span className="truncate" title={chapter.chapter}>{chapter.chapter}</span>
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 flex-wrap">
              <span className="font-mono text-slate-300 font-medium">~{chapter.avgMarks.toFixed(1)} marks</span>
              <span>·</span>
              <span>{chapter.weightagePercent.toFixed(1)}% weight</span>
              <span>·</span>
              <span>{chapter.classLevel}</span>
            </div>
          </div>
        </div>

        {/* Action icons: Star (Weak) + Notes */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleWeak(chapter.id)}
            title={progress.isWeak ? 'Marked as Weak Chapter' : 'Bookmark as Weak Chapter'}
            aria-label={progress.isWeak ? 'Remove weak mark' : 'Mark as weak'}
            className={`p-1.5 rounded-lg border transition-all ${
              progress.isWeak
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-sm'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-4 h-4 ${progress.isWeak ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            title="Chapter study notes & formulas"
            aria-label="Toggle notes"
            className={`p-1.5 rounded-lg border transition-all ${
              progress.notes?.trim()
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Yield & Difficulty Tags */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityStyles[priority].badge}`}>
          {priorityStyles[priority].label}
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          {chapter.difficulty}
        </span>
        <button
          onClick={() => setShowTopics(!showTopics)}
          className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-0.5 ml-auto transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>Core Topics</span>
          {showTopics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Expandable Core Topics Drawer */}
      {showTopics && (
        <div className="mb-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          <p className="text-[11px] font-medium text-slate-400 mb-1.5">Frequently Tested Sub-topics:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
            {chapter.coreTopics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Per-Chapter Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Mastery</span>
          <span className="font-mono font-bold text-slate-200">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800/90 rounded-full h-1.5 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${theme.progressBar} h-full rounded-full transition-all duration-300`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Three Milestones Checkboxes: 1) Rev 1  2) Rev 2  3) 5-Yr PYQ */}
      <div className="grid grid-cols-3 gap-2">
        {/* Revision 1 */}
        <label
          className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
            progress.rev1
              ? `${theme.activeCheckbox} shadow-sm font-semibold`
              : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
          }`}
        >
          <input
            type="checkbox"
            checked={progress.rev1}
            onChange={() => onToggleTask(chapter.id, 'rev1')}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
              progress.rev1
                ? 'border-transparent bg-slate-950 text-white'
                : 'border-slate-600 bg-slate-900'
            }`}
          >
            {progress.rev1 && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="truncate">Rev 1</span>
        </label>

        {/* Revision 2 */}
        <label
          className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
            progress.rev2
              ? `${theme.activeCheckbox} shadow-sm font-semibold`
              : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
          }`}
        >
          <input
            type="checkbox"
            checked={progress.rev2}
            onChange={() => onToggleTask(chapter.id, 'rev2')}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
              progress.rev2
                ? 'border-transparent bg-slate-950 text-white'
                : 'border-slate-600 bg-slate-900'
            }`}
          >
            {progress.rev2 && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="truncate">Rev 2</span>
        </label>

        {/* 5-Year PYQ */}
        <label
          className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all select-none ${
            progress.pyq5
              ? `${theme.activeCheckbox} shadow-sm font-semibold`
              : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
          }`}
        >
          <input
            type="checkbox"
            checked={progress.pyq5}
            onChange={() => onToggleTask(chapter.id, 'pyq5')}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
              progress.pyq5
                ? 'border-transparent bg-slate-950 text-white'
                : 'border-slate-600 bg-slate-900'
            }`}
          >
            {progress.pyq5 && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="truncate">5-Yr PYQ</span>
        </label>
      </div>

      {/* Expandable Notes Drawer */}
      {showNotes && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Formulas, tricky questions & mistakes to remember:
          </label>
          <textarea
            value={progress.notes || ''}
            onChange={(e) => onUpdateNotes(chapter.id, e.target.value)}
            placeholder="e.g., Don't forget negative sign in Faraday's law; King's property integral condition..."
            rows={3}
            className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      )}
    </div>
  );
}
