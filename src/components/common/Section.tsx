import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'black' | 'white' | 'gradient';
}

export const Section = ({
  children,
  className = '',
  id,
  background = 'black',
}: SectionProps) => {
  const bgClasses = {
    black: 'bg-black text-white',
    white: 'bg-white text-black',
    gradient: 'bg-gradient-to-br from-black via-gray-900 to-black text-white',
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`py-16 lg:py-24 ${bgClasses[background]} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
  );
};
