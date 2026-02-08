<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { fetchProfile } from "../api/api"

const route = useRoute()
const carId = route.params.id as string

const car = ref<any>(null)
const profile = ref<any>(null)
const loading = ref(true)
const error = ref("")
const currentImageIndex = ref(0)
const lightboxOpen = ref(false)

const currentImage = computed(() => {
  if (!car.value?.photos?.length) return null
  return car.value.photos[currentImageIndex.value]
})

const hasMultipleImages = computed(() => {
  return (car.value?.photos?.length || 0) > 1
})

const inquiryMessage = computed(() => {
  if (!car.value) return ""

  const parts = [
    "Hello! Is this car still available?",
    "",
    `• Brand: ${car.value.brand}`,
    `• Model: ${car.value.model}`,
    `• Year: ${car.value.year}`,
  ]

  if (car.value.price_usd) {
    parts.push(`• Price: $${Number(car.value.price_usd).toLocaleString()}`)
  }

  return parts.join("\n")
})

const whatsappLink = computed(() => {
  if (!profile.value?.whatsapp || !car.value) return ""
  // Extract phone number from WhatsApp link
  const match = profile.value.whatsapp.match(/wa\.me\/(\d+)/)
  const phone = match ? match[1] : profile.value.whatsapp.replace(/[^0-9]/g, "")
  const encodedMessage = encodeURIComponent(inquiryMessage.value)
  return `https://wa.me/${phone}?text=${encodedMessage}`
})

const telegramLink = computed(() => {
  if (!profile.value?.telegram || !car.value) return ""
  const username = profile.value.telegram.replace(/^https?:\/\/t\.me\//, "")
  const encodedMessage = encodeURIComponent(inquiryMessage.value)
  return `https://t.me/${username}?text=${encodedMessage}`
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

const openLightbox = () => {
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

onMounted(async () => {
  try {
    // Load profile and car data in parallel
    const [profileData, carRes] = await Promise.all([
      fetchProfile(),
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cars/${carId}`)
    ])

    profile.value = profileData

    if (!carRes.ok) {
      throw new Error("Not found")
    }

    car.value = await carRes.json()
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
            class="main-image clickable"
            @click="openLightbox"
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

        <!-- Make Inquiry Buttons -->
        <div v-if="profile" class="inquiry-section">
          <h3 class="inquiry-title">Interested in this car?</h3>
          <div class="inquiry-buttons">
            <a
              v-if="whatsappLink"
              :href="whatsappLink"
              target="_blank"
              rel="noopener"
              class="inquiry-btn whatsapp-btn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              v-if="telegramLink"
              :href="telegramLink"
              target="_blank"
              rel="noopener"
              class="inquiry-btn telegram-btn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Telegram</span>
            </a>
          </div>
        </div>

        <div v-if="car?.description" class="description">
          <h2>Description</h2>
          <p>{{ car.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Navigation Arrows in Lightbox -->
      <button
        v-if="hasMultipleImages"
        @click.stop="prevImage"
        class="lightbox-nav lightbox-nav-left"
        aria-label="Previous image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        v-if="hasMultipleImages"
        @click.stop="nextImage"
        class="lightbox-nav lightbox-nav-right"
        aria-label="Next image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <img
        :src="currentImage"
        :alt="`${car?.brand} ${car?.model}`"
        class="lightbox-image"
        @click.stop
      />

      <!-- Image Counter in Lightbox -->
      <div v-if="hasMultipleImages" class="lightbox-counter">
        {{ currentImageIndex + 1 }} / {{ car?.photos?.length }}
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

.main-image.clickable {
  cursor: zoom-in;
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

.inquiry-section {
  margin-top: 32px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  text-align: center;
}

.inquiry-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #ffffff;
}

.inquiry-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.inquiry-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.inquiry-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.inquiry-btn:hover::before {
  width: 300px;
  height: 300px;
}

.inquiry-btn svg {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.inquiry-btn span {
  position: relative;
  z-index: 1;
}

.whatsapp-btn {
  background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%);
}

.whatsapp-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.telegram-btn {
  background: linear-gradient(135deg, #0088cc 0%, #0077b5 100%);
}

.telegram-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 136, 204, 0.4);
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

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: zoom-out;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-image {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  cursor: default;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  z-index: 10002;
  backdrop-filter: blur(10px);
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav:active {
  transform: translateY(-50%) scale(0.95);
}

.lightbox-nav-left {
  left: 40px;
}

.lightbox-nav-right {
  right: 40px;
}

.lightbox-counter {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  z-index: 10002;
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

  .inquiry-section {
    padding: 24px 16px;
  }

  .inquiry-title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .inquiry-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .inquiry-btn {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
    font-size: 15px;
  }
}
</style>
