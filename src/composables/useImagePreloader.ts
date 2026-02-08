import { ref, computed } from 'vue'
import { imageCache } from '../services/imageCache'
import type { ImageLoadError, ImageLoadResult, PreloaderOptions } from '../types/image'

/**
 * Composable для прелоадинга изображений с отслеживанием прогресса
 */
export function useImagePreloader(options: PreloaderOptions = {}) {
  const {
    minDisplayTime = 500,
    maxRetries = 3,
    timeout = 10000,
    concurrency = 10
  } = options

  // Реактивное состояние
  const isLoading = ref(false)
  const progress = ref(0)
  const loadedCount = ref(0)
  const totalCount = ref(0)
  const errors = ref<ImageLoadError[]>([])
  const loadStartTime = ref(0)

  /**
   * Прелоадинг массива изображений
   */
  async function preloadImages(urls: string[]): Promise<ImageLoadResult[]> {
    // Валидация и дедупликация
    const uniqueUrls = Array.from(new Set(urls.filter(url => url && typeof url === 'string')))

    if (uniqueUrls.length === 0) {
      console.warn('⚠️ No valid image URLs to preload')
      return []
    }

    // Инициализация
    reset()
    isLoading.value = true
    loadStartTime.value = Date.now()
    totalCount.value = uniqueUrls.length
    errors.value = []

    console.info(`🚀 Starting preload of ${uniqueUrls.length} images...`)

    // Инициализация кэша
    await imageCache.init()

    // Загрузка изображений с ограничением параллелизма
    const results = await loadImagesWithConcurrency(uniqueUrls, concurrency)

    // Убеждаемся, что loading bar показывается минимальное время
    await ensureMinimumDisplayTime()

    // Завершение
    isLoading.value = false
    progress.value = 100

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    console.info(`✅ Preload complete: ${successCount} loaded, ${failCount} failed`)

    if (errors.value.length > 0) {
      console.warn('⚠️ Failed images:', errors.value)
    }

    return results
  }

  /**
   * Загрузка изображений с ограничением количества параллельных запросов
   */
  async function loadImagesWithConcurrency(
    urls: string[],
    limit: number
  ): Promise<ImageLoadResult[]> {
    const results: ImageLoadResult[] = []
    const queue = [...urls]

    // Создаем пул воркеров
    const workers = Array(Math.min(limit, urls.length))
      .fill(null)
      .map(async () => {
        while (queue.length > 0) {
          const url = queue.shift()
          if (!url) break

          const result = await loadSingleImage(url)
          results.push(result)

          // Обновляем прогресс
          loadedCount.value++
          progress.value = Math.round((loadedCount.value / totalCount.value) * 100)
        }
      })

    await Promise.all(workers)
    return results
  }

  /**
   * Загрузка одного изображения с retry логикой
   */
  async function loadSingleImage(
    url: string,
    retryCount = 0
  ): Promise<ImageLoadResult> {
    try {
      // Проверяем, не закэшировано ли уже
      const cached = await imageCache.getCachedImage(url)
      if (cached) {
        return {
          url,
          success: true,
          cachedUrl: cached
        }
      }

      // Загружаем с timeout
      const cachedUrl = await loadWithTimeout(url, timeout)

      return {
        url,
        success: true,
        cachedUrl
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      // Retry логика
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 100 // Exponential backoff: 100ms, 200ms, 400ms
        console.warn(`⚠️ Retrying ${url} (attempt ${retryCount + 1}/${maxRetries}) after ${delay}ms`)

        await sleep(delay)
        return loadSingleImage(url, retryCount + 1)
      }

      // После всех попыток - фиксируем ошибку
      const loadError: ImageLoadError = {
        url,
        reason: errorMessage,
        retryCount,
        timestamp: Date.now()
      }

      errors.value.push(loadError)

      return {
        url,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Загрузка изображения с таймаутом
   */
  function loadWithTimeout(url: string, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Timeout after ${timeoutMs}ms`))
      }, timeoutMs)

      imageCache
        .preloadImage(url)
        .then(cachedUrl => {
          clearTimeout(timer)
          resolve(cachedUrl)
        })
        .catch(error => {
          clearTimeout(timer)
          reject(error)
        })
    })
  }

  /**
   * Убедиться, что loading bar показывается минимальное время
   */
  async function ensureMinimumDisplayTime(): Promise<void> {
    const elapsed = Date.now() - loadStartTime.value
    if (elapsed < minDisplayTime) {
      const remainingTime = minDisplayTime - elapsed
      await sleep(remainingTime)
    }
  }

  /**
   * Вспомогательная функция для задержки
   */
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Сброс состояния
   */
  function reset(): void {
    isLoading.value = false
    progress.value = 0
    loadedCount.value = 0
    totalCount.value = 0
    errors.value = []
    loadStartTime.value = 0
  }

  /**
   * Computed свойства для удобства
   */
  const hasErrors = computed(() => errors.value.length > 0)
  const isComplete = computed(() => !isLoading.value && progress.value === 100)
  const successRate = computed(() => {
    if (totalCount.value === 0) return 100
    return Math.round(((totalCount.value - errors.value.length) / totalCount.value) * 100)
  })

  return {
    // Состояние
    isLoading,
    progress,
    loadedCount,
    totalCount,
    errors,

    // Computed
    hasErrors,
    isComplete,
    successRate,

    // Методы
    preloadImages,
    reset,

    // Дополнительные утилиты
    getCacheStats: () => imageCache.getCacheStats(),
    clearCache: () => imageCache.clearAllCache()
  }
}
