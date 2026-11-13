export type Stage = 'lock' | 'rose' | 'music_message' | 'cake' | 'celebration';

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation: number; // degrees for natural scrapbook layout
  emotionalLine?: string; // special heartfelt line shown in the lightbox modal
}

export interface BirthdayConfig {
  friendName: string;
  secretPin: string;
  hintMessage: string;
  letterMessage: string[];
  audioUrl: string;
  photos: PolaroidPhoto[];
}
