<template>
  <section class="car-grid">
    <CarCard
      v-for="car in cars"
      :key="car.id"
      :car="car"
    />
  </section>
</template>

<script setup lang="ts">
import CarCard from "./CarCard.vue"

defineProps<{
  cars: any[]
}>()
</script>

<style scoped>
.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 24px;
}
</style>