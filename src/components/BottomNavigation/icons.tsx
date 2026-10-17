import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Casa / Home icon matching the Nature MAPS design.
 */
export const HomeNavIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m3 9.5 9-7 9 7v10.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
  </svg>
);

/**
 * Brote / Planta icon faithful to the Nature MAPS mockup.
 */
export const SproutNavIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Tallo central */}
    <path d="M12 21v-9" />
    {/* Hoja izquierda */}
    <path d="M12 12C9 7.5 4.5 7.5 4.5 11c0 3 4.5 3.5 7.5 1z" />
    {/* Hoja derecha */}
    <path d="M12 12c3-4.5 7.5-4.5 7.5-1 0 3-4.5 3.5-7.5 1z" />
  </svg>
);

/**
 * Cámara icon requested for the 'Escanear' tab.
 */
export const CameraNavIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5z" />
    <circle cx="12" cy="14" r="3.5" />
  </svg>
);

/**
 * Rutas / Capas icon matching the stacked diamonds in the mockup.
 */
export const RoutesNavIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Capa superior rombo */}
    <polygon points="12 4 21 8.5 12 13 3 8.5" />
    {/* Capa inferior contorno */}
    <polyline points="3 13.5 12 18 21 13.5" />
  </svg>
);

/**
 * Buscar / Lupa icon matching the mockup.
 */
export const SearchNavIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);

