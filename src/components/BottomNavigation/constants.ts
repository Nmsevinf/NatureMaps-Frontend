import type { TabConfig } from '../../types/navigation';
import {
  HomeNavIcon,
  SproutNavIcon,
  CameraNavIcon,
  RoutesNavIcon,
  SearchNavIcon,
} from './icons';

export const DEFAULT_TABS: TabConfig[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: HomeNavIcon,
    ariaLabel: 'Ir a Inicio',
  },
  {
    id: 'mapa',
    label: 'Mapa',
    icon: SproutNavIcon,
    ariaLabel: 'Ver Mapa de especies y árboles',
  },
  {
    id: 'escanear',
    label: 'Escanear',
    icon: CameraNavIcon,
    ariaLabel: 'Escanear e identificar especie con la cámara',
  },
  {
    id: 'rutas',
    label: 'Rutas',
    icon: RoutesNavIcon,
    ariaLabel: 'Ver Rutas botánicas y culturales',
  },
  {
    id: 'buscar',
    label: 'Buscar',
    icon: SearchNavIcon,
    ariaLabel: 'Buscar especies, árboles o puntos de interés',
  },
];

