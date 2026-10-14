import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Timer as TimerIcon, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const MODE_TIMES: Record<Mode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

export function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('work');
  const [secondsLeft, setSecondsLeft] = useState(MODE_TIMES.work);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            sound.playPomodoroChime();
            if (mode === 'work') {
              setSessionsCompleted((c) => c + 1);
              setMode('shortBreak');
              return MODE_TIMES.shortBreak;
            } else {
              setMode('work');
              return MODE_TIMES.work;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(MODE_TIMES[mode]);
  };

  const switchMode = (newMode: Mode) => {
    setIsActive(false);
    setMode(newMode);
    setSecondsLeft(MODE_TIMES[newMode]);
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const totalTime = MODE_TIMES[mode];
  const progressRatio = (totalTime - secondsLeft) / totalTime;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // SVG circular ring properties
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TimerIcon className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Study Focus Timer (25/5)
          </h4>
        </div>

        <button
          onClick={toggleSound}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex rounded-lg bg-slate-950 p-1 mb-4 border border-slate-800 text-xs">
        <button
          onClick={() => switchMode('work')}
          className={`flex-1 py-1 rounded-md font-medium transition-all ${
            mode === 'work' ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-1 rounded-md font-medium transition-all ${
            mode === 'shortBreak' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-1 rounded-md font-medium transition-all ${
            mode === 'longBreak' ? 'bg-violet-500/20 text-violet-300 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Rest (15m)
        </button>
      </div>

      {/* Circular Progress & Time Display */}
      <div className="flex items-center justify-center gap-6 my-2">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                mode === 'work' ? 'text-emerald-400' : mode === 'shortBreak' ? 'text-cyan-400' : 'text-violet-400'
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-mono text-2xl font-black text-white tracking-tighter">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {mode === 'work' ? 'Sprint' : 'Rest'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleTimer}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={resetTimer}
              className="flex-1 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (mode === 'work') switchMode('shortBreak');
                else switchMode('work');
              }}
              className="flex-1 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center transition-colors"
              title="Skip Session"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Completed Sprints:</span>
        <span className="font-mono font-bold text-emerald-400">
          {sessionsCompleted} cycles ({sessionsCompleted * 25} mins)
        </span>
      </div>
    </div>
  );
}
