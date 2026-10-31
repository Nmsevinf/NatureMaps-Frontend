import { useNavigate } from 'react-router-dom'
import { readLanguagePreference, saveLanguagePreference } from '../../services/languagePreference'
import type { Language } from '../../types/language'
import { LanguagePage } from './LanguagePage'

/** Ruta /ajustes/idioma: guarda la preferencia y vuelve a Ajustes. */
export function LanguageSettings() {
  const navigate = useNavigate()
  const handleSave = (language: Language) => saveLanguagePreference(language)

  return <LanguagePage language={readLanguagePreference()} onBack={() => navigate(-1)} onSave={handleSave} />
}
