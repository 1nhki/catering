<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <!-- TOP APP BAR -->
  <header class="z-50 bg-background/90 backdrop-blur-md pt-safe border-b border-surface-container-highest/60 flex-shrink-0">
    <div class="h-14 px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
          <img alt="Fit Bento Icon" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UuGuVSjeyiRUzSGqjVtv4ZF32RDZQ9RfpZshc24w-g4TD1cwGiiok5ma1VxBBPwzaEYMAPXCgAuQzN9sI5ZZdJuBt3a4KggUTUf2y4VBDGfTQhPPsl1PfxUs7lpbnJSUvKyCK9lV32f8usROh_pDENVy6yd6CuOAiHeQFnMe5NPcZibcp4ZHYKtmvwaApjuUJ1shRlRSKJNwhzKIpCUJZf0OGgfcTH2ttQvVco4ZJVjxcwzLZmoBjoNHTX"/>
        </div>
        <span class="text-xl font-bold tracking-tight text-primary">SEHATIN!</span>
      </div>
      <div class="flex items-center gap-2.5">
        <span class="text-sm font-semibold text-on-surface">Fikri</span>
        <div class="w-8 h-8 rounded-full ring-2 ring-primary/20 overflow-hidden shadow-sm flex-shrink-0">
          <img alt="Fikri Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XVWsxrJkdIFpRI7VP2-s1s_K9WDZdrbfdvvTRsoOIm2IdI6ZmsJDxErHX8At-B2g1w-7xLVNOdGtH3mSN26M1xU_6cBK895vJlvwm8d-H4WXl6gn61S8BbitgpHx8DoE7nfqDwiepmVipWr6p0FNBZhAf-7fy8gxL7Ff6_a_T3-9RnGvR5WOzgdn-946GTuVimdxyzYpJt8gN2s-6x_aplC-VhUklBKiUJd76--DlaZN3f8j9J4Wzb1RXQ"/>
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN SCROLLABLE CONTENT -->
  <div class="flex-1 overflow-y-auto w-full relative">
    <RouterView />
  </div>

  <!-- BOTTOM NAVIGATION BAR -->
  <nav class="z-50 pb-safe bg-background/95 backdrop-blur-xl border-t border-surface-container-highest shadow-sm flex-shrink-0">
    <div class="flex justify-around items-center h-16 max-w-md mx-auto px-4">
      <RouterLink to="/delivery" custom v-slot="{ navigate, href, isActive }">
        <a :href="href" @click="navigate" class="flex flex-col items-center justify-center min-w-[70px] py-1 transition-colors" :class="isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'">
          <div class="relative p-1 rounded-xl" :class="isActive ? 'bg-secondary-container text-primary' : ''">
            <span class="material-symbols-outlined text-[24px]" :style="isActive ? 'font-variation-settings: \'FILL\' 1;' : ''">local_shipping</span>
            <span v-if="isActive" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <span class="text-[11px] font-semibold tracking-wide mt-1">Delivery</span>
        </a>
      </RouterLink>
      
      <RouterLink to="/" custom v-slot="{ navigate, href, isActive }">
        <a :href="href" @click="navigate" class="flex flex-col items-center justify-center min-w-[70px] py-1 transition-colors" :class="isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'">
          <div class="relative p-1 rounded-xl" :class="isActive ? 'bg-secondary-container text-primary' : ''">
            <span class="material-symbols-outlined text-[24px]" :style="isActive ? 'font-variation-settings: \'FILL\' 1;' : ''">grid_view</span>
            <span v-if="isActive" class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary"></span>
          </div>
          <span class="text-[11px] font-semibold tracking-wide mt-1">Dashboard</span>
        </a>
      </RouterLink>

      <RouterLink to="/menu" custom v-slot="{ navigate, href, isActive }">
        <a :href="href" @click="navigate" class="flex flex-col items-center justify-center min-w-[70px] py-1 transition-colors" :class="isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'">
          <div class="relative p-1 rounded-xl" :class="isActive ? 'bg-secondary-container text-primary' : ''">
            <span class="material-symbols-outlined text-[24px]" :style="isActive ? 'font-variation-settings: \'FILL\' 1;' : ''">restaurant_menu</span>
          </div>
          <span class="text-[11px] font-semibold tracking-wide mt-1">Menu</span>
        </a>
      </RouterLink>
    </div>
  </nav>
</template>
