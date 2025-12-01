import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    if (isLoading) {
      // Lock scroll when loading
      document.body.style.overflow = 'hidden';
      
      setProgress(0);
      setIsComplete(false);
      
      const startTime = Date.now();
      const duration = 1500; // Animate progress over 1.5 seconds

      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min(Math.round((elapsedTime / duration) * 100), 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          animationFrameId = requestAnimationFrame(updateProgress);
        } else {
          setIsComplete(true);
        }
      };

      animationFrameId = requestAnimationFrame(updateProgress);

    } else {
      // Restore scroll
      document.body.style.overflow = '';
      setProgress(0);
      setIsComplete(false);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }
  
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface_light/95 dark:bg-bg_dark/95 backdrop-blur-sm animate-fade-in" aria-live="polite" aria-busy="true">
      <div className={`relative flex flex-col items-center justify-center ${isComplete ? 'animate-pop-in' : ''}`}>
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            className="text-border_light dark:text-border_dark"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-primary drop-shadow-[0_0_10px_rgba(123,62,240,0.5)]"
            style={{transition: 'stroke-dashoffset 0.1s linear'}}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-text_light dark:text-white ${!isComplete ? 'animate-pulse-subtle' : ''}`}>
          {progress}
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;