import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

export function SnowFall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 5,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white opacity-80"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            fontSize: `${flake.size}px`,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
      `}</style>
    </div>
  );
}
