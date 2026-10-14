import { Search, Flame, Award, Database, Volume2, VolumeX, Sparkles, Filter, X } from 'lucide-react';
import { SubjectId, Priority } from '../types/jee';
import { sound } from '../utils/audio';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSubject: SubjectId | 'all';
  onSelectSubject: (sub: SubjectId | 'all') => void;
  priorityFilter: Priority | 'all';
  onPriorityFilterChange: (p: Priority | 'all') => void;
  statusFilter: 'all' | 'pending' | 'weak' | 'completed';
  onStatusFilterChange: (s: 'all' | 'pending' | 'weak' | 'completed') => void;
  weightedMode: boolean;
  onToggleWeightedMode: () => void;
  streak: number;
  lastStudiedDate: string;
  unlockedAchievementsCount: number;
  onOpenAchievements: () => void;
  onOpenDataModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSelectSubject,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  weightedMode,
  onToggleWeightedMode,
  streak,
  unlockedAchievementsCount,
  onOpenAchievements,
  onOpenDataModal,
  isMuted,
  onToggleMute
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top Tier: Brand, Streak, Weighted Switch, Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-violet-500 p-0.5 flex items-center justify-center shadow-md shadow-cyan-950/50">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>JEE Prep Tracker</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-medium">
                  2021-2025 PYQ
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                High-Yield Chapter Priority & 3D Mastery Matrix
              </p>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Indicator */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold shadow-inner"
              title="Consecutive daily study streak"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{streak}d Streak</span>
            </div>

            {/* Weighted by Marks Toggle */}
            <button
              onClick={() => {
                onToggleWeightedMode();
                sound.playTick(!weightedMode);
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                weightedMode
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Toggle between equal chapter weighting and marks-based weighting"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  weightedMode ? 'bg-cyan-400 border-cyan-300' : 'bg-transparent border-slate-600'
                }`}
              />
              <span className="hidden sm:inline">Weighted by Marks</span>
              <span className="sm:hidden">Weighted</span>
            </button>

            {/* Achievements Modal Trigger */}
            <button
              onClick={onOpenAchievements}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="View Badges & Milestones"
            >
              <Award className="w-4 h-4 text-amber-400" />
              {unlockedAchievementsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {unlockedAchievementsCount}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Backup & Reset Trigger */}
            <button
              onClick={onOpenDataModal}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Backup, Export & Restore"
            >
              <Database className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Search and Filter Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center gap-2.5 justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search chapters or topics (e.g. Optics, KTG, Integration)..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Group: Subjects */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedSubject === 'all'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => onSelectSubject('physics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedSubject === 'physics'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900'
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => onSelectSubject('chemistry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedSubject === 'chemistry'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-semibold'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900'
              }`}
            >
              Chemistry
            </button>
            <button
              onClick={() => onSelectSubject('maths')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedSubject === 'maths'
                  ? 'bg-violet-950 text-violet-300 border border-violet-800/80 font-semibold'
                  : 'text-slate-400 hover:text-violet-300 hover:bg-slate-900'
              }`}
            >
              Mathematics
            </button>
          </div>

          {/* Secondary Filters: Priority & Status */}
          <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <select
                value={priorityFilter}
                onChange={(e) => onPriorityFilterChange(e.target.value as Priority | 'all')}
                className="bg-transparent text-slate-300 text-xs px-1.5 py-1 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-slate-200">All Yields</option>
                <option value="High" className="bg-slate-900 text-slate-200">High Yield</option>
                <option value="Medium" className="bg-slate-900 text-slate-200">Medium Yield</option>
                <option value="Low" className="bg-slate-900 text-slate-200">Low Yield</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'pending' | 'weak' | 'completed')}
                className="bg-transparent text-slate-300 text-xs px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-slate-200">All Status</option>
                <option value="pending" className="bg-slate-900 text-slate-200">Pending Only</option>
                <option value="weak" className="bg-slate-900 text-slate-200">Starred Weak</option>
                <option value="completed" className="bg-slate-900 text-slate-200">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
