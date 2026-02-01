import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import DynamicGradientText from '../UIComponents/DynamicGradientText';
// import { useTranslation } from 'react-i18next';

const NotesContent = () => {
  // const { t } = useTranslation('notes');

  const [animationDirection] = useState('bg-left');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <DynamicGradientText
        text="Notes of my mind."
        textSize="text-4xl"
        fontWeight="font-bold"
        gradientFrom="from-red-400"
        gradientVia="via-green-500"
        gradientTo="to-pink-500"
        animationDirection={animationDirection}
      />

      {/* <h1>{t('welcome')}</h1>
      <p>{t('content')}</p> */}
    </motion.div>
  );
};

const Notes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesContent />
    </Suspense>
  );
};

export default Notes;