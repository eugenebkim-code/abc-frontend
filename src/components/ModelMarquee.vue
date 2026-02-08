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
  gap: 10px;
  overflow-x: auto;
  padding: 12px 16px;
  scrollbar-width: none;
}
.marquee::-webkit-scrollbar {
  display: none;
}
.chip {
  white-space: nowrap;
  padding: 8px 14px;
  border-radius: 999px;
  background: #2a2a2a;
  color: #ddd;
  border: none;
  cursor: pointer;
}
.chip.active {
  background: #22c55e;
  color: #111;
}
</style>
