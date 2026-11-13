import { BirthdayConfig } from '@/types/birthday';

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  friendName: "Choti",
  // 4-digit PIN or secret code to unlock stage 1
  secretPin: "7500",
  hintMessage: "Enter our age difference followed by double zero (00) 🤫",

  // Heartfelt letter split into paragraphs for typewriter animation
  letterMessage: [
    "Happy Birthday to my sweetest \"Choti\" and the most precious blessing of my life! 🎂🌷✨",
    "Thank you for bringing so much endless joy, pure innocence, and deep peace into my world.",
    "You are not just my best friend, but an answered prayer that I thank Allah for every single day. 🤲🏻🤍",
    "May Allah protect that beautiful smile, bless you with infinite happiness, and grant us a lifetime of Halal togetherness. Ameen. 🥹🫶🏻",
    "Happy Birthday, my absolute favorite human—I love you so, so much! 🥰🖤🎉"
  ],

  // High-quality acoustic / birthday royalty-free instrumental stream URL (with Web Audio synth fallback)
  audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",

  // Polaroid scrapbook photos for Stage 5
  photos: [
    {
      id: 'photo-1',
      url: '/1.jpeg',
      caption: 'Our First Picture Together 🤍',
      date: 'The Beginning of Everything',
      rotation: -4,
      emotionalLine: "This was the moment it all began… a memory I will hold in my heart forever. Every time I look at this, I feel so grateful that we found each other. 🥹🤍",
    },
    {
      id: 'photo-2',
      url: '/2.jpeg',
      caption: 'Our Second Click, Same Laughter 😂🤍',
      date: 'Another Magical Day Together',
      rotation: 3,
      emotionalLine: "The second photo, but the same contagious laughter… some things never change between us. Every moment spent giggling with you is one I never want to forget. 😂🥹🤍",
    },
    {
      id: 'photo-3',
      url: '/3.jpeg',
      caption: 'Eid Mubarak, My Heart 🌙✨',
      date: 'Eid — Apart in Distance, Together in Heart',
      rotation: -2,
      emotionalLine: "We were at our own homes that Eid… but somehow you were right there in every moment. Distance means nothing when someone lives in your heart. Eid will always remind me of you. 🌙🤍",
    },
    {
      id: 'photo-4',
      url: '/4.jpeg',
      caption: 'That Expression Tho 😤🥺🤍',
      date: 'Every Tease, More Love',
      rotation: 5,
      emotionalLine: "This face right here… this exact expression after I teased you — I swear it makes me fall for you a little more every single time. You don't even know how adorable your reactions are. Keep being you, I'll keep loving you more. 😤🥺🤍",
    },
    {
      id: 'photo-5',
      url: '/5.jpeg',
      caption: 'My Future Wife at a Wedding 💍🤍',
      date: 'The Day I Saw My Forever',
      rotation: -3,
      emotionalLine: "I  think — one day, I want you walking towards me like that. You were so breathtakingly gorgeous that day, I was completely overwhelmed. The way you looked, the way you smiled — I want that beauty to be mine, forever. 💍🥹🤍",
    },
  ]
};
