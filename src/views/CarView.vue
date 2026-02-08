<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const carId = route.params.id as string

const car = ref<any>(null)
const loading = ref(true)
const error = ref("")
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  if (!car.value?.photos?.length) return null
  return car.value.photos[currentImageIndex.value]
})

const hasMultipleImages = computed(() => {
  return (car.value?.photos?.length || 0) > 1
})

const nextImage = () => {
  if (!car.value?.photos?.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % car.value.photos.length
}

const prevImage = () => {
  if (!car.value?.photos?.length) return
  currentImageIndex.value =
    (currentImageIndex.value - 1 + car.value.photos.length) % car.value.photos.length
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
}

onMounted(async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cars/${carId}`
    )

    if (!res.ok) {
      throw new Error("Not found")
    }

    car.value = await res.json()
  } catch (e) {
    error.value = "Failed to load car"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div style="padding:40px; max-width:1200px; margin:auto;">
    <div v-if="error" style="color:red">
      {{ error }}
    </div>

    <div v-if="loading" style="text-align:center; padding:60px 0; color:#666;">
      Loading...
    </div>

    <div v-show="!loading && !error">
      <!-- Gallery Section -->
      <div v-if="currentImage" class="gallery-container">
        <!-- Main Image with Navigation Arrows -->
        <div class="main-image-container">
          <img
            :src="currentImage"
            :alt="`${car?.brand} ${car?.model}`"
            class="main-image"
          />

          <!-- Navigation Arrows -->
          <button
            v-if="hasMultipleImages"
            @click="prevImage"
            class="nav-arrow nav-arrow-left"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            v-if="hasMultipleImages"
            @click="nextImage"
            class="nav-arrow nav-arrow-right"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Image Counter -->
          <div v-if="hasMultipleImages" class="image-counter">
            {{ currentImageIndex + 1 }} / {{ car?.photos?.length }}
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="hasMultipleImages" class="thumbnails-container">
          <div class="thumbnails-scroll">
            <button
              v-for="(photo, index) in car?.photos"
              :key="index"
              @click="selectImage(Number(index))"
              class="thumbnail"
              :class="{ active: Number(index) === currentImageIndex }"
            >
              <img :src="photo" :alt="`Thumbnail ${Number(index) + 1}`" />
            </button>
          </div>
        </div>
      </div>

      <!-- Car Details Section -->
      <div class="details-section">
        <h1 class="car-title">{{ car?.brand }} {{ car?.model }}</h1>

        <div class="car-info">
          <p class="info-item">
            <span class="info-label">Year:</span>
            <span class="info-value">{{ car?.year }}</span>
          </p>

          <p v-if="car?.mileage_km" class="info-item">
            <span class="info-label">Mileage:</span>
            <span class="info-value">{{ Number(car.mileage_km).toLocaleString() }} miles</span>
          </p>

          <p class="info-item price-item">
            <span class="info-label">Price:</span>
            <span v-if="car?.price_usd" class="info-value price">
              ${{ Number(car.price_usd).toLocaleString() }}
            </span>
            <span v-else class="info-value">Price on request</span>
          </p>

          <p v-if="car?.engine" class="info-item">
            <span class="info-label">Engine:</span>
            <span class="info-value">{{ car.engine }}</span>
          </p>

          <p v-if="car?.transmission" class="info-item">
            <span class="info-label">Transmission:</span>
            <span class="info-value">{{ car.transmission }}</span>
          </p>

          <p v-if="car?.fuel" class="info-item">
            <span class="info-label">Fuel:</span>
            <span class="info-value">{{ car.fuel }}</span>
          </p>
        </div>

        <div v-if="car?.description" class="description">
          <h2>Description</h2>
          <p>{{ car.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  margin-bottom: 40px;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 600px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  z-index: 10;
  backdrop-filter: blur(8px);
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.nav-arrow-left {
  left: 16px;
}

.nav-arrow-right {
  right: 16px;
}

.image-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.thumbnails-container {
  width: 100%;
  overflow: hidden;
}

.thumbnails-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}

.thumbnails-scroll::-webkit-scrollbar {
  height: 8px;
}

.thumbnails-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnails-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.thumbnails-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.thumbnail {
  flex-shrink: 0;
  width: 100px;
  height: 70px;
  border: 3px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
  background: #f0f0f0;
  padding: 0;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #333;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.details-section {
  margin-top: 32px;
}

.car-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #ffffff;
}

.car-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
  padding: 28px;
  background: #22262c;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.8px;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.price-item .info-value {
  color: #3b82f6;
  font-size: 20px;
  font-weight: 700;
}

.description {
  margin-top: 40px;
}

.description h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #ffffff;
}

.description p {
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .main-image-container {
    height: 400px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .nav-arrow-left {
    left: 8px;
  }

  .nav-arrow-right {
    right: 8px;
  }

  .image-counter {
    bottom: 8px;
    right: 8px;
    padding: 6px 12px;
    font-size: 12px;
  }

  .thumbnail {
    width: 80px;
    height: 56px;
  }

  .car-title {
    font-size: 24px;
  }

  .car-info {
    grid-template-columns: 1fr;
  }
}
</style>
