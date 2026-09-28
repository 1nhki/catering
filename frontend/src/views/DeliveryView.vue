<script setup lang="ts">
</script>

<template>
  <main class="flex flex-col py-4 px-4 gap-4 max-w-md mx-auto w-full">
    <!-- Section Title -->
    <div class="flex items-center justify-between px-1">
      <div>
        <span class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status Pengantaran</span>
        <h2 class="text-2xl font-extrabold text-on-surface tracking-tight flex items-center gap-2">
          Pesanan Siangmu
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container text-on-secondary-container">
            On The Way
          </span>
        </h2>
      </div>
      <!-- Refresh Indicator -->
      <button aria-label="Refresh status" class="w-8 h-8 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface-variant active:scale-95 transition-transform" title="Refresh status">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>

    <!-- GPS Map Tracking Section -->
    <section aria-label="Peta Pelacakan Pengantaran" class="bg-surface-container-lowest rounded-3xl border border-surface-container overflow-hidden shadow-sm flex flex-col relative">
      <!-- Live GPS Map View Container -->
      <div class="h-64 sm:h-72 w-full relative overflow-hidden map-grid-pattern flex items-center justify-center">
        <!-- Expand/Recenter Map Button -->
        <button aria-label="Perbesar Peta" class="absolute top-3 right-3 z-20 bg-surface-container-lowest/95 backdrop-blur-sm p-2 rounded-xl border border-surface-container shadow-sm text-on-surface-variant hover:text-primary active:scale-95 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>

        <!-- SVG Simulated Route Trajectory -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2D5A27" stop-opacity="0.4" />
              <stop offset="60%" stop-color="#2D5A27" stop-opacity="1" />
              <stop offset="100%" stop-color="#4E8746" stop-opacity="0.8" />
            </linearGradient>
          </defs>
          <!-- Map decorative road lines -->
          <path d="M -20 180 Q 90 140 180 160 T 380 120 T 450 140" fill="none" stroke="#EFE6D8" stroke-linecap="round" stroke-width="8"></path>
          <path d="M 60 -10 Q 100 90 120 190 T 160 300" fill="none" stroke="#EFE6D8" stroke-linecap="round" stroke-width="7"></path>
          <path d="M 180 20 Q 220 110 320 170 T 420 280" fill="none" stroke="#E2D7C3" stroke-linecap="round" stroke-width="6"></path>
          
          <!-- Active GPS Delivery Path -->
          <path d="M 55 55 Q 90 90 110 135 T 200 160 T 260 145 T 310 195" fill="none" stroke="url(#routeGradient)" stroke-dasharray="6,4" stroke-linecap="round" stroke-width="4.5"></path>
        </svg>

        <!-- Point A: Fit Bento Cloud Kitchen Origin -->
        <div class="absolute top-10 left-10 flex flex-col items-center">
          <div class="px-2 py-0.5 rounded-md bg-surface-container-lowest text-[10px] font-bold text-on-surface-variant shadow-sm border border-surface-container-highest mb-1">
            Dapur Bento
          </div>
          <div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] shadow-sm border-2 border-surface-container-lowest">
            🍱
          </div>
        </div>

        <!-- Courier in Transit Icon (On the route line) -->
        <div class="absolute top-[138px] left-[188px] transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <!-- Pulsing Radar Glow -->
          <div class="absolute -inset-2 rounded-full bg-primary/30 pulse-animation"></div>
          <!-- Courier Badge -->
          <div class="relative w-9 h-9 rounded-full bg-primary text-on-primary shadow-sm flex items-center justify-center border-2 border-surface-container-lowest ring-2 ring-primary/40">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">local_shipping</span>
          </div>
          <span class="bg-inverse-surface/90 text-inverse-on-surface font-bold text-[9px] px-1.5 py-0.5 rounded mt-1 shadow backdrop-blur-sm whitespace-nowrap">
            Kurir (800m)
          </span>
        </div>

        <!-- Point B: Destination (Fikri's Office) -->
        <div class="absolute bottom-10 right-14 flex flex-col items-center z-10">
          <div class="relative w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-sm border-2 border-surface-container-lowest">
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">home</span>
          </div>
          <div class="px-2 py-0.5 rounded-md bg-surface-container-lowest text-[10px] font-bold text-on-surface shadow-sm border border-surface-container-highest mt-1 whitespace-nowrap">
            Kantor Fikri (Lt. 8)
          </div>
        </div>

        <!-- Compass watermarked badge -->
        <div class="absolute bottom-2 left-3 bg-surface-container-lowest/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-on-surface-variant flex items-center gap-1 border border-surface-container-highest/60">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          GPS Aktif • Jakarta Selatan
        </div>
      </div>

      <!-- Bottom Summary boxes: "estimasi waktu" & "status" -->
      <div class="p-3.5 bg-surface-container-lowest border-t border-surface-container grid grid-cols-2 gap-2.5">
        <!-- Estimasi Waktu Box -->
        <div class="bg-surface-container-low p-2.5 rounded-2xl border border-surface-container-highest flex flex-col justify-between">
          <span class="text-[11px] font-semibold text-on-surface-variant uppercase tracking-tight">Estimasi Waktu</span>
          <div class="mt-1">
            <span class="text-base font-extrabold text-on-surface leading-tight">12:15 WIB</span>
            <p class="text-[11px] font-bold text-primary mt-0.5 flex items-center gap-1">
              <span class="material-symbols-outlined text-[12px]">schedule</span>
              ~12 menit lagi
            </p>
          </div>
        </div>
        <!-- Status Box -->
        <div class="bg-secondary-container/50 p-2.5 rounded-2xl border border-secondary-container flex flex-col justify-between">
          <span class="text-[11px] font-semibold text-primary uppercase tracking-tight">Status</span>
          <div class="mt-1">
            <span class="text-sm font-extrabold text-primary leading-tight flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              Diantar Kurir
            </span>
            <p class="text-[11px] font-medium text-primary/80 mt-0.5">Menuju lobi kantor</p>
          </div>
        </div>
      </div>

      <!-- Courier Contact Card (Sub-section) -->
      <div class="px-4 py-2.5 bg-surface-container border-t border-surface-container-highest flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs ring-2 ring-surface-container-lowest shadow-sm">
            BP
          </div>
          <div>
            <p class="text-xs font-extrabold text-on-surface leading-none">Pak Budi Prasetyo</p>
            <div class="flex items-center gap-1 text-[11px] text-on-surface-variant mt-1">
              <span>Honda Beat • B 4821 SG</span>
              <span class="text-tertiary-container font-semibold flex items-center">★ 4.9</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <a aria-label="Telepon Kurir" href="tel:08123456789" class="w-8 h-8 rounded-full bg-surface-container-lowest border border-surface-container-highest flex items-center justify-center text-primary shadow-sm active:bg-secondary-container transition-colors" title="Hubungi Kurir">
            <span class="material-symbols-outlined text-[16px]">call</span>
          </a>
          <button aria-label="Chat Kurir" class="w-8 h-8 rounded-full bg-surface-container-lowest border border-surface-container-highest flex items-center justify-center text-primary shadow-sm active:bg-secondary-container transition-colors" title="Kirim Pesan">
            <span class="material-symbols-outlined text-[16px]">chat</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Delivery Details and Proof Section -->
    <section aria-label="Rincian Pengiriman dan Bukti" class="bg-surface-container-lowest rounded-3xl p-4 border border-surface-container shadow-sm space-y-3.5">
      <!-- Header Row: Delivery ID -->
      <div class="flex items-center justify-between pb-3 border-b border-surface-container">
        <div>
          <span class="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">Delivery ID</span>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="font-mono text-sm font-extrabold text-on-surface">#FB-20231025-084</span>
            <button aria-label="Salin Delivery ID" class="text-on-surface-variant hover:text-primary text-xs p-1" title="Salin ID">
              <span class="material-symbols-outlined text-[14px]">content_copy</span>
            </button>
          </div>
        </div>
        <!-- Menu Bento Pill Tag -->
        <div class="text-right">
          <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-surface-container text-on-surface border border-surface-container-highest">
            Catering Box #084
          </span>
        </div>
      </div>

      <!-- Bukti Drop-Off -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
            <h3 class="text-xs font-bold text-on-surface tracking-tight">Foto Bukti Dikirim!</h3>
          </div>
          <span class="text-[10px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
            Live Feed Kurir
          </span>
        </div>

        <!-- "foto" container -->
        <div class="relative w-full h-44 rounded-2xl bg-surface-container border-2 border-dashed border-surface-container-highest overflow-hidden flex flex-col items-center justify-center group">
          <div class="w-full h-full bg-gradient-to-tr from-surface-container to-surface-container-low flex flex-col items-center justify-center p-4 text-center">
            <!-- Bento Package Graphic Placeholder -->
            <div class="w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-highest flex flex-col items-center justify-center mb-2 relative">
              <span class="text-2xl">🍱</span>
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-tertiary-container"></span>
              </span>
            </div>
            <p class="text-xs font-bold text-on-surface">Foto Siap Unggah Saat Tiba</p>
            <p class="text-[11px] text-on-surface-variant max-w-xs mt-0.5">
              Kurir akan mengambil foto paket bento di meja resepsionis lantai 8 sebagai tanda terima.
            </p>
            <!-- Upload simulator button -->
            <span class="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-lowest text-primary shadow-sm border border-surface-container-highest">
              <span class="material-symbols-outlined text-[14px]">arrow_downward</span>
              Instruksi: Titip di Satpam Lobi jika rapat
            </span>
          </div>
          <!-- Timestamp tag -->
          <div class="absolute bottom-2.5 left-3 bg-inverse-surface/75 backdrop-blur-sm text-inverse-on-surface px-2 py-0.5 rounded-md text-[10px] font-mono">
            25 Okt 2023 • Sesi Siang
          </div>
        </div>
      </div>

      <!-- Bento Menu Details Summary -->
      <div class="bg-surface-container-low rounded-xl p-3 border border-surface-container-highest flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-lg bg-secondary-container/50 border border-secondary-container flex items-center justify-center text-lg">
            🥗
          </div>
          <div>
            <p class="text-xs font-bold text-on-surface">Salmon Teriyaki Bento Set</p>
            <p class="text-[11px] text-on-surface-variant">Porsi Seimbang • 680 kcal • Halal</p>
          </div>
        </div>
        <span class="text-xs font-extrabold text-primary bg-secondary-container px-2 py-1 rounded-lg">1 Box</span>
      </div>

      <!-- Destination Address Detail -->
      <div class="flex items-start gap-2.5 pt-1 text-xs text-on-surface-variant">
        <span class="material-symbols-outlined text-[16px] text-on-surface-variant mt-0.5 flex-shrink-0">location_on</span>
        <div class="leading-relaxed">
          <span class="font-bold text-on-surface">Tujuan Pengantaran:</span>
          <p class="text-on-surface-variant mt-0.5">Tech Tower Lt. 8, Unit 802 (Divisi Tech) • Jl. Jendral Sudirman No. 45, Jakarta Selatan</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 0.2; }
  100% { transform: scale(0.95); opacity: 0.8; }
}
.pulse-animation {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.map-grid-pattern {
  background-color: #F5EFE6;
  background-image: 
    radial-gradient(#E2D7C3 0.75px, transparent 0.75px),
    linear-gradient(to right, rgba(226, 215, 195, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(226, 215, 195, 0.3) 1px, transparent 1px);
  background-size: 16px 16px, 48px 48px, 48px 48px;
}
</style>
