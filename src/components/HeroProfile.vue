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
      <div class="profile-content">
        <img
          v-if="profile.hero_image"
          :src="profile.hero_image"
          class="hero-img"
          alt="Profile"
        />

        <div class="profile-info">
          <h1>{{ profile.name }}</h1>
          <h2 class="company">ABCars</h2>
          <p class="subtitle">{{ profile.subtitle }}</p>
          <p class="desc">{{ profile.description }}</p>
        </div>
      </div>

      <div class="contact-container">
        <!-- WhatsApp -->
        <a
          :href="profile.whatsapp"
          target="_blank"
          rel="noopener"
          class="btn whatsapp"
        >
          Contact via WhatsApp
        </a>

        <!-- Telegram -->
        <a
          v-if="profile.telegram"
          :href="profile.telegram"
          target="_blank"
          rel="noopener"
          class="btn telegram"
        >
          Contact via Telegram
        </a>

        <!-- Phone -->
        <a
          v-if="profile.phone"
          :href="`tel:${profile.phone}`"
          class="btn phone"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          {{ profile.phone }}
        </a>

        <!-- Waze -->
        <a
          href="https://waze.com/ul/hwyd64vy9m"
          target="_blank"
          rel="noopener"
          class="btn waze"
        >
          <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" style="margin-right: 8px;">
            <path d="M502.17 201.67C516.69 287.53 471.23 369.59 389 409.8c13 34.1-12.4 70.2-48.32 70.2a51.68 51.68 0 0 1-51.57-49c-6.44.19-64.2 0-76.33-.64A51.69 51.69 0 0 1 159 479.92c-33.86-1.36-57.95-34.84-47-67.92-37.21-13.11-72.54-34.87-99.62-70.8-13-17.28-.48-41.8 20.84-41.8 46.31 0 32.22-54.17 43.15-110.26C94.8 95.2 193.12 32 288.09 32c102.48 0 195.45 70.46 214.08 169.67zM373.51 388.28c42-19.18 81.33-56.71 96.29-102.14 40.48-123.09-64.15-228-181.71-228-83.45 0-170.32 55.42-186.07 136-9.53 48.91 5 131.35-68.75 131.35C58.21 358.6 91.6 378.11 127 389.54c24.66-21.8 63.87-15.47 79.83 14.34 14.22 1 79.19 1.18 87.9.82a51.69 51.69 0 0 1 78.78-16.42zM205.12 187.13c0-34.74 50.84-34.75 50.84 0s-50.84 34.74-50.84 0zm116.57 0c0-34.74 50.86-34.75 50.86 0s-50.86 34.75-50.86 0zm-122.62 70.69c-3.44-16.94 22.18-22.18 25.62-5.21l6.14 30.88c.95 4.54 6.2 4.54 7.15 0l6.14-30.88c3.44-16.94 29.09-11.73 25.62 5.21l-8.73 44.35c-4.7 23.88-39.34 22.11-41.85 0z"/>
          </svg>
          Navigate with Waze
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 32px 16px;
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
}

.profile-content {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 32px;
}

.hero-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex: 1;
  text-align: left;
}

.profile-info h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
}

.company {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #3b82f6;
}

.subtitle {
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 0.9);
}

.desc {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  opacity: 0.75;
  color: rgba(255, 255, 255, 0.8);
}

.contact-container {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.contact-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 12px;
  border-radius: 12px;
}

.contact-icon:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.phone-icon svg {
  stroke: currentColor;
}

.phone-number {
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
}

.waze-icon {
  color: #33ccff;
}

.waze-icon:hover {
  color: #00d4ff;
}

.cta {
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  width: 100%;
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

.btn.phone {
  background: #4b5563;
  font-size: 18px;
  padding: 14px 24px;
  font-weight: 700;
}

.btn.phone:hover {
  background: #374151;
}

.btn.waze {
  background: #33ccff;
}

.btn.waze:hover {
  background: #00d4ff;
}

@media (max-width: 768px) {
  .hero {
    padding: 20px 12px;
  }

  .profile-content {
    gap: 16px;
  }

  .hero-img {
    width: 80px;
    height: 80px;
  }

  .profile-info h1 {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .company {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 13px;
  }

  .contact-container {
    max-width: 100%;
  }

  .btn {
    min-width: 180px;
    font-size: 14px;
    padding: 10px 18px;
  }

  .btn.phone {
    font-size: 15px;
    padding: 12px 18px;
  }
}
</style>
