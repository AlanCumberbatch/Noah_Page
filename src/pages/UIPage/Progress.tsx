import React, { useState, useEffect } from 'react';
import Progress from '@/UIComponents/Progress';

const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);

  // Smooth update with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const animateProgress = () => {
      setProgress((prevProgress) => {
        const nextProgress = Math.min(prevProgress + 1, 100); // Increment progress
        if (nextProgress >= 100) return nextProgress; // Stop at 100%
        return nextProgress;
      });
      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animateProgress(); // Start the animation

    // Clean up on component unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ padding: '6px', maxWidth: '400px', margin: '0 auto' }}>
      <Progress value={progress} max={100} />
    </div>
  );
};

export default ProgressDemo;