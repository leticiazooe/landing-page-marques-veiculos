import type { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; delay?: number };

/** Conteúdo imediatamente visível para visitantes, leitores de tela e indexadores. */
export function Reveal({ children, className = '' }: Props) {
  return <div className={className}>{children}</div>;
}
