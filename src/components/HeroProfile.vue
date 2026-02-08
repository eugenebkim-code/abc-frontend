<script setup lang="ts">
defineProps<{
  profile: {
    name: string
    title: string
    subtitle: string
    description: string
    whatsapp: string
    telegram?: string
    phone: string
    hero_image?: string
  }
}>()
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <img
        v-if="profile.hero_image"
        :src="profile.hero_image"
        class="hero-img"
        alt="Profile"
      />

      <h1>{{ profile.name }}</h1>
      <h2>{{ profile.title }}</h2>
      <p class="subtitle">{{ profile.subtitle }}</p>
      <p class="desc">{{ profile.description }}</p>

      <div class="cta">
        <a
          :href="profile.whatsapp"
          target="_blank"
          rel="noopener"
          class="btn whatsapp"
        >
          Contact via WhatsApp
        </a>

        <a
          v-if="profile.telegram"
          :href="profile.telegram"
          target="_blank"
          rel="noopener"
          class="btn telegram"
        >
          Contact via Telegram
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 32px 16px;
  text-align: center;
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
}

.hero-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.subtitle {
  font-weight: 500;
  margin-top: 8px;
}

.desc {
  margin-top: 12px;
  opacity: 0.85;
}

.cta {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.btn {
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: inline-block;
  min-width: 220px;
  text-align: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn.whatsapp {
  background: #25d366;
}

.btn.whatsapp:hover {
  background: #20ba5a;
}

.btn.telegram {
  background: #0088cc;
}

.btn.telegram:hover {
  background: #0077b5;
}
</style>
