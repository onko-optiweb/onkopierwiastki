'use client';

import { useEffect, useState } from 'react';

export default function ScrollDNA() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden lg:block pointer-events-none">
      <div
        className="w-14 h-14 opacity-20"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Double helix */}
          <path
            d="M30 5 C30 5, 70 20, 70 30 C70 40, 30 45, 30 55 C30 65, 70 70, 70 80 C70 90, 30 95, 30 95"
            stroke="#122056"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M70 5 C70 5, 30 20, 30 30 C30 40, 70 45, 70 55 C70 65, 30 70, 30 80 C30 90, 70 95, 70 95"
            stroke="#5B65DC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Rungs */}
          <line x1="38" y1="17" x2="62" y2="17" stroke="#122056" strokeWidth="2" opacity="0.3" />
          <line x1="35" y1="30" x2="65" y2="30" stroke="#122056" strokeWidth="2" opacity="0.3" />
          <line x1="38" y1="43" x2="62" y2="43" stroke="#122056" strokeWidth="2" opacity="0.3" />
          <line x1="35" y1="55" x2="65" y2="55" stroke="#122056" strokeWidth="2" opacity="0.3" />
          <line x1="38" y1="68" x2="62" y2="68" stroke="#122056" strokeWidth="2" opacity="0.3" />
          <line x1="35" y1="80" x2="65" y2="80" stroke="#122056" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
