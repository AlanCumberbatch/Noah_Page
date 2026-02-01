// import React from 'react';

// Define the component and accept props for customization
const DynamicGradientText = ({
  text = 'Hello',                // The text to display
  textSize = 'text-2xl',      // Default text size
  fontWeight = 'font-bold',   // Default font weight
  gradientFrom = 'from-red-500', // Default gradient start color
  gradientVia = 'via-yellow-500', // Default gradient middle color
  gradientTo = 'to-blue-500',     // Default gradient end color
  animationDirection = 'bg-left',  // Default animation direction
  otherClass =''
}) => {
  // Function to generate dynamic Tailwind classes
  const gradientTextClass = `${textSize} ${fontWeight} text-transparent bg-clip-text bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} bg-[length:200%_200%] ${animationDirection} animate-gradient-bg whitespace-pre-line ${otherClass}`;

  return (
    <h1 className={gradientTextClass}>
      {text}
    </h1>
  );
};

export default DynamicGradientText;