'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Disc, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, autoPlayTriggered }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Fallback synth player using Web Audio API if HTML5 Audio fails
  const playFallbackSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Simple pleasant chord arpeggio loop using sine oscillators
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C4, E4, G4, C5, A4, F4
      let noteIndex = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current || ctx.state !== 'running') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
        noteIndex++;
      };

      const interval = setInterval(playNextNote, 600);
      return () => clearInterval(interval);
    } catch (e) {
      console.warn("Web Audio API Synth fallback failed:", e);
    }
  };

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      console.warn("HTML5 Audio link failed, enabling Web Audio API fallback");
      setHasError(true);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (autoPlayTriggered) {
      handlePlay();
    }
  }, [autoPlayTriggered]);

  const handlePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (hasError) {
        setIsPlaying(true);
        playFallbackSynth();
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio autoplay blocked by browser policy, user interaction required:", err);
      // Try fallback synth
      setIsPlaying(true);
      playFallbackSynth();
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioRef.current && !hasError) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      handlePlay();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-5 right-5 z-50 flex items-center gap-3"
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="group relative flex items-center gap-3 rounded-full bg-slate-900/60 p-2.5 pr-4 backdrop-blur-xl border border-pink-500/30 text-white shadow-lg shadow-pink-500/10 hover:border-pink-400 hover:bg-slate-900/80 transition-all duration-300 active:scale-95"
      >
        {/* Spinning Vinyl Record Icon */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="flex items-center justify-center text-pink-400"
          >
            <Disc className="w-6 h-6" />
          </motion.div>
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping" />
          )}
        </div>

        {/* Audio Equalizer Bars Animation */}
        <div className="flex items-end gap-0.5 h-4">
          {[0.4, 0.9, 0.6, 1, 0.5].map((heightScale, idx) => (
            <motion.span
              key={idx}
              animate={{
                scaleY: isPlaying ? [heightScale, 1, 0.2, heightScale] : 0.2
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + idx * 0.15,
                ease: 'easeInOut'
              }}
              className="w-1 h-full bg-gradient-to-t from-pink-500 to-rose-400 rounded-full origin-bottom"
            />
          ))}
        </div>

        {/* Play / Pause Text & Icon */}
        <span className="text-xs font-medium tracking-wide text-pink-200/90 hidden sm:inline">
          {isPlaying ? 'Playing Birthday Melody' : 'Play Music'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </motion.div>
  );
};
