<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  progress: number
  message?: string
  minDisplayTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  message: 'Loading...',
  minDisplayTime: 500
})

const progressPercent = computed(() => {
  return Math.min(Math.max(props.progress, 0), 100)
})
</script>

<template>
  <Transition name="fade">
    <div class="loading-overlay">
      <div class="loading-container">
        <!-- Заголовок -->
        <h2 class="loading-title">{{ message }}</h2>

        <!-- Progress bar wrapper -->
        <div class="progress-wrapper">
          <div
            class="progress-fill"
            :style="{ width: `${progressPercent}%` }"
            role="progressbar"
            :aria-valuenow="progressPercent"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <!-- Animated shine effect -->
            <div class="progress-shine"></div>
          </div>
        </div>

        <!-- Percentage display -->
        <div class="percentage-display">
          {{ Math.round(progressPercent) }}%
        </div>

        <!-- Loading dots animation -->
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1d24 0%, #22262c 100%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

/* Container */
.loading-container {
  width: 90%;
  max-width: 600px;
  text-align: center;
  padding: 40px;
}

/* Title */
.loading-title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 30px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(74, 222, 128, 0.3);
}

/* Progress wrapper */
.progress-wrapper {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  overflow: hidden;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Progress fill */
.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #4ade80 0%,
    #22c55e 50%,
    #4ade80 100%
  );
  background-size: 200% 100%;
  border-radius: 100px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 0 20px rgba(74, 222, 128, 0.6),
    0 0 40px rgba(74, 222, 128, 0.3);
  position: relative;
  animation: shimmer 2s infinite;
}

/* Shine effect on progress bar */
.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shine 2s infinite;
}

/* Percentage display */
.percentage-display {
  margin-top: 20px;
  font-size: 48px;
  font-weight: 700;
  color: #4ade80;
  text-shadow:
    0 0 10px rgba(74, 222, 128, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.3);
  font-variant-numeric: tabular-nums;
  letter-spacing: -2px;
}

/* Loading dots */
.loading-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 30px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

/* Animations */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .loading-container {
    width: 80%;
    padding: 30px 20px;
  }

  .loading-title {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .percentage-display {
    font-size: 36px;
    margin-top: 16px;
  }

  .progress-wrapper {
    height: 10px;
  }

  .loading-dots {
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .loading-container {
    width: 85%;
  }

  .loading-title {
    font-size: 18px;
  }

  .percentage-display {
    font-size: 32px;
  }

  .progress-wrapper {
    height: 8px;
  }
}
</style>
