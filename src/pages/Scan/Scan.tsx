import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CameraScreen } from '../../components/Camera'
import type { CameraMode } from '../../components/Camera'
import { fichaDesdeIdentificacion } from '../FichaPlanta'
import { identifyPlant } from '../../services/identify'
import type { PlantIdentification, PlantMatch } from '../../types/identify'

type IdentificationStatus = 'idle' | 'identifying' | 'completed' | 'error'

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, encoded] = dataUrl.split(',')
  if (!header || !encoded) throw new Error('La imagen capturada no tiene un formato válido')
  const mimeType = /^data:(.*?);base64$/.exec(header)?.[1] ?? 'image/jpeg'
  const binary = atob(encoded)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return new Blob([bytes], { type: mimeType })
}

/**
 * Escanear: cámara con petición de permisos (UT F04), identificación con Pl@ntNet
 * a través del backend y acceso a la ficha de la especie (UT F05).
 * La ficha se abre en /ficha con la especie en el estado de navegación; al volver
 * (atrás) sigue la foto capturada y el resultado.
 */
export function Scan() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<IdentificationStatus>('idle')
  const [results, setResults] = useState<PlantIdentification | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePhotoCaptured = () => {
    setResults(null)
    setError(null)
    setStatus('idle')
  }

  const handleIdentifyPhoto = async (dataUrl: string, mode: CameraMode) => {
    if (mode !== 'planta') return

    setStatus('identifying')
    setResults(null)
    setError(null)
    try {
      const image = dataUrlToBlob(dataUrl)
      const result = await identifyPlant(image, `captura.${image.type === 'image/png' ? 'png' : 'jpg'}`)
      setResults(result)
      setStatus('completed')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Error inesperado al identificar la planta.')
      setStatus('error')
    }
  }

  /** PA 1250: abre la ficha de la especie identificada con su confianza. */
  const handleOpenSpecies = (match: PlantMatch, photo: string | null) => {
    navigate('/ficha', {
      state: { species: fichaDesdeIdentificacion(match, photo), identification: { score: match.score } },
    })
  }

  return (
    <CameraScreen
      onClose={() => navigate('/inicio')}
      onPhotoCaptured={handlePhotoCaptured}
      onIdentifyPhoto={handleIdentifyPhoto}
      onOpenSpecies={handleOpenSpecies}
      identificationStatus={status}
      identificationResults={results}
      identificationError={error}
    />
  )
}
