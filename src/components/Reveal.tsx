import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Props = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className = '', delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -65px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
