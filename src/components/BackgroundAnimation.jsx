import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ORBS = [
  { size: 600, x: '10%', y: '5%', blur: 120, speed: 1 },
  { size: 400, x: '75%', y: '15%', blur: 100, speed: 0.7 },
  { size: 350, x: '50%', y: '60%', blur: 90, speed: 0.5 },
  { size: 500, x: '85%', y: '70%', blur: 110, speed: 0.9 },
  { size: 300, x: '20%', y: '80%', blur: 80, speed: 0.6 },
];

export default function BackgroundAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll('.bg-orb');
    const mm = gsap.matchMedia();

    // Only run on non-reduced-motion and non-mobile
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      orbs.forEach((orb, i) => {
        const data = ORBS[i];
        if (!data) return;

        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-40, 40)`,
          scale: `random(0.9, 1.15)`,
          duration: 8 / data.speed,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        gsap.to(orb, {
          scale: `random(0.85, 1.1)`,
          duration: 12 / data.speed,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        // Opacity pulse
        gsap.to(orb, {
          opacity: `random(0.4, 0.8)`,
          duration: 10 / data.speed,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 1.5,
        });
      });
    });

    return () => {
      mm.revert();
      orbs.forEach((orb) => gsap.killTweensOf(orb));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="bg-orb"
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(24,24,27,0.04) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(24,24,27,0.025) 0%, transparent 70%)',
            filter: `blur(${orb.blur}px)`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
            opacity: 0.5,
          }}
        />
      ))}

      <style>{`
        html.dark .bg-orb:nth-child(odd) {
          background: radial-gradient(circle, rgba(120,120,255,0.04) 0%, transparent 70%);
        }
        html.dark .bg-orb:nth-child(even) {
          background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
}
