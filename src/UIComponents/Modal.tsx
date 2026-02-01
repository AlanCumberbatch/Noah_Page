// Modal.tsx
import React from "react";
import Button from './Button';

interface ModalProps {
  isOpen: boolean;   // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={modalBackdropStyles}>
      <div style={modalStyles}>
        <h2>Custom Modal</h2>
        <p>This is a custom modal component.</p>
        <Button label="Close" color="red" onClick={onClose} />
      </div>
    </div>
  );
};

const modalBackdropStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color:'black'
};

const modalStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  width: "400px",
  textAlign: "center",
};

export default Modal;