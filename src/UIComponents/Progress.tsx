import React from 'react';

interface ProgressProps {
  value: number;
  max: number;
}

const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percentage = Math.min((value / max) * 100, 100); // Calculate percentage

  // Define styles for the progress and percent bars
  const progressBarStyle = {
    width: '100%',
    height: '20px',
    backgroundColor: '#eee',
    borderRadius: '10px',
    marginBottom: '10px',
    transition: 'all 0.1s ease-in-out', // Smooth transition for the progress bar
  };

  const progressBarForegroundStyle = {
    height: '100%',
    backgroundColor: '#4caf50',
    width: `${percentage}%`,
  };

  // const percentBarStyle = {
  //   width: `${percentage}%`,
  //   height: '10px',
  //   backgroundColor: '#2196F3',
  //   borderRadius: '5px',
  //   marginBottom: '10px',
  //   transition: 'all 0.1s ease-in-out', // Smooth transition for the percent bar
  // };

  const progressLabelStyle = {
    fontSize: '14px',
    color: '#333',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Progress Bar */}
      <div style={progressBarStyle}>
        <div style={progressBarForegroundStyle}></div>
      </div>

      {/* Percent Bar */}
      {/* <div style={percentBarStyle}></div> */}

      {/* Label Showing Percentage */}
      <div style={progressLabelStyle}>{`${percentage.toFixed(1)}%`}</div>
    </div>
  );
};

export default Progress;