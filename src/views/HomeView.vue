<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { fetchProfile, fetchCars } from "../api/api"
import HeroProfile from "../components/HeroProfile.vue"
import CarGrid from "../components/CarGrid.vue"
import ModelMarquee from "../components/ModelMarquee.vue"

const profile = ref<any | null>(null)
const cars = ref<any[]>([])
const activeBrand = ref<string | null>(null)

onMounted(async () => {
  profile.value = await fetchProfile()
  cars.value = await fetchCars()
})

const brands = computed(() =>
  Array.from(new Set(cars.value.map(c => c.brand))).sort()
)

const filteredCars = computed(() => {
  let list = cars.value

  if (activeBrand.value) {
    list = list.filter(c => c.brand === activeBrand.value)
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

onMounted(async () => {
  profile.value = await fetchProfile()
  cars.value = await fetchCars()

  console.log("CARS FROM API", cars.value)
})
</script>

<template>
  <div>
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