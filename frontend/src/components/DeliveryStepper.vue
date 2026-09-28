<script setup lang="ts">
import { computed } from 'vue'
import type { DeliveryStatus } from '../types'
import { ChefHat, Bike, CheckCircle } from 'lucide-vue-next'

const props = defineProps<{
  status: DeliveryStatus
  proofImage?: string | null
}>()

const steps = [
  { key: 'diproses_dapur', label: 'Diproses Dapur', icon: ChefHat },
  { key: 'dalam_pengantaran', label: 'Dalam Pengantaran', icon: Bike },
  { key: 'tiba', label: 'Tiba di Lokasi', icon: CheckCircle }
]

const currentStepIndex = computed(() => {
  switch (props.status) {
    case 'diproses_dapur': return 0
    case 'dalam_pengantaran': return 1
    case 'tiba': return 2
    default: return 0
  }
})
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="font-bold text-slate-800 text-base">Live Delivery Status</h3>
        <p class="text-xs text-slate-500 mt-0.5">Real-time status tracking for today's meal</p>
      </div>
      <span
        class="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
        :class="{
          'bg-amber-100 text-amber-700': status === 'diproses_dapur',
          'bg-blue-100 text-blue-700': status === 'dalam_pengantaran',
          'bg-emerald-100 text-emerald-700': status === 'tiba'
        }"
      >
        {{ steps[currentStepIndex].label }}
      </span>
    </div>

    <!-- Stepper Tracker -->
    <div class="relative flex items-center justify-between mb-6">
      <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 w-full z-0"></div>
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-500 z-0"
        :style="{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }"
      ></div>

      <div
        v-for="(step, idx) in steps"
        :key="step.key"
        class="relative z-10 flex flex-col items-center"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300"
          :class="{
            'bg-emerald-500 text-white shadow-md shadow-emerald-200 ring-4 ring-emerald-50': idx <= currentStepIndex,
            'bg-slate-100 text-slate-400 border border-slate-200': idx > currentStepIndex
          }"
        >
          <component :is="step.icon" class="w-5 h-5" />
        </div>
        <span
          class="text-[11px] font-medium mt-2 text-center"
          :class="idx <= currentStepIndex ? 'text-slate-800 font-semibold' : 'text-slate-400'"
        >
          {{ step.label }}
        </span>
      </div>
    </div>

    <!-- Photo proof if status === tiba -->
    <div v-if="status === 'tiba' && proofImage" class="mt-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
      <div class="text-xs font-semibold text-emerald-800 mb-2">📸 Foto Bukti Pengantaran:</div>
      <img
        :src="proofImage"
        alt="Delivery Proof"
        class="w-full h-44 object-cover rounded-lg shadow-inner"
      />
    </div>
  </div>
</template>
