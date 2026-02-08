<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { useImagePreloader } from "../composables/useImagePreloader"
import LoadingBar from "../components/LoadingBar.vue"

const route = useRoute()
const carId = route.params.id as string

const car = ref<any>(null)
const loading = ref(true)
const error = ref("")

const {
  isLoading: imageLoading,
  progress,
  preloadImages
} = useImagePreloader()

// Показываем loading bar если загружаются данные или изображения
const showLoading = computed(() => loading.value || imageLoading.value)
const loadingMessage = computed(() => {
  if (loading.value) return "Loading car details..."
  if (imageLoading.value) return "Loading images..."
  return "Loading..."
})

onMounted(async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cars/${carId}`
    )

    if (!res.ok) {
      throw new Error("Not found")
    }

    car.value = await res.json()

    // Прелоадим изображение машины
    if (car.value?.cover_image) {
      await preloadImages([car.value.cover_image])
    }
  } catch (e) {
    error.value = "Failed to load car"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Loading overlay -->
  <LoadingBar
    v-if="showLoading"
    :progress="progress"
    :message="loadingMessage"
  />

  <div style="padding:40px; max-width:900px; margin:auto;">
    <div v-if="error" style="color:red">
      {{ error }}
    </div>

    <div v-show="!showLoading && !error">
      <h1>{{ car?.brand }} {{ car?.model }}</h1>
      <p>Year: {{ car?.year }}</p>

      <p v-if="car?.price_usd">
        Price: ${{ car.price_usd.toLocaleString() }}
      </p>
      <p v-else>
        Price on request
      </p>

      <p style="margin-top:20px">
        {{ car?.description }}
      </p>

      <div v-if="car?.cover_image" style="margin-top:20px">
        <img
          :src="car.cover_image"
          style="max-width:100%; border-radius:12px"
        />
      </div>
    </div>
  </div>
</template>
