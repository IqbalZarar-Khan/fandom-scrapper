import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;