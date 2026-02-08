<template>
  <article class="card" @click="openCar">
    <div class="image-wrap">
      <img
        v-if="car.cover_image"
        :src="car.cover_image"
        alt="Car photo"
        loading="lazy"
      />
      <div v-else class="no-photo">No photo</div>
    </div>

    <div class="info">
      <h3>{{ car.brand }}</h3>
      <p class="model">{{ car.model }}</p>

      <div class="meta">
        <span>{{ car.year }}</span>
        <strong>\${{ car.price_usd }}</strong>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const props = defineProps<{
  car: any
}>()

const router = useRouter()

function openCar() {
  router.push(`/car/${props.car.id}`)
}
</script>

<style scoped>
.card {
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  transition: transform .15s ease, box-shadow .15s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,.12);
}

/* картинка */
.image-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f3f3f3;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-photo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

/* инфо */
.info {
  padding: 14px;
}

.info h3 {
  margin: 0;
  font-size: 14px;
  color: #000000;
}

.model {
  margin: 4px 0 10px;
  font-weight: 600;
  color: #000;  /* черный для модели */
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000000;  /* светло-серый для года/цены */
}
</style>