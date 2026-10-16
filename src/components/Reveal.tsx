import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type Props = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -65px 0px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
