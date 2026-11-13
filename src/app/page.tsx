'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Stage } from '@/types/birthday';
import { BIRTHDAY_CONFIG } from '@/config/birthday';
import { LockScreen } from '@/components/stages/LockScreen';
import { RoseAnimation } from '@/components/stages/RoseAnimation';
import { MessageCard } from '@/components/stages/MessageCard';
import { CakeCutting } from '@/components/stages/CakeCutting';
import { Celebration } from '@/components/stages/Celebration';
import { AudioPlayer } from '@/components/AudioPlayer';
import { PetalsCanvas } from '@/components/effects/PetalsCanvas';

export default function BirthdayApp() {
  const [stage, setStage] = useState<Stage>('lock');
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  // Transition handler
  const handleUnlock = () => setStage('rose');
  const handleCollectRose = () => {
    setAutoPlayAudio(true);
    setStage('music_message');
  };
  const handleMessageNext = () => setStage('cake');
  const handleCelebrate = () => setStage('celebration');
  const handleReplay = () => {
    setStage('lock');
    setAutoPlayAudio(false);
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Background Radial Gradient Aura */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-600/20 via-rose-500/15 to-purple-600/20 blur-[120px]" />
      </div>

      {/* Floating Rose Petals Canvas Effect */}
      <PetalsCanvas />

      {/* Floating Music Audio Player (top-right) */}
      <AudioPlayer
        audioUrl={BIRTHDAY_CONFIG.audioUrl}
        autoPlayTriggered={autoPlayAudio}
      />

      {/* Main Multi-Stage Animated Flow */}
      <AnimatePresence mode="wait">
        {stage === 'lock' && (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        )}

        {stage === 'rose' && (
          <RoseAnimation key="rose" onCollect={handleCollectRose} />
        )}

        {stage === 'music_message' && (
          <MessageCard
            key="music_message"
            onNext={handleMessageNext}
            onAudioStart={() => setAutoPlayAudio(true)}
          />
        )}

        {stage === 'cake' && (
          <CakeCutting key="cake" onCelebrate={handleCelebrate} />
        )}

        {stage === 'celebration' && (
          <Celebration key="celebration" onReplay={handleReplay} />
        )}
      </AnimatePresence>
    </main>
  );
}
