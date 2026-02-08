<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { fetchProfile, fetchCars } from "../api/api"
import { useImagePreloader } from "../composables/useImagePreloader"
import HeroProfile from "../components/HeroProfile.vue"
import CarGrid from "../components/CarGrid.vue"
import ModelMarquee from "../components/ModelMarquee.vue"
import LoadingBar from "../components/LoadingBar.vue"

const profile = ref<any | null>(null)
const cars = ref<any[]>([])
const activeBrand = ref<string | null>(null)

const { isLoading, progress, preloadImages } = useImagePreloader()

onMounted(async () => {
  // 1. Загружаем данные
  profile.value = await fetchProfile()
  cars.value = await fetchCars()

  // 2. Собираем URLs всех изображений
  const imageUrls = [
    profile.value?.hero_image,
    ...cars.value.map(c => c.cover_image)
  ].filter(Boolean) as string[]

  // 3. Прелоадим все изображения
  await preloadImages(imageUrls)
})

const brands = computed(() => {
  const brandList = cars.value
    .map(c => (c.brand || "").trim())
    .filter(b => b.length > 0)
  return Array.from(new Set(brandList)).sort()
})

const filteredCars = computed(() => {
  let list = cars.value

  if (activeBrand.value) {
    const selectedBrand = activeBrand.value.trim().toLowerCase()
    list = list.filter(c => {
      const carBrand = (c.brand || "").trim().toLowerCase()
      return carBrand === selectedBrand
    })
  }

  if (priceFilter.value) {
    list = list.filter(matchPrice)
  }

  return list
})

const priceFilter = ref<"low" | "mid" | "high" | null>(null)

function matchPrice(car: any) {
  const price = car.price_usd
  if (!price) return false

  if (priceFilter.value === "low") return price < 3000
  if (priceFilter.value === "mid") return price >= 3000 && price <= 6000
  if (priceFilter.value === "high") return price > 6000

  return true
}

</script>

<template>
  <!-- Loading overlay - показываем только его пока загружается -->
  <div v-if="isLoading">
    <LoadingBar
      :progress="progress"
      message="Loading images..."
    />
  </div>

  <!-- Main content - показываем только когда загрузка завершена -->
  <div v-else>
    <HeroProfile v-if="profile" :profile="profile" />

    <ModelMarquee
      :brands="brands"
      :activeBrand="activeBrand"
      :priceFilter="priceFilter"
      @select="b => activeBrand = b"
      @price="p => priceFilter = p"
    />

    <CarGrid :cars="filteredCars" />
  </div>
</template>


<style scoped>
.price-filters {
  display: flex;
  gap: 10px;
  padding: 0 16px 12px;
}
</style>