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
  padding: 0 16px;
  background: #1e293b;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 24px;
}

/* Мобильные устройства - 2 колонки */
@media (max-width: 768px) {
  .car-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 16px;
  }
}

.empty {
  padding: 60px 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 18px;
}
</style>