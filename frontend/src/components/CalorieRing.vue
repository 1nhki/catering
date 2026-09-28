<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  consumed: number
  target: number
}>()

const radius = 70
const strokeWidth = 14
const circumference = 2 * Math.PI * radius

const progress = computed(() => {
  if (props.target <= 0) return 0
  return Math.min(props.consumed / props.target, 1)
})

const strokeDashoffset = computed(() => {
  return circumference - progress.value * circumference
})

const percentage = computed(() => {
  if (props.target <= 0) return 0
  return Math.round((props.consumed / props.target) * 100)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
    <div class="relative flex items-center justify-center">
      <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
        <!-- Background Track -->
        <circle
          cx="80"
          cy="80"
          :r="radius"
          class="stroke-slate-100"
          :stroke-width="strokeWidth"
          fill="transparent"
        />
        <!-- Progress Bar -->
        <circle
          cx="80"
          cy="80"
          :r="radius"
          class="stroke-emerald-500 transition-all duration-700 ease-out"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          fill="transparent"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      <div class="absolute flex flex-col items-center justify-center text-center">
        <span class="text-3xl font-extrabold text-slate-800 tracking-tight">{{ consumed }}</span>
        <span class="text-xs font-medium text-slate-400">/ {{ target }} kcal</span>
        <span class="mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
          {{ percentage }}%
        </span>
      </div>
    </div>
    <div class="mt-4 text-center">
      <h3 class="font-semibold text-slate-700 text-sm">Daily Calorie Target</h3>
      <p class="text-xs text-slate-400 mt-0.5">
        {{ Math.max(0, target - consumed) }} kcal remaining today
      </p>
    </div>
  </div>
</template>
