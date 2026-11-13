'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface RoseAnimationProps {
  onCollect: () => void;
}

export const RoseAnimation: React.FC<RoseAnimationProps> = ({ onCollect }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bloomProgress, setBloomProgress] = useState(0);
  const [isFullyBloomed, setIsFullyBloomed] = useState(false);

  // Animate bloom progress over 4 seconds
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setBloomProgress(progress);

      if (progress >= 1) {
        setIsFullyBloomed(true);
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // HTML5 Canvas Sparkle particle system around bouquet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const particles = Array.from({ length: 50 }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 260,
      y: height / 2 + (Math.random() - 0.5) * 260,
      size: Math.random() * 3.5 + 1,
      speedY: -Math.random() * 0.9 - 0.3,
      opacity: Math.random(),
      fadeSpeed: Math.random() * 0.02 + 0.008,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;
        if (p.opacity > 1 || p.opacity < 0) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < height / 2 - 220) {
          p.y = height / 2 + 120;
          p.x = width / 2 + (Math.random() - 0.5) * 260;
        }

        ctx.fillStyle = `rgba(255, 182, 193, ${Math.max(0, p.opacity)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Single Realistic Rose Head SVG component
  const RealisticRoseHead = ({ delay = 0, scale = 1, rotate = 0 }: { delay: number; scale?: number; rotate?: number }) => {
    const localProgress = Math.max(0, Math.min((bloomProgress - delay) * 1.6, 1));

    return (
      <g transform={`rotate(${rotate}) scale(${scale})`}>
        {/* Outer Shadow Petals */}
        <motion.path
          d="M 0 -22 C -35 -40 -45 10 0 32 C 45 10 35 -40 0 -22 Z"
          fill="url(#roseDeepGrad)"
          style={{ transformOrigin: '0px 0px', scale: Math.max(0.05, localProgress), rotate: localProgress * 10 }}
        />
        {/* Outer Petals Layer 2 */}
        <motion.path
          d="M -5 -25 C -42 -30 -40 20 0 35 C 40 20 42 -30 -5 -25 Z"
          fill="url(#roseMidGrad)"
          opacity={0.95}
          style={{ transformOrigin: '0px 0px', scale: Math.max(0.05, localProgress * 0.92), rotate: -localProgress * 20 }}
        />
        {/* Middle Petals Layer 3 */}
        <motion.path
          d="M 0 -28 C -30 -42 -32 5 0 25 C 32 5 30 -42 0 -28 Z"
          fill="url(#roseLightGrad)"
          style={{ transformOrigin: '0px 0px', scale: Math.max(0.05, localProgress * 0.85), rotate: localProgress * 28 }}
        />
        {/* Inner Petal Swirl */}
        <motion.path
          d="M 0 -20 C -20 -32 -22 -5 0 16 C 22 -5 20 -32 0 -20 Z"
          fill="#f43f5e"
          style={{ transformOrigin: '0px 0px', scale: Math.max(0.05, localProgress * 0.75), rotate: -localProgress * 38 }}
        />
        {/* Core Rose Spiral Bud */}
        <motion.circle
          cx="0"
          cy="-10"
          r={10 * Math.max(0.1, localProgress)}
          fill="#ffe4e6"
        />
        <motion.path
          d="M -3 -12 C -6 -16 6 -16 3 -12 C 0 -8 0 -8 -3 -12 Z"
          fill="#be123c"
          opacity={localProgress}
        />
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center"
    >
      {/* Background Soft Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-rose-600/25 blur-3xl pointer-events-none" />

      <h2 className="text-xl sm:text-2xl font-light tracking-wide text-rose-200/90 mb-1">
        A Special Bouquet For You
      </h2>
      <p className="text-xs text-rose-300/60 mb-4">
        Watch the roses bloom with eternal love...
      </p>

      {/* SVG Bouquet Container with Sparkle Canvas overlay */}
      <div className="relative w-80 sm:w-96 h-[400px] flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* High-Fidelity Realistic SVG Bouquet */}
        <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(244,63,94,0.45)]">
          <defs>
            <radialGradient id="roseDeepGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="70%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <radialGradient id="roseMidGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="75%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <radialGradient id="roseLightGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Intertwined Bouquet Stems */}
          <g>
            <motion.path
              d="M 150 120 Q 148 240 142 340"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(bloomProgress * 1.3, 1) }}
            />
            <motion.path
              d="M 110 100 Q 130 220 148 340"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(bloomProgress * 1.3, 1) }}
            />
            <motion.path
              d="M 190 100 Q 170 220 154 340"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(bloomProgress * 1.3, 1) }}
            />
            <motion.path
              d="M 95 150 Q 125 240 145 340"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(bloomProgress * 1.3, 1) }}
            />
            <motion.path
              d="M 205 150 Q 175 240 157 340"
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(bloomProgress * 1.3, 1) }}
            />
          </g>

          {/* Rose Leaves & Thorns */}
          <g opacity={Math.max(0, (bloomProgress - 0.2) * 1.25)}>
            <path d="M 125 210 Q 75 195 85 175 Q 115 190 125 210 Z" fill="#16a34a" />
            <path d="M 175 220 Q 225 205 215 185 Q 185 200 175 220 Z" fill="#15803d" />
            <path d="M 135 260 Q 90 250 100 230 Q 125 240 135 260 Z" fill="#16a34a" />
            <path d="M 165 270 Q 210 260 200 240 Q 175 250 165 270 Z" fill="#15803d" />
          </g>

          {/* Bouquet Wrapper & Silk Ribbon Bow */}
          <g opacity={Math.min(bloomProgress * 1.5, 1)}>
            {/* Paper Wrapper Shape */}
            <path
              d="M 110 250 L 190 250 L 170 330 L 130 330 Z"
              fill="rgba(253, 164, 175, 0.25)"
              stroke="rgba(244, 63, 94, 0.4)"
              strokeWidth="1.5"
            />
            {/* Ribbon Knot */}
            <rect x="135" y="270" width="30" height="12" rx="4" fill="url(#ribbonGrad)" />
            {/* Left Ribbon Loop */}
            <path d="M 135 276 C 110 260 110 290 135 276 Z" fill="url(#ribbonGrad)" />
            {/* Right Ribbon Loop */}
            <path d="M 165 276 C 190 260 190 290 165 276 Z" fill="url(#ribbonGrad)" />
            {/* Ribbon Tails */}
            <path d="M 142 282 L 130 320 L 140 318 L 148 282 Z" fill="#e11d48" />
            <path d="M 158 282 L 170 320 L 160 318 L 152 282 Z" fill="#be123c" />
          </g>

          {/* 5 Realistic Roses Blooming in Bouquet Arrangement */}
          {/* 1. Center Rose (Blooms first) */}
          <g transform="translate(150, 110)">
            <RealisticRoseHead delay={0} scale={1.15} rotate={0} />
          </g>

          {/* 2. Top-Left Rose */}
          <g transform="translate(110, 85)">
            <RealisticRoseHead delay={0.15} scale={0.95} rotate={-18} />
          </g>

          {/* 3. Top-Right Rose */}
          <g transform="translate(190, 85)">
            <RealisticRoseHead delay={0.2} scale={0.95} rotate={18} />
          </g>

          {/* 4. Bottom-Left Rose */}
          <g transform="translate(95, 145)">
            <RealisticRoseHead delay={0.3} scale={1.0} rotate={-30} />
          </g>

          {/* 5. Bottom-Right Rose */}
          <g transform="translate(205, 145)">
            <RealisticRoseHead delay={0.35} scale={1.0} rotate={30} />
          </g>
        </svg>
      </div>

      {/* Bold Heartfelt Line when Bouquet Bloom is complete */}
      {isFullyBloomed && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-2 mb-4 px-4"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.7)] font-serif tracking-wide">
            I LOVE YOU 😍😍, CHUTIIIII si cutie pie
          </h3>
        </motion.div>
      )}

      {/* Tap to Collect CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isFullyBloomed ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
        className="mt-4"
      >
        <button
          onClick={onCollect}
          className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 animate-spin text-pink-200" />
          <span>Tap to Collect Your Bouquet 💐</span>
          <Heart className="h-5 w-5 fill-rose-200 text-rose-200 group-hover:scale-125 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};
