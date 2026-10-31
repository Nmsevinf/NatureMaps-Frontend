import { useLocation, useNavigate } from 'react-router-dom'
import { FichaPlantaPage } from './FichaPlantaPage'
import type { FichaEspecie, IdentificacionFicha } from './types'

interface FichaState {
  species?: FichaEspecie
  identification?: IdentificacionFicha | null
}

/**
 * Ruta /ficha. Con una especie identificada llega por el estado de navegación
 * (desde Escanear); sin ella se muestra la ficha de ejemplo.
 */
export function Ficha() {
  const navigate = useNavigate()
  const state = useLocation().state as FichaState | null

  return (
    <FichaPlantaPage
      {...(state?.species ? { species: state.species } : {})}
      identification={state?.identification ?? null}
      onBack={() => navigate(-1)}
      onViewOnMap={() => navigate('/mapa')}
    />
  )
}
