import confetti from 'canvas-confetti';

export function fireChapterCompletionConfetti(x = 0.5, y = 0.6) {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'],
      disableForReducedMotion: true
    });
  } catch {
    // Ignore canvas-confetti issues gracefully
  }
}

export function fireGrandCelebration() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#06b6d4', '#3b82f6']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#10b981', '#34d399']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#8b5cf6', '#a855f7']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch {
    // Ignore
  }
}
