<script setup lang="ts">
import CarCard from "./CarCard.vue"

defineProps<{
  cars: any[]
}>()
</script>

<template>
  <section class="car-grid-wrapper">
    <div v-if="!cars || cars.length === 0" class="empty">
      No cars found
    </div>

    <section v-else class="car-grid">
      <CarCard
        v-for="car in cars"
        :key="car.id"
        :car="car"
      />
    </section>
  </section>
</template>

<style scoped>
.car-grid-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* Мобильные устройства - 2 колонки */
@media (max-width: 768px) {
  .car-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.empty {
  padding: 60px 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 18px;
}
</style>