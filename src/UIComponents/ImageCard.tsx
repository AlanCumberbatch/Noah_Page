// src/components/ImageCard.tsx

import React from 'react';
// import { motion } from 'framer-motion';

interface ImageCardProps {
  imageSrc: string;
  altText?: string;
  description: String;
  onClick?: () => void;
  width: string;
  height: string;
  otherStyle?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, description, altText="null", onClick, width = "w-48", height = "h-48", otherStyle }) => {
  const custumeClass = `${width} ${height} image-card aspect-w-1 aspect-h-1 relative group ${otherStyle}`;

  // 如果 description 为空或仅包含空格，不渲染对应的 div
  if (!description?.trim()) {
    return (
      <div className={custumeClass} onClick={onClick}>
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }


  const lines = description.split('\\n');

  return (
    <div className={custumeClass} onClick={onClick}>
      <img
        src={imageSrc} alt={altText}
        className="w-full h-full object-cover"
      />
      <div  className="absolute bottom-0 left-0 right-0 text-white p-2 bg-gray-200 bg-opacity-70 overflow-hidden text-ellipsis whitespace-nowrap transition-opacity opacity-0 group-hover:opacity-100 ">
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
      </div>
  </div>
  );
};

export default ImageCard;