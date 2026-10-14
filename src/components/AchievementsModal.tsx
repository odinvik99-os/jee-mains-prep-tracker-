import { AchievementBadge } from '../types/jee';
import { Award, CheckCircle2, Lock, X, Flame, Target, Zap, FlaskConical, Sigma, Crown, Flag } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: AchievementBadge[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Flag,
  Flame,
  Target,
  Zap,
  FlaskConical,
  Sigma,
  Award,
  Crown
};

export function AchievementsModal({ isOpen, onClose, achievements }: AchievementsModalProps) {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">JEE Preparation Milestones</h3>
              <p className="text-xs text-slate-400">
                Unlocked {unlockedCount} of {achievements.length} badges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 overflow-y-auto pr-1">
          {achievements.map((badge) => {
            const IconComponent = ICON_MAP[badge.iconName] || Award;
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  badge.unlocked
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-sm shadow-amber-950/30'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      badge.unlocked
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-semibold text-slate-100 truncate">{badge.title}</h4>
                      {badge.unlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{badge.description}</p>

                    {/* Progress Bar inside badge */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span>{badge.unlocked ? 'Unlocked' : badge.maxRequirement}</span>
                        <span className="font-mono font-bold text-slate-300">
                          {badge.progressPercent.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            badge.unlocked ? 'bg-amber-400' : 'bg-slate-600'
                          }`}
                          style={{ width: `${badge.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
