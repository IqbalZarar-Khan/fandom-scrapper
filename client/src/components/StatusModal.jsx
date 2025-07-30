import React from 'react';

function StatusModal({ isOpen, message }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default StatusModal;