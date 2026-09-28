<script setup lang="ts">
import type { MenuItem } from '../types'

defineProps<{
  item: MenuItem
}>()

const emit = defineEmits<{
  (e: 'swap', id: string): void
}>()
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition">
    <div class="h-44 relative overflow-hidden bg-slate-100">
      <img
        v-if="item.imageUrl"
        :src="item.imageUrl"
        :alt="item.name"
        class="w-full h-full object-cover hover:scale-105 transition duration-500"
      />
      <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700">
        {{ item.category }}
      </div>
      <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white px-2.5 py-1 rounded-full text-xs font-bold">
        {{ item.calories }} kcal
      </div>
    </div>

    <div class="p-4">
      <h4 class="font-bold text-slate-800 text-sm mb-2 line-clamp-1">{{ item.name }}</h4>

      <!-- Macro Badges -->
      <div class="grid grid-cols-3 gap-1.5 mb-4 text-center">
        <div class="bg-rose-50 border border-rose-100 rounded-lg py-1 px-1.5">
          <span class="block text-[10px] text-rose-500 font-semibold">Protein</span>
          <span class="text-xs font-bold text-rose-700">{{ item.protein }}g</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg py-1 px-1.5">
          <span class="block text-[10px] text-amber-500 font-semibold">Karbo</span>
          <span class="text-xs font-bold text-amber-700">{{ item.carbs }}g</span>
        </div>
        <div class="bg-blue-50 border border-blue-100 rounded-lg py-1 px-1.5">
          <span class="block text-[10px] text-blue-500 font-semibold">Lemak</span>
          <span class="text-xs font-bold text-blue-700">{{ item.fat }}g</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-slate-50">
        <span class="text-xs text-slate-400">Cut-off: 18:00 WIB</span>
        <button
          @click="emit('swap', item.id)"
          class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition"
        >
          Swap Menu
        </button>
      </div>
    </div>
  </div>
</template>
