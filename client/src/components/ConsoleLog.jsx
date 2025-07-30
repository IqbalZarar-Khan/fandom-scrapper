import React from 'react';

function ConsoleLog({ logs }) {
  return (
    <div className="console-log">
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

export default ConsoleLog;