/**
 * Результат загрузки одного изображения
 */
export interface ImageLoadResult {
  url: string
  success: boolean
  cachedUrl?: string
  error?: string
}

/**
 * Информация об ошибке загрузки изображения
 */
export interface ImageLoadError {
  url: string
  reason: string
  retryCount: number
  timestamp: number
}

/**
 * Состояние процесса загрузки
 */
export interface LoadingState {
  isLoading: boolean
  progress: number
  loadedCount: number
  totalCount: number
}

/**
 * Опции для прелоадера изображений
 */
export interface PreloaderOptions {
  minDisplayTime?: number  // Минимальное время показа loading bar (ms)
  maxRetries?: number      // Максимальное количество попыток загрузки
  timeout?: number         // Таймаут для загрузки одного изображения (ms)
  concurrency?: number     // Максимальное количество параллельных загрузок
}

/**
 * Метаданные кэшированного изображения
 */
export interface CacheMetadata {
  url: string
  cachedAt: number
  size?: number
  expiresAt?: number
}
