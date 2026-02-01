import { useState } from 'react';
import { motion } from 'framer-motion';

import DynamicGradientText from '../UIComponents/DynamicGradientText';

const CesiumPage = () => {

  // const [animationDirection, setAnimationDirection] = useState('bg-left');
  const [animationDirection] = useState('bg-left');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <DynamicGradientText
        text="3D is fantastic !!!"
        textSize="text-4xl"
        fontWeight="font-bold"
        gradientFrom="from-red-400"
        gradientVia="via-green-500"
        gradientTo="to-pink-500"
        animationDirection={animationDirection}
      />
      {/* <button onClick={() => setAnimationDirection('bg-right')}>
        Change Animation Direction
      </button> */}
    </motion.div>
  );
}

export default CesiumPage;