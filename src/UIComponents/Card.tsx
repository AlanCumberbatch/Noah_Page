import React from 'react';

// Define the interface for CardProps
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onClick }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        width: '300px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          padding: '20px',
        }}
      >
        <h3 style={{ fontSize: '20px', margin: '0 0 10px' }}>{title}</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>{description}</p>
      </div>
    </div>
  );
};

export default Card;