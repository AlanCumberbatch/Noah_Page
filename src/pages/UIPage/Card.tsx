import React from 'react';
import Card from '@/UIComponents/Card';

const CardDemo: React.FC = () => {
  const handleCardClick = () => {
    alert('Card clicked!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card
        title="Beautiful Nature"
        description="A beautiful view of the mountains and lakes during sunset."
        imageUrl="https://via.placeholder.com/300"
        onClick={handleCardClick}
      />
    </div>
  );
};

export default CardDemo;