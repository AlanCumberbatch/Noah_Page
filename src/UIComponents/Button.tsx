// Button.tsx
import React from "react";

interface ButtonProps {
  label: string;       // Label for the button
  color?: string;      // Button color (optional)
  onClick: () => void; // Function to handle click event
}

const Button: React.FC<ButtonProps> = ({ label, color = "blue", onClick }) => {
  const buttonStyles = {
    backgroundColor: color,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  // Hover effect to slightly change color
  const handleMouseEnter = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = "dark" + color;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = color;
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );
};

export default Button;