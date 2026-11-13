'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export const PetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create initial batch of floating rose petals
    const petalColors = [
      'rgba(244, 63, 94, ', // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(244, 114, 182, ', // pink-400
      'rgba(225, 29, 72, ', // rose-600
    ];

    const petals: Petal[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Draw single stylized rose petal shape on canvas
    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.fillStyle = `${petal.color}${petal.opacity})`;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-petal.size / 2, -petal.size / 2, -petal.size, petal.size / 3, 0, petal.size);
      ctx.bezierCurveTo(petal.size, petal.size / 3, petal.size / 2, -petal.size / 2, 0, 0);
      ctx.fill();

      // Soft petal center vein highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${petal.opacity * 0.4})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, petal.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((petal) => {
        // Falling and horizontal swaying motion
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(time + petal.size) * 0.6;
        petal.rotation += petal.rotationSpeed;

        // Wrap around screen boundaries
        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }
        if (petal.x > width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = width + 20;

        drawPetal(petal);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
