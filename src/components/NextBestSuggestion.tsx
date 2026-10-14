import { ChapterItem } from '../types/jee';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { SUBJECT_INFO } from '../data/chapters';

interface NextBestSuggestionProps {
  chapter: ChapterItem | null;
  isWeak?: boolean;
  onJumpToChapter: (id: string) => void;
}

export function NextBestSuggestion({
  chapter,
  isWeak,
  onJumpToChapter
}: NextBestSuggestionProps) {
  if (!chapter) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Full JEE Syllabus Completed!</h4>
            <p className="text-xs text-slate-300">
              Outstanding work! You have finished all revisions and PYQs for all chapters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const subjectMeta = SUBJECT_INFO[chapter.subject];

  return (
    <div className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-0 w-64 h-full bg-amber-500/5 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                Highest Score ROI · Next Best Chapter to Study
              </span>
              {isWeak && (
                <span className="text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-rose-300" /> Starred Weak
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{chapter.chapter}</span>
              <span className={`text-xs px-2 py-0.5 rounded font-medium border ${subjectMeta.badgeClass}`}>
                {subjectMeta.name}
              </span>
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Estimated PYQ weight: <span className="text-amber-300 font-semibold">~{chapter.avgMarks.toFixed(1)} marks</span> ({chapter.weightagePercent.toFixed(1)}%).
              Mastering this chapter gives the fastest boost to your predicted JEE percentile!
            </p>
          </div>
        </div>

        <button
          onClick={() => onJumpToChapter(chapter.id)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <span>Jump to Chapter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
