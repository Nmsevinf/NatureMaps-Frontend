import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { LANGUAGE_STORAGE_KEY } from './services/languagePreference'
import { renderWithProviders } from './test/renderWithProviders'

vi.mock('./components/MapView', () => ({ MapView: () => <div data-testid="mapa" /> }))
vi.mock('./services/api', () => ({ checkHealth: vi.fn().mockResolvedValue(true) }))

const withMode = () => localStorage.setItem('naturemaps:prefs', JSON.stringify({ mode: 'esencial' }))

describe('App', () => {
  beforeEach(() => localStorage.clear())

  it('sin modo elegido empieza en la selección de modo', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('heading', { name: /cómo quieres explorar valencia/i })).toBeInTheDocument()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
  })

  it('con modo elegido empieza en inicio, con la barra inferior', () => {
    withMode()
    renderWithProviders(<App />)
    expect(screen.getByRole('heading', { name: 'Hola, explorador' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /ir a inicio/i })).toHaveAttribute('aria-selected', 'true')
  })

  it('el mapa se carga bajo demanda al entrar en la pestaña', async () => {
    withMode()
    renderWithProviders(<App />, { route: '/inicio' })
    fireEvent.click(screen.getByRole('tab', { name: /ver mapa/i }))
    expect(await screen.findByTestId('mapa')).toBeInTheDocument()
  })

  it('una ruta desconocida muestra el 404', () => {
    renderWithProviders(<App />, { route: '/nada' })
    expect(screen.getByText('Pantalla no encontrada')).toBeInTheDocument()
  })

  it('mantiene las cinco pestañas de la navegación inferior', () => {
    withMode()
    renderWithProviders(<App />, { route: '/inicio' })
    expect(screen.getAllByRole('tab')).toHaveLength(5)
  })
})

describe('selector de idioma en Ajustes', () => {
  beforeEach(() => {
    localStorage.clear()
    withMode()
  })

  const openLanguagePage = () => {
    renderWithProviders(<App />, { route: '/ajustes' })
    fireEvent.click(screen.getByRole('link', { name: /idioma/i }))
  }

  it('arranca con el español seleccionado por defecto', () => {
    renderWithProviders(<App />, { route: '/ajustes' })
    expect(screen.getByRole('heading', { name: 'Ajustes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /idioma/i })).toHaveTextContent('Español')
  })

  it('ofrece español, valenciano e inglés en Ajustes > Idioma', () => {
    openLanguagePage()
    expect(screen.getByRole('heading', { name: 'Idioma' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Español' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Valencià' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'English' })).not.toBeChecked()
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('guarda el inglés como preferencia y vuelve a Ajustes sin traducir los textos', () => {
    openLanguagePage()
    fireEvent.click(screen.getByRole('radio', { name: 'English' }))
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
    expect(screen.getByRole('heading', { name: 'Ajustes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /idioma/i })).toHaveTextContent('English')
  })

  it('guarda el valenciano como preferencia', () => {
    openLanguagePage()
    fireEvent.click(screen.getByRole('radio', { name: 'Valencià' }))
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('va')
    expect(screen.getByRole('link', { name: /idioma/i })).toHaveTextContent('Valencià')
  })

  it('descarta la selección si se sale sin guardar', () => {
    openLanguagePage()
    fireEvent.click(screen.getByRole('radio', { name: 'English' }))
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }))

    expect(screen.getByRole('heading', { name: 'Ajustes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /idioma/i })).toHaveTextContent('Español')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBeNull()
  })

  it('restaura la preferencia guardada al volver a abrir la app', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'va')
    renderWithProviders(<App />, { route: '/ajustes' })
    expect(screen.getByRole('link', { name: /idioma/i })).toHaveTextContent('Valencià')
  })
})

describe('ficha de planta (RF3)', () => {
  beforeEach(() => {
    localStorage.clear()
    withMode()
  })

  it('abre la ficha desde Inicio y vuelve', () => {
    renderWithProviders(<App />, { route: '/inicio' })
    fireEvent.click(screen.getByRole('link', { name: /ficha de planta/i }))

    expect(screen.getByRole('heading', { level: 1, name: 'Jacaranda mimosifolia' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver en el mapa/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Volver' }))
    expect(screen.getByRole('heading', { name: 'Hola, explorador' })).toBeInTheDocument()
  })
})
