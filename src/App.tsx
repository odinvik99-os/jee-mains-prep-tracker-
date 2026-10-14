import { useState, useMemo } from 'react';
import { useJeeProgress } from './hooks/useJeeProgress';
import { PHYSICS_CHAPTERS, CHEMISTRY_CHAPTERS, MATHS_CHAPTERS, getPriority } from './data/chapters';
import { SubjectId, Priority } from './types/jee';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { StatsDashboard } from './components/StatsDashboard';
import { NextBestSuggestion } from './components/NextBestSuggestion';
import { SubjectSection } from './components/SubjectSection';
import { AchievementsModal } from './components/AchievementsModal';
import { DataModal } from './components/DataModal';
import { sound } from './utils/audio';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  const {
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
  } = useJeeProgress();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'weak' | 'completed'>('all');

  // Modals state
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  // Jump to chapter smooth scroll handler
  const handleJumpToChapter = (chapterId: string) => {
    // If the subject of that chapter is filtered out, reset subject filter
    setSelectedSubject('all');
    setTimeout(() => {
      const el = document.getElementById(`section-${chapterId}`) || document.getElementById(`section-physics`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }
    }, 50);
  };

  // Filter function for chapters
  const filterChapters = (chaptersList: typeof PHYSICS_CHAPTERS) => {
    return chaptersList.filter((chap) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = chap.chapter.toLowerCase().includes(q);
        const matchesTopic = chap.coreTopics.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTopic) return false;
      }

      // 2. Priority Filter
      if (priorityFilter !== 'all') {
        const chapPriority = getPriority(chap.avgMarks);
        if (chapPriority !== priorityFilter) return false;
      }

      // 3. Status Filter
      const p = progress[chap.id] || { rev1: false, rev2: false, pyq5: false, isWeak: false, notes: '' };
      const isComplete = p.rev1 && p.rev2 && p.pyq5;

      if (statusFilter === 'pending' && isComplete) return false;
      if (statusFilter === 'weak' && !p.isWeak) return false;
      if (statusFilter === 'completed' && !isComplete) return false;

      return true;
    });
  };

  // Filtered chapter lists
  const filteredPhysics = useMemo(() => filterChapters(PHYSICS_CHAPTERS), [PHYSICS_CHAPTERS, searchQuery, priorityFilter, statusFilter, progress]);
  const filteredChemistry = useMemo(() => filterChapters(CHEMISTRY_CHAPTERS), [CHEMISTRY_CHAPTERS, searchQuery, priorityFilter, statusFilter, progress]);
  const filteredMaths = useMemo(() => filterChapters(MATHS_CHAPTERS), [MATHS_CHAPTERS, searchQuery, priorityFilter, statusFilter, progress]);

  const unlockedBadgesCount = useMemo(() => achievements.filter((a) => a.unlocked).length, [achievements]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation & Control Center */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        weightedMode={weightedMode}
        onToggleWeightedMode={() => setWeightedMode(!weightedMode)}
        streak={streak}
        lastStudiedDate={lastStudiedDate}
        unlockedAchievementsCount={unlockedBadgesCount}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Hero Section: 3D React Three Fiber Subject Matrix */}
        <section aria-label="3D Subject Models">
          <Hero3D
            physicsStats={subjectStatsMap.physics}
            chemistryStats={subjectStatsMap.chemistry}
            mathsStats={subjectStatsMap.maths}
            overallStats={overallStats}
            weightedMode={weightedMode}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
          />
        </section>

        {/* Next Best Chapter ROI Suggestion Banner */}
        <NextBestSuggestion
          chapter={nextBestChapter}
          isWeak={nextBestChapter ? progress[nextBestChapter.id]?.isWeak : false}
          onJumpToChapter={handleJumpToChapter}
        />

        {/* Prep Command Center: 3D Overall Core + Exam Countdown + Pomodoro */}
        <StatsDashboard
          overallStats={overallStats}
          physicsStats={subjectStatsMap.physics}
          chemistryStats={subjectStatsMap.chemistry}
          mathsStats={subjectStatsMap.maths}
          weightedMode={weightedMode}
          examDate={examDate}
          onUpdateExamDate={setExamDate}
        />

        {/* Disclaimer Note regarding PYQ trends */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Note on PYQ Weightage:</strong> Chapter marks values (avgMarks) are approximate previous-year question trend estimates across JEE Main & Advanced shifts (2021–2025). High-yield topics appear first to maximize revision efficiency.
          </span>
        </div>

        {/* Subject Sections (Sorted Descending by Marks) */}
        <div className="space-y-6">
          {(selectedSubject === 'all' || selectedSubject === 'physics') && (
            <SubjectSection
              subject="physics"
              title="Physics"
              chapters={filteredPhysics}
              progressMap={progress}
              stats={subjectStatsMap.physics}
              weightedMode={weightedMode}
              nextBestChapterId={nextBestChapter?.id}
              onToggleTask={toggleTask}
              onToggleWeak={toggleWeak}
              onUpdateNotes={updateNotes}
              onMarkAllTask={markAllSubjectTask}
              onResetSubject={resetSubject}
            />
          )}

          {(selectedSubject === 'all' || selectedSubject === 'chemistry') && (
            <SubjectSection
              subject="chemistry"
              title="Chemistry"
              chapters={filteredChemistry}
              progressMap={progress}
              stats={subjectStatsMap.chemistry}
              weightedMode={weightedMode}
              nextBestChapterId={nextBestChapter?.id}
              onToggleTask={toggleTask}
              onToggleWeak={toggleWeak}
              onUpdateNotes={updateNotes}
              onMarkAllTask={markAllSubjectTask}
              onResetSubject={resetSubject}
            />
          )}

          {(selectedSubject === 'all' || selectedSubject === 'maths') && (
            <SubjectSection
              subject="maths"
              title="Mathematics"
              chapters={filteredMaths}
              progressMap={progress}
              stats={subjectStatsMap.maths}
              weightedMode={weightedMode}
              nextBestChapterId={nextBestChapter?.id}
              onToggleTask={toggleTask}
              onToggleWeak={toggleWeak}
              onUpdateNotes={updateNotes}
              onMarkAllTask={markAllSubjectTask}
              onResetSubject={resetSubject}
            />
          )}

          {/* Empty state if all chapters filtered out */}
          {filteredPhysics.length === 0 &&
            filteredChemistry.length === 0 &&
            filteredMaths.length === 0 && (
              <div className="text-center py-16 rounded-2xl border border-slate-800 bg-slate-900/40">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-300">No chapters match your filter</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or selecting "All Yields" / "All Status" to view all JEE chapters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriorityFilter('all');
                    setStatusFilter('all');
                    setSelectedSubject('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 JEE Preparation Tracker · High-Yield Revision Matrix & 3D Interactive HUD</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for JEE Main & JEE Advanced Aspirants</span>
            <span>·</span>
            <button
              onClick={() => setIsDataModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              Backup & Sync
            </button>
          </div>
        </div>
      </footer>

      {/* Badges & Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />

      {/* Data Backup & Restore Modal */}
      <DataModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onExport={exportData}
        onImport={importData}
        onResetAll={resetAll}
      />
    </div>
  );
}
