<script setup lang="ts">
</script>

<template>
  <main class="flex-1 flex flex-col py-4 px-4 space-y-4 max-w-md mx-auto w-full">
    <!-- DATE & STATUS BAR (Directly below top bar as drawn in sketch) -->
    <div class="flex items-center justify-between gap-2 py-0.5">
      <!-- Date Selector Pill -->
      <div class="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full text-xs font-semibold text-on-surface shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-surface-container-highest/50">
        <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
        <span>Hari ini, 25 Okt</span>
        <span class="material-symbols-outlined text-[14px] text-on-surface-variant">expand_more</span>
      </div>
      <!-- Live Delivery Status Pill -->
      <div class="flex items-center gap-1.5 bg-secondary-container/90 text-on-secondary-container px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-secondary-fixed-dim/30">
        <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
        <span>Siap Dikirim • 11:45 WIB</span>
      </div>
    </div>
    
    <!-- WARM GREETING (Verbatim from the hand-drawn sketch) -->
    <div class="pt-1 pb-1">
      <div class="flex items-center gap-1.5">
        <h1 class="text-2xl font-bold text-on-surface tracking-tight">Hey Fikri.</h1>
        <span class="text-xl">👋</span>
      </div>
      <p class="text-xl font-bold text-primary mt-0.5 tracking-tight">sudah lapar ya?</p>
      <p class="text-xs text-on-surface-variant mt-1 font-medium">Menu bento katering spesialmu hari ini sudah siap diantar!</p>
    </div>
    
    <!-- HERO SECTION: "Menu Hari Ini" (Directly matching wireframe photo card layout) -->
    <section class="space-y-2">
      <!-- Section Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-on-surface tracking-tight">Menu hari ini</h2>
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface-container-highest text-secondary">
          Makan Siang (12:00 - 13:00)
        </span>
      </div>
      <!-- Bento Box Food Card with Prominent Photo -->
      <div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-highest">
        <!-- Hero Photo -->
        <div class="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
          <img alt="Salmon Teriyaki Bento Set" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgRhSvNkYR4F_IkYxcha5cUV-IZfKrBqvprXY-cLnuUwbPR8WB5yqjY4YBuAZUon2uadO0IGTzYA6GyulFY8nd3vGuwwH82UZN7b8496ZL7ok1WebOBd94p14s2Pq87KQEXuh8b5W7gSCdMiFNws3s2GalOX5B_rfYB9oU5Joc12hBd3jE0DF8WaPMpfxJDl230EiBNCZI4283Ht6jLRQRn8jCLSfrtg_V3o6cfViA2La_UFMODHrzrg"/>
          <div class="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-on-primary text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">restaurant</span>
            <span>Chef's Daily Special</span>
          </div>
          <div class="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm text-on-surface text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-surface-container-highest">
            Catering Box #084
          </div>
        </div>
        <!-- Meal Details -->
        <div class="p-3.5 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-base font-bold text-on-surface">Salmon Teriyaki Bento Set</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed mt-1">
                Nasi merah organik, salmon panggang saus teriyaki gurih, tamagoyaki lembut, edamame segar &amp; acar lobak Jepang.
              </p>
            </div>
          </div>
          <!-- Quality Badges -->
          <div class="pt-1 flex flex-wrap items-center gap-1.5">
            <span class="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container px-2 py-0.5 rounded-md text-on-surface">
              <span class="material-symbols-outlined text-[13px] text-primary" style="font-variation-settings: 'FILL' 1;">eco</span> Freshly Prepared
            </span>
            <span class="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container px-2 py-0.5 rounded-md text-on-surface">
              <span class="material-symbols-outlined text-[13px] text-primary">verified</span> Halal
            </span>
            <span class="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container px-2 py-0.5 rounded-md text-on-surface">
              <span class="material-symbols-outlined text-[13px] text-primary">spa</span> No Added MSG
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- NUTRIENT FACT SECTION (Directly matching sketch: "Nutrient fact" card with catering nutrition breakdown) -->
    <section class="space-y-2">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-on-surface tracking-tight">Nutrient Fact</h2>
        <span class="text-xs text-secondary font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">psychology_alt</span> Ichiju-Sansai Balanced
        </span>
      </div>
      <!-- Nutrition Card -->
      <div class="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-highest space-y-3">
        <!-- Primary Energy & Main Macros -->
        <div class="flex items-center justify-between pb-3 border-b border-surface-container">
          <div>
            <span class="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant block">Total Energi</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-2xl font-bold text-primary tracking-tight">680</span>
              <span class="text-xs font-semibold text-secondary">kcal / porsi</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-[11px] font-semibold text-secondary-container bg-primary-container px-2.5 py-1 rounded-full inline-block">
              Porsi Makan Siang Seimbang
            </span>
          </div>
        </div>
        <!-- 3 Macro Columns -->
        <div class="grid grid-cols-3 gap-2">
          <!-- Protein -->
          <div class="bg-surface-container-low rounded-xl p-2.5 text-center border border-surface-container-highest/60">
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Protein</span>
            <span class="text-lg font-bold text-primary block mt-0.5">42g</span>
            <span class="text-[10px] text-on-surface-variant font-medium">Salmon &amp; Telur</span>
          </div>
          <!-- Carbs -->
          <div class="bg-surface-container-low rounded-xl p-2.5 text-center border border-surface-container-highest/60">
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Karbohidrat</span>
            <span class="text-lg font-bold text-secondary block mt-0.5">68g</span>
            <span class="text-[10px] text-on-surface-variant font-medium">Nasi Merah</span>
          </div>
          <!-- Healthy Fats -->
          <div class="bg-surface-container-low rounded-xl p-2.5 text-center border border-surface-container-highest/60">
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Lemak Sehat</span>
            <span class="text-lg font-bold text-tertiary-container block mt-0.5">18g</span>
            <span class="text-[10px] text-on-surface-variant font-medium">Omega-3 Alami</span>
          </div>
        </div>
        <!-- Secondary Micronutrient Row -->
        <div class="pt-1 flex items-center justify-between text-xs text-on-surface-variant px-1 border-t border-surface-container/60">
          <div class="flex items-center gap-1">
            <span class="font-semibold text-on-surface">Serat Pangan:</span>
            <span>8g (Tinggi Serat)</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-semibold text-on-surface">Sodium:</span>
            <span>480mg (Rendah Garam)</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- LIVE DELIVERY TRACKING MINI-CARD -->
    <section class="bg-surface-container rounded-2xl p-3.5 shadow-sm border border-surface-container-highest flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
        <span class="material-symbols-outlined text-[22px]">local_shipping</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-wider text-primary">Pengantaran Kurir</span>
          <span class="text-[11px] font-semibold text-secondary">Estimasi 12:15 WIB</span>
        </div>
        <p class="text-xs font-semibold text-on-surface truncate mt-0.5">Driver sedang menuju ke lokasimu</p>
      </div>
      <button class="text-xs font-bold text-primary bg-surface hover:bg-surface-container-low px-2.5 py-1.5 rounded-lg border border-surface-container-highest flex items-center gap-0.5 transition-transform active:scale-95 flex-shrink-0 shadow-sm" type="button">
        <span>Lacak</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </button>
    </section>
  </main>
</template>
