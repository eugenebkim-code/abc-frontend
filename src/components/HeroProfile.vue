<script setup lang="ts">
defineProps<{
  profile: {
    name: string;
    title: string;
    subtitle: string;
    description: string;
    whatsapp: string;
    phone: string;
    hero_image_url: string;
  };
}>();
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <img
        v-if="profile.hero_image || profile.hero_image_url"
        :src="profile.hero_image || profile.hero_image_url"
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
          class="btn primary"
        >
          Contact via WhatsApp
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
}

.btn.primary {
  background: #25d366;
  color: #fff;
  padding: 12px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}
</style>
