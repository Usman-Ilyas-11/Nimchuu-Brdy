import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happy Birthday! 🎉 | Special Birthday Experience',
  description: 'An interactive, multi-stage birthday surprise experience built with love.',
  keywords: ['Birthday', 'Interactive', 'Surprise', 'Celebration'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100 selection:bg-pink-500/30 selection:text-pink-200">
        {children}
      </body>
    </html>
  );
}
