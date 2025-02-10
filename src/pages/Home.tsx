import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      margin: 0,
      backgroundColor: '#f4f4f4',
      overflow: 'hidden'
    }}>
      <svg style={{
        width: '100%',
        height: 'auto',
        maxWidth: '750px',
        maxHeight: '500px'
      }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Rotating Gear */}
        <g style={{
          animation: 'rotate 3s linear infinite',
          transformOrigin: 'center'
        }}>
          <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="4" fill="none" />
          <path d="M100 20 L110 40 L90 40 Z" fill="black" />
          <path d="M100 180 L110 160 L90 160 Z" fill="black" />
          <path d="M20 100 L40 110 L40 90 Z" fill="black" />
          <path d="M180 100 L160 110 L160 90 Z" fill="black" />
        </g>
        {/* Background for Current Time */}
        <rect x="80" y="92" width="40" height="16" fill="white" rx="4" ry="4" />
        {/* Current Time */}
        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          fill: 'black'
        }}>{currentTime}</text>
      </svg>
      <style>
        {`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
