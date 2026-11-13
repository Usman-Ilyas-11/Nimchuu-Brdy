'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const triggerGrandConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Double side burst cannons
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 0.1, y: 0.6 },
  });
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 0.9, y: 0.6 },
  });
  fire(0.2, {
    spread: 60,
    origin: { x: 0.5, y: 0.5 },
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
};

export const ConfettiOverlay = () => {
  useEffect(() => {
    // Initial celebration burst
    triggerGrandConfetti();

    // Continuous gentle glitter interval
    const interval = setInterval(() => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'],
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return null;
};
