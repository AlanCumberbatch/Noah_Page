import React from 'react';

// Snackbar component
interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onClose }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        minWidth: '200px',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Snackbar;