import type { ComponentType } from 'react';

export type TabId = 'inicio' | 'mapa' | 'escanear' | 'rutas' | 'buscar';

export interface TabConfig {
  id: TabId;
  label: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  ariaLabel: string;
  badge?: string | number | boolean;
}

