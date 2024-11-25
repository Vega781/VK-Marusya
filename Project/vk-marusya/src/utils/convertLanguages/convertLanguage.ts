import { langs } from './languagesList'

export function convertLanguage(code: string) {
    return langs[code]
}