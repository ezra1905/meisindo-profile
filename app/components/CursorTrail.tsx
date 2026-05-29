"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Wine-inspired colors
  const wineColors = [
    "#722F37", // Deep wine red
    "#8B0000", // Dark red
    "#ed6a17", // Brand orange
    "#C71585", // Medium violet red
    "#DC143C", // Crimson
    "#B22222", // Fire brick
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxParticles = 20;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse move - create wine trail particles
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create wine droplet particles following cursor
      for (let i = 0; i < 2; i++) {
        if (particlesRef.current.length >= maxParticles) break;

        const particle: Particle = {
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 12 + 6,
          opacity: 0.8 + Math.random() * 0.2,
          color: wineColors[Math.floor(Math.random() * wineColors.length)],
          life: 0,
          maxLife: 30 + Math.random() * 20,
        };

        particlesRef.current.push(particle);
      }
    };

    // Click/Touch - create ripple burst effect
    const handleInteraction = (x: number, y: number) => {
      // Create ripple effect at interaction point
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const ripple: Ripple = {
          x,
          y,
          size: 10,
          opacity: 1,
        };
        ripplesRef.current.push(ripple);

        // Add burst particles
        for (let j = 0; j < 3; j++) {
          if (particlesRef.current.length < maxParticles) {
            const particle: Particle = {
              x,
              y,
              vx: Math.cos(angle) * (4 + Math.random() * 3),
              vy: Math.sin(angle) * (4 + Math.random() * 3),
              size: Math.random() * 8 + 4,
              opacity: 1,
              color: wineColors[Math.floor(Math.random() * wineColors.length)],
              life: 0,
              maxLife: 25,
            };
            particlesRef.current.push(particle);
          }
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw wine particles (droplets)
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.opacity -= 0.025;
        p.size *= 0.97;

        if (p.opacity <= 0 || p.life > p.maxLife) return false;

        // Draw wine droplet with gradient
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.6, p.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.opacity * 0.7;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.globalAlpha = p.opacity * 0.5;
        ctx.fill();

        return true;
      });

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.size += 4;
        r.opacity -= 0.08;

        if (r.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
        ctx.strokeStyle = "#722F37";
        ctx.lineWidth = 2;
        ctx.globalAlpha = r.opacity;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = "#ed6a17";
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-9998 opacity-40"
      style={{ mixBlendMode: "normal" }}
    />
  );
}