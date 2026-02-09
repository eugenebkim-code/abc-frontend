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
    <div class="hero-card">
      <!-- Header Section with Profile -->
      <div class="card-header">
        <div class="profile-layout">
          <!-- Profile Info - Left Side (2/3) -->
          <div class="profile-info">
            <h1>{{ profile.name }}</h1>
            <div class="badge-container">
              <span class="business-badge">ABCars</span>
            </div>
            <p class="subtitle">{{ profile.subtitle }}</p>
            <p class="description">{{ profile.description }}</p>
          </div>

          <!-- Profile Image - Right Side (1/3) -->
          <div class="profile-image-container">
            <div class="image-wrapper">
              <img
                v-if="profile.hero_image"
                :src="profile.hero_image"
                :alt="profile.name"
                class="profile-image"
              />
              <div v-else class="image-placeholder">
                {{ profile.name.charAt(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="separator"></div>

      <!-- Contact Actions -->
      <div class="contact-actions">
        <a
          :href="profile.whatsapp"
          target="_blank"
          rel="noopener"
          class="btn btn-whatsapp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Contact via WhatsApp</span>
        </a>

        <a
          v-if="profile.telegram"
          :href="profile.telegram"
          target="_blank"
          rel="noopener"
          class="btn btn-telegram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span>Contact via Telegram</span>
        </a>

        <a
          href="tel:+821079069045"
          class="btn btn-phone"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>tel.: +821079069045</span>
        </a>

        <a
          href="https://waze.com/ul/hwyd64vy9m"
          target="_blank"
          rel="noopener"
          class="btn btn-waze"
        >
          <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
            <path d="M502.17 201.67C516.69 287.53 471.23 369.59 389 409.8c13 34.1-12.4 70.2-48.32 70.2a51.68 51.68 0 0 1-51.57-49c-6.44.19-64.2 0-76.33-.64A51.69 51.69 0 0 1 159 479.92c-33.86-1.36-57.95-34.84-47-67.92-37.21-13.11-72.54-34.87-99.62-70.8-13-17.28-.48-41.8 20.84-41.8 46.31 0 32.22-54.17 43.15-110.26C94.8 95.2 193.12 32 288.09 32c102.48 0 195.45 70.46 214.08 169.67zM373.51 388.28c42-19.18 81.33-56.71 96.29-102.14 40.48-123.09-64.15-228-181.71-228-83.45 0-170.32 55.42-186.07 136-9.53 48.91 5 131.35-68.75 131.35C58.21 358.6 91.6 378.11 127 389.54c24.66-21.8 63.87-15.47 79.83 14.34 14.22 1 79.19 1.18 87.9.82a51.69 51.69 0 0 1 78.78-16.42zM205.12 187.13c0-34.74 50.84-34.75 50.84 0s-50.84 34.74-50.84 0zm116.57 0c0-34.74 50.86-34.75 50.86 0s-50.86 34.75-50.86 0zm-122.62 70.69c-3.44-16.94 22.18-22.18 25.62-5.21l6.14 30.88c.95 4.54 6.2 4.54 7.15 0l6.14-30.88c3.44-16.94 29.09-11.73 25.62 5.21l-8.73 44.35c-4.7 23.88-39.34 22.11-41.85 0z"/>
          </svg>
          <span>Navigate with Waze</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 32px 16px;
}

.hero-card {
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  background: #1e293b;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.card-header {
  padding: 32px;
  padding-bottom: 24px;
}

.profile-layout {
  display: flex;
  gap: 24px;
}

.profile-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile-info h1 {
  font-size: 28px;
  font-weight: 400;
  margin: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge-container {
  display: flex;
  gap: 8px;
}

.business-badge {
  display: inline-block;
  padding: 6px 16px;
  background: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.subtitle {
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  color: #cbd5e1;
  line-height: 1.5;
}

.description {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  color: #94a3b8;
}

.profile-image-container {
  flex: 1;
  position: relative;
}

.image-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 4px solid #334155;
  background: #475569;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #ffffff;
  font-weight: 700;
}

.separator {
  height: 1px;
  background: #334155;
  margin: 0 32px;
}

.contact-actions {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  transition: all 0.2s ease;
  width: 100%;
}

.btn svg {
  flex-shrink: 0;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-whatsapp {
  background: #22c55e;
}

.btn-whatsapp:hover {
  background: #16a34a;
}

.btn-telegram {
  background: #3b82f6;
}

.btn-telegram:hover {
  background: #2563eb;
}

.btn-phone {
  background: #475569;
  border: 1px solid #64748b;
}

.btn-phone:hover {
  background: #334155;
}

.btn-waze {
  background: #38bdf8;
}

.btn-waze:hover {
  background: #0ea5e9;
}

@media (max-width: 768px) {
  .hero {
    padding: 16px;
  }

  .card-header {
    padding: 20px 16px;
  }

  .profile-layout {
    gap: 16px;
  }

  .profile-info {
    flex: 2;
  }

  .profile-info h1 {
    font-size: 18px;
  }

  .business-badge {
    font-size: 12px;
    padding: 4px 12px;
  }

  .subtitle {
    font-size: 13px;
  }

  .description {
    font-size: 13px;
  }

  .profile-image-container {
    flex: 1;
  }

  .image-wrapper {
    min-height: 140px;
  }

  .separator {
    margin: 0 20px;
  }

  .contact-actions {
    padding: 20px;
    gap: 10px;
  }

  .btn {
    padding: 12px 20px;
    font-size: 15px;
  }
}
</style>
