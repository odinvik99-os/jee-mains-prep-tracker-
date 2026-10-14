import { useState } from 'react';
import { Download, Upload, RotateCcw, X, AlertTriangle, Check, Copy } from 'lucide-react';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => string;
  onImport: (jsonStr: string) => { success: boolean; error?: string };
  onResetAll: () => void;
}

export function DataModal({
  isOpen,
  onClose,
  onExport,
  onImport,
  onResetAll
}: DataModalProps) {
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const jsonStr = onExport();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jee-prep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    const jsonStr = onExport();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) {
      setImportStatus({ type: 'error', msg: 'Please paste valid JSON data.' });
      return;
    }
    const res = onImport(importText);
    if (res.success) {
      setImportStatus({ type: 'success', msg: 'Progress successfully restored!' });
      setTimeout(() => {
        onClose();
        setImportStatus(null);
        setImportText('');
      }, 1200);
    } else {
      setImportStatus({ type: 'error', msg: res.error || 'Failed to parse JSON file' });
    }
  };

  const handleResetExecute = () => {
    onResetAll();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Data Backup & Recovery</h3>
            <p className="text-xs text-slate-400">
              Export your study data to keep it safe or transfer across devices
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-5">
          {/* Export Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Progress Backup</span>
            </h4>
            <p className="text-xs text-slate-400">
              Download your entire progress history, notes, stars, and timer stats as a lightweight JSON file.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download JSON</span>
              </button>
              <button
                onClick={handleCopyClipboard}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Import Progress Backup</span>
            </h4>
            <p className="text-xs text-slate-400">
              Paste your exported JSON content below to restore all checked chapters and notes.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON here..."
              rows={3}
              className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            {importStatus && (
              <p
                className={`text-xs ${
                  importStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {importStatus.msg}
              </p>
            )}
            <button
              onClick={handleImportSubmit}
              className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore from JSON</span>
            </button>
          </div>

          {/* Danger Zone: Reset All */}
          <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-900/40 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset All Progress</span>
            </h4>
            <p className="text-xs text-slate-400">
              Clear all checkbox states, notes, and study bookmarks. This cannot be undone unless you have an exported backup.
            </p>
            {showResetConfirm ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleResetExecute}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Chapters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
