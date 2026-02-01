// import React from 'react';
import { motion } from 'framer-motion';
import DynamicGradientText from '../UIComponents/DynamicGradientText';

const Home = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">

    <div className='h-12'></div>

    {/* <h1 className="text-2xl font-bold text-center">
      <span
        className="text-2xl font-bol text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500
        bg-[length:200%_200%] bg-left animate-gradient-bg"
      >
        Everything is COMING !!!
      </span>
    </h1> */}
    <DynamicGradientText
        text="Everything is COMING !!!"
        textSize="text-６xl"
        fontWeight="font-bold"
        gradientFrom="from-blue-400"
        gradientVia="via-orange-500"
        gradientTo="to-yellow-500"
      />
  </motion.div>
);

export default Home;