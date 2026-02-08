<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const carId = route.params.id as string

const car = ref<any>(null)
const loading = ref(true)
const error = ref("")

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cars/${id}`)
    const cars = await res.json()
    car.value = cars.find((c: any) => c.id === carId)

    if (!car.value) {
      error.value = "Car not found"
    }
  } catch (e) {
    error.value = "Failed to load car"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div style="padding:40px; max-width:900px; margin:auto;">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error" style="color:red">
      {{ error }}
    </div>

    <div v-else>
      <h1>{{ car.brand }} {{ car.model }}</h1>
      <p>Year: {{ car.year }}</p>

      <p v-if="car.price_usd">
        Price: ${{ car.price_usd.toLocaleString() }}
      </p>
      <p v-else>
        Price on request
      </p>

      <p style="margin-top:20px">
        {{ car.description }}
      </p>

      <div v-if="car.cover_image" style="margin-top:20px">
        <img
          :src="car.cover_image"
          style="max-width:100%; border-radius:12px"
        />
      </div>
    </div>
  </div>
</template>
