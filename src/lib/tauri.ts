import { invoke } from '@tauri-apps/api/core'

export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI__' in window
}

export const getTauriVersion = async (): Promise<string | null> => {
  if (!isTauri()) return null

  try {
    const version = await invoke('tauri_version')
    return version as string
  } catch {
    return null
  }
}