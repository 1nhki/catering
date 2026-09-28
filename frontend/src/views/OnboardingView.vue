<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTrackerStore } from '../stores/tracker'
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-vue-next'

const router = useRouter()
const tracker = useTrackerStore()

const currentStep = ref(1)

// Step 1: User Profile
const gender = ref<'male' | 'female'>('male')
const age = ref<number>(26)
const height = ref<number>(175)
const weight = ref<number>(70)

// Step 2: Activity & Goal
const activityMultiplier = ref<number>(1.375) // Lightly active
const goal = ref<'fat_loss' | 'muscle_gain' | 'maintenance'>('fat_loss')

// Mifflin-St Jeor Calculation
const bmr = computed(() => {
  if (gender.value === 'male') {
    return 10 * weight.value + 6.25 * height.value - 5 * age.value + 5
  } else {
    return 10 * weight.value + 6.25 * height.value - 5 * age.value - 161
  }
})

const tdee = computed(() => {
  return Math.round(bmr.value * activityMultiplier.value)
})

const targetCalories = computed(() => {
  if (goal.value === 'fat_loss') return tdee.value - 500
  if (goal.value === 'muscle_gain') return tdee.value + 300
  return tdee.value
})

function finishOnboarding() {
  tracker.targetCalories = targetCalories.value
  router.push('/')
}
</script>

<template>
  <div class="max-w-xl mx-auto py-8">
    <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <!-- Progress Bar -->
      <div class="flex items-center justify-between mb-8">
        <div
          v-for="step in 3"
          :key="step"
          class="flex-1 flex items-center"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition"
            :class="{
              'bg-emerald-600 text-white': currentStep >= step,
              'bg-slate-100 text-slate-400': currentStep < step
            }"
          >
            {{ step }}
          </div>
          <div
            v-if="step < 3"
            class="flex-1 h-1 mx-2 rounded-full transition"
            :class="currentStep > step ? 'bg-emerald-600' : 'bg-slate-100'"
          ></div>
        </div>
      </div>

      <!-- Step 1: Body Metrics -->
      <div v-if="currentStep === 1" class="space-y-5">
        <h2 class="text-xl font-bold text-slate-800">1. Data Profil Tubuh</h2>
        <p class="text-xs text-slate-500">Digunakan untuk menghitung BMR dengan rumus medis Mifflin-St Jeor.</p>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="gender = 'male'"
            class="py-3 px-4 rounded-xl border text-sm font-semibold transition"
            :class="gender === 'male' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'"
          >
            👨 Laki-laki
          </button>
          <button
            type="button"
            @click="gender = 'female'"
            class="py-3 px-4 rounded-xl border text-sm font-semibold transition"
            :class="gender === 'female' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'"
          >
            👩 Perempuan
          </button>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Usia (Th)</label>
            <input
              v-model="age"
              type="number"
              class="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Tinggi (cm)</label>
            <input
              v-model="height"
              type="number"
              class="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Berat (kg)</label>
            <input
              v-model="weight"
              type="number"
              class="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Activity & Goal -->
      <div v-else-if="currentStep === 2" class="space-y-5">
        <h2 class="text-xl font-bold text-slate-800">2. Aktivitas & Target Diet</h2>
        <p class="text-xs text-slate-500">Tentukan intensitas fisik harian dan target nutrisi.</p>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-2">Tingkat Aktivitas Fisik</label>
          <select
            v-model="activityMultiplier"
            class="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option :value="1.2">Sedentary (Jarang / Tidak Olahraga)</option>
            <option :value="1.375">Light Activity (1-3 hari/minggu)</option>
            <option :value="1.55">Moderate Activity (3-5 hari/minggu)</option>
            <option :value="1.725">Very Active (6-7 hari/minggu)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-2">Target Nutrisi</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              @click="goal = 'fat_loss'"
              class="p-3 rounded-xl border text-center transition"
              :class="goal === 'fat_loss' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'"
            >
              <div class="text-xs font-bold">Fat Loss</div>
              <div class="text-[10px] text-slate-500 mt-1">-500 kcal</div>
            </button>
            <button
              type="button"
              @click="goal = 'maintenance'"
              class="p-3 rounded-xl border text-center transition"
              :class="goal === 'maintenance' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'"
            >
              <div class="text-xs font-bold">Maintain</div>
              <div class="text-[10px] text-slate-500 mt-1">0 kcal</div>
            </button>
            <button
              type="button"
              @click="goal = 'muscle_gain'"
              class="p-3 rounded-xl border text-center transition"
              :class="goal === 'muscle_gain' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'"
            >
              <div class="text-xs font-bold">Muscle Gain</div>
              <div class="text-[10px] text-slate-500 mt-1">+300 kcal</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Step 3: Calculation Review -->
      <div v-else class="space-y-6">
        <div class="text-center">
          <div class="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
            <Sparkles class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-bold text-slate-800">3. Rencana Kalori Terhitung</h2>
          <p class="text-xs text-slate-500">Dihitung otomatis berbasis formula medis terpercaya.</p>
        </div>

        <div class="bg-slate-50 p-5 rounded-2xl space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Basal Metabolic Rate (BMR):</span>
            <span class="font-bold text-slate-700">{{ Math.round(bmr) }} kcal</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Total Daily Energy Expenditure (TDEE):</span>
            <span class="font-bold text-slate-700">{{ tdee }} kcal</span>
          </div>
          <div class="pt-3 border-t border-slate-200 flex justify-between items-center text-emerald-700">
            <span class="font-semibold text-sm">Target Harian FitBento:</span>
            <span class="text-2xl font-black">{{ targetCalories }} kcal</span>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
        <button
          v-if="currentStep > 1"
          @click="currentStep--"
          type="button"
          class="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ChevronLeft class="w-4 h-4" /> Kembali
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < 3"
          @click="currentStep++"
          type="button"
          class="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
        >
          Lanjut <ChevronRight class="w-4 h-4" />
        </button>
        <button
          v-else
          @click="finishOnboarding"
          type="button"
          class="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-200 transition"
        >
          Mulai Tracking <Check class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
