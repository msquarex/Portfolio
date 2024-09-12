'use client';
import { useRef, useEffect, useState } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const updatePosition = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const updateCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setCursorState('clickable');
      } else if (target.closest('h1, h2, h3')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursor);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: cursorState === 'clickable' ? '80px' : cursorState === 'text' ? '150px' : '250px',
        height: cursorState === 'clickable' ? '80px' : cursorState === 'text' ? '150px' : '250px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(var(--accent-purple-light), ${cursorState === 'clickable' ? '0.6' : cursorState === 'text' ? '0.4' : '0.25'}) 0%, rgba(var(--accent-purple-light), 0) 70%)`,
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform',
        transition: 'width 0.3s, height 0.3s, background 0.3s',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default CursorGlow;