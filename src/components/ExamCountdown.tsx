import { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2, Check } from 'lucide-react';

interface ExamCountdownProps {
  examDate: string;
  onUpdateExamDate: (date: string) => void;
}

const PRESETS = [
  { label: 'JEE Main Jan', date: '2026-01-22' },
  { label: 'JEE Main Apr', date: '2026-04-04' },
  { label: 'JEE Adv May', date: '2026-05-24' },
  { label: 'JEE 2027', date: '2027-01-21' }
];

export function ExamCountdown({ examDate, onUpdateExamDate }: ExamCountdownProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customDate, setCustomDate] = useState(examDate);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    function calculate() {
      const target = new Date(`${examDate}T09:00:00`).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [examDate]);

  const handleSaveDate = () => {
    if (customDate) {
      onUpdateExamDate(customDate);
      setIsEditing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            JEE Exam Countdown
          </h4>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-cyan-400 text-xs flex items-center gap-1 transition-colors"
        >
          <Edit2 className="w-3 h-3" />
          <span>{isEditing ? 'Cancel' : 'Change Date'}</span>
        </button>
      </div>

      {/* Preset or Custom Date Switcher */}
      {isEditing && (
        <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setCustomDate(p.date);
                  onUpdateExamDate(p.date);
                  setIsEditing(false);
                }}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                  examDate === p.date
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSaveDate}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Live Counter Display */}
      {timeLeft.isPast ? (
        <div className="text-center py-2 text-rose-400 font-semibold text-sm">
          Exam date has arrived! Give it your all! 🚀
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="block font-mono text-xl sm:text-2xl font-black text-cyan-400">
              {timeLeft.days}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Days</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="block font-mono text-xl sm:text-2xl font-black text-slate-100">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Hours</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="block font-mono text-xl sm:text-2xl font-black text-slate-100">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Mins</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="block font-mono text-xl sm:text-2xl font-black text-amber-400">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Secs</span>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          Target: {new Date(examDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-cyan-400 font-medium">Keep Grinding! 🎯</span>
      </div>
    </div>
  );
}
