import type { CacheMetadata } from '../types/image'

/**
 * Сервис для кэширования изображений
 * Использует гибридный подход: in-memory cache + Cache API
 */
class ImageCacheService {
  private memoryCache = new Map<string, string>()
  private metadata = new Map<string, CacheMetadata>()
  private cacheAPI: Cache | null = null
  private initialized = false

  private readonly CACHE_NAME = 'abcars-images-v1'
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа

  /**
   * Инициализация Cache API
   */
  async init(): Promise<void> {
    if (this.initialized) return

    try {
      if ('caches' in window) {
        this.cacheAPI = await caches.open(this.CACHE_NAME)
        console.info('✅ Cache API initialized')
      } else {
        console.info('ℹ️ Cache API not available, using in-memory cache only')
      }
    } catch (error) {
      console.warn('⚠️ Failed to initialize Cache API, falling back to in-memory only:', error)
      this.cacheAPI = null
    }

    this.initialized = true
  }

  /**
   * Предзагрузка изображения с кэшированием
   */
  async preloadImage(url: string): Promise<string> {
    if (!url) {
      throw new Error('Invalid image URL')
    }

    // 1. Проверяем in-memory cache
    const memCached = this.memoryCache.get(url)
    if (memCached) {
      return memCached
    }

    // 2. Проверяем Cache API
    if (this.cacheAPI) {
      try {
        const cachedResponse = await this.cacheAPI.match(url)
        if (cachedResponse) {
          // Проверяем срок годности
          const meta = this.metadata.get(url)
          if (meta && Date.now() - meta.cachedAt < this.CACHE_DURATION) {
            // Добавляем в memory cache для быстрого доступа
            this.memoryCache.set(url, url)
            return url
          }
        }
      } catch (error) {
        console.warn('⚠️ Error reading from Cache API:', error)
      }
    }

    // 3. Загружаем с сети
    try {
      const response = await fetch(url, {
        mode: 'cors',
        cache: 'force-cache'
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Сохраняем в Cache API
      if (this.cacheAPI) {
        try {
          await this.cacheAPI.put(url, response.clone())
        } catch (error) {
          console.warn('⚠️ Failed to cache image:', error)
        }
      }

      // Сохраняем метаданные
      this.metadata.set(url, {
        url,
        cachedAt: Date.now(),
        expiresAt: Date.now() + this.CACHE_DURATION
      })

      // Добавляем в in-memory cache
      this.memoryCache.set(url, url)

      return url
    } catch (error) {
      throw new Error(`Failed to load image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Получить кэшированное изображение (без загрузки)
   */
  async getCachedImage(url: string): Promise<string | null> {
    // Проверяем memory cache
    const memCached = this.memoryCache.get(url)
    if (memCached) {
      return memCached
    }

    // Проверяем Cache API
    if (this.cacheAPI) {
      try {
        const cachedResponse = await this.cacheAPI.match(url)
        if (cachedResponse) {
          const meta = this.metadata.get(url)
          if (!meta || Date.now() - meta.cachedAt < this.CACHE_DURATION) {
            this.memoryCache.set(url, url)
            return url
          }
        }
      } catch (error) {
        console.warn('⚠️ Error reading from Cache API:', error)
      }
    }

    return null
  }

  /**
   * Очистить устаревший кэш
   */
  async clearExpiredCache(): Promise<void> {
    const now = Date.now()

    // Очищаем метаданные
    for (const [url, meta] of this.metadata.entries()) {
      if (now - meta.cachedAt >= this.CACHE_DURATION) {
        this.metadata.delete(url)
        this.memoryCache.delete(url)

        // Удаляем из Cache API
        if (this.cacheAPI) {
          try {
            await this.cacheAPI.delete(url)
          } catch (error) {
            console.warn('⚠️ Failed to delete from cache:', error)
          }
        }
      }
    }

    console.info('🧹 Expired cache cleared')
  }

  /**
   * Очистить весь кэш
   */
  async clearAllCache(): Promise<void> {
    // Очищаем memory cache
    this.memoryCache.clear()
    this.metadata.clear()

    // Очищаем Cache API
    if (this.cacheAPI) {
      try {
        const keys = await this.cacheAPI.keys()
        await Promise.all(keys.map(request => this.cacheAPI!.delete(request)))
        console.info('🧹 All cache cleared')
      } catch (error) {
        console.warn('⚠️ Failed to clear Cache API:', error)
      }
    }
  }

  /**
   * Получить статистику кэша
   */
  getCacheStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      metadataSize: this.metadata.size,
      cacheAPIAvailable: !!this.cacheAPI
    }
  }

  /**
   * Проверить, закэшировано ли изображение
   */
  isCached(url: string): boolean {
    return this.memoryCache.has(url)
  }
}

// Singleton instance
export const imageCache = new ImageCacheService()
