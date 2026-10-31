import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { Scan } from './Scan'

describe('Scan', () => {
  it('muestra la pantalla de cámara con su petición de permiso', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/escanear" element={<Scan />} />
      </Routes>,
      { route: '/escanear' },
    )
    // Sin getUserMedia (jsdom) la cámara no arranca: la pantalla debe seguir montada y ofrecer una salida.
    expect(await screen.findAllByRole('button')).not.toHaveLength(0)
  })
})
