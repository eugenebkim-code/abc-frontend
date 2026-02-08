<script setup lang="ts">
defineProps<{
  brands: string[]
  activeBrand: string | null
  priceFilter: "low" | "mid" | "high" | null
}>()

const emit = defineEmits<{
  (e: "select", brand: string | null): void
  (e: "price", price: "low" | "mid" | "high" | null): void
}>()
</script>

<template>
  <div class="marquee">
    <button
      class="chip"
      :class="{ active: activeBrand === null }"
      @click="emit('select', null)"
    >
      All
    </button>

    <button
      v-for="b in brands"
      :key="b"
      class="chip"
      :class="{ active: activeBrand === b }"
      @click="emit('select', b)"
    >
      {{ b }}
    </button>
  </div>

  <div class="price-filters">
    <button
      class="chip"
      :class="{ active: priceFilter === null }"
      @click="emit('price', null)"
    >
      Any price
    </button>

    <button
      class="chip"
      :class="{ active: priceFilter === 'low' }"
      @click="emit('price', 'low')"
    >
      Under $3k
    </button>

    <button
      class="chip"
      :class="{ active: priceFilter === 'mid' }"
      @click="emit('price', 'mid')"
    >
      $3k–$6k
    </button>

    <button
      class="chip"
      :class="{ active: priceFilter === 'high' }"
      @click="emit('price', 'high')"
    >
      $6k+
    </button>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 16px 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  position: relative;
  /* Gradient fade на краях */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 40px,
    black calc(100% - 40px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 40px,
    black calc(100% - 40px),
    transparent
  );
}

.marquee::-webkit-scrollbar {
  height: 6px;
}

.marquee::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.marquee::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  transition: background 0.2s;
}

.marquee::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chip {
  white-space: nowrap;
  padding: 12px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.chip:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.chip.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.price-filters {
  display: flex;
  gap: 12px;
  padding: 0 20px 16px;
  flex-wrap: wrap;
}
</style>
