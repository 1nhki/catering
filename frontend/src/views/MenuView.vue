<script setup lang="ts">
import { ref } from 'vue'

const isPaused = ref(false)
const isToastVisible = ref(false)
const toastMessage = ref('')
let toastTimeout: ReturnType<typeof setTimeout> | undefined

const tomorrowMenu = ref({
  title: 'Tori Yakitori Bento Box',
  desc: 'Dada ayam panggang yakitori gurih daun bawang, brokoli kukus, edamame & nasi furikake.',
  cal: '620 kkal',
  pro: '48g',
  carb: '58g',
  fat: '14g',
  imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhgNGAUjz4r6hc0H--MjldlKnoeopEEyHAiebFneKzBydWhfhB3GZudzfyAncXYQvMSmFzkSHWDLaQoGYqePcuTRYjoi4fk1GjhmILoQzhLama9QmIDo67HzF6CUxIY2GoxHpfhMNbcfTLOrCnQzipataLQSGDeaxTv9mu7Dz2blBqzSWcp_V8QRjDL-bhaa2u_yqb8Z7iRQOh_oFDZAd9_2lQzPcoiI6Bz-qyjo8tTjtTljeBKeFYDA'
})

const showToast = (message: string) => {
  toastMessage.value = message
  isToastVisible.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    isToastVisible.value = false
  }, 3500)
}

const dismissToast = () => {
  isToastVisible.value = false
}

const openSwapSection = () => {
  const el = document.getElementById('swap-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const selectAlternative = (title: string, cal: string, pro: string, carb: string, fat: string, imgSrc: string, desc: string) => {
  tomorrowMenu.value = { title, cal, pro, carb, fat, imgSrc, desc }
  
  if (isPaused.value) {
    togglePauseDay() // unpause if new menu is selected
  }

  showToast('Menu besok berhasil diubah ke ' + title.split('(')[0].trim() + '!')
  
  const tomorrowCard = document.getElementById('tomorrow-card')
  if (tomorrowCard) {
    tomorrowCard.scrollIntoView({ behavior: 'smooth' })
  }
}

const togglePauseDay = () => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    showToast('Pengantaran Kamis, 26 Okt berhasil dijeda.')
  } else {
    showToast('Pengantaran diaktifkan kembali.')
  }
}
</script>

<template>
  <main class="flex flex-col py-4 px-4 w-full relative max-w-md mx-auto">
    <!-- Toast Notification -->
    <div :class="isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24 pointer-events-none'"
         class="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm px-4 py-3 rounded-xl bg-primary text-on-primary shadow-xl flex items-center justify-between gap-3 transform transition-all duration-300" 
         id="swap-toast">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary-container text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
        <span class="text-[12px] font-semibold">{{ toastMessage }}</span>
      </div>
      <button class="text-on-primary/80 hover:text-on-primary" @click="dismissToast">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <div class="space-y-6 pb-6">
      <!-- SECTION 1: MENU SEHAT HARI INI -->
      <section class="space-y-2 pt-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-primary-container inline-block"></span>
            <h2 class="text-lg font-bold text-primary tracking-tight">Menu Sehat Hari Ini</h2>
          </div>
          <span class="text-[11px] font-bold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full">
            Rabu, 25 Okt
          </span>
        </div>

        <!-- Today's Bento Box -->
        <div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-highest">
          <div class="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
            <img alt="Salmon Teriyaki Bento Set" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UrH9qvmmZ2vHMGKQd4Ewk5pLDUa6QyZrQO3VdDSgnfGXeJ57J0_5NTGrzpbOi03z8oBVz1u3VPlbSLSMK_ilG8Qo0Bwd68xhfWZakt7z_K0xcIX81uksrw4abJNd4pcBejHNTKdweHF2QyzIGN3xdy_E0tLCA6PPDy65ci1WZDYeWvAvhHC7uLtMIbPKiTY59JCUJevepfSOyQPzZbgJpZAUfNfP2LTOCco3lQDIjpNkZPahxMAaVkyc4"/>
            <div class="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">restaurant_menu</span>
              <span class="text-[11px] font-bold text-on-surface">Porsi Makan Siang</span>
            </div>
            <div class="absolute top-3 right-3 bg-primary-container text-on-primary px-3 py-1 rounded-full shadow-md">
              <span class="text-[11px] font-bold tracking-wide">680 kkal</span>
            </div>
          </div>
          
          <div class="p-4 space-y-3">
            <div class="space-y-1">
              <h3 class="text-xl font-bold text-on-surface leading-snug">Salmon Teriyaki Bento Set</h3>
              <p class="text-[12px] text-on-surface-variant leading-relaxed">
                Nasi merah organik, salmon panggang saus teriyaki gurih, tamagoyaki lembut, edamame segar & acar lobak Jepang.
              </p>
            </div>
            
            <div class="p-3 bg-surface-container-low rounded-xl flex items-start gap-2.5 border border-surface-container-highest/50">
              <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">verified</span>
              <div class="space-y-0.5">
                <span class="text-[11px] font-bold text-primary uppercase tracking-wider block">Standar Mutu Katering</span>
                <p class="text-[11px] text-on-surface-variant">
                  Ichiju-Sansai Balanced Nutrition • 100% Halal • No Added MSG • Low Sodium
                </p>
              </div>
            </div>
            
            <!-- Nutrient Facts -->
            <div class="bg-surface-container-lowest rounded-xl p-4 space-y-4 border border-surface-container-highest">
              <div class="flex items-center justify-between pb-2 border-b-0">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[22px]">vital_signs</span>
                  <span class="text-lg font-bold text-on-surface">Informasi Nilai Gizi</span>
                </div>
                <span class="text-[11px] font-bold text-on-surface-variant">Per 1 Porsi</span>
              </div>
              
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-surface-container-low border border-surface-container-highest/60 p-2.5 rounded-lg">
                  <span class="text-[11px] font-bold text-on-surface-variant block">Protein</span>
                  <span class="text-xl font-bold text-primary block mt-0.5">42g</span>
                  <span class="text-[11px] text-primary-container block font-semibold">25% AKG</span>
                </div>
                <div class="bg-surface-container-low border border-surface-container-highest/60 p-2.5 rounded-lg">
                  <span class="text-[11px] font-bold text-on-surface-variant block">Karbo</span>
                  <span class="text-xl font-bold text-secondary block mt-0.5">68g</span>
                  <span class="text-[11px] text-secondary block font-semibold">40% AKG</span>
                </div>
                <div class="bg-surface-container-low border border-surface-container-highest/60 p-2.5 rounded-lg">
                  <span class="text-[11px] font-bold text-on-surface-variant block">Lemak</span>
                  <span class="text-xl font-bold text-tertiary-container block mt-0.5">18g</span>
                  <span class="text-[11px] text-tertiary-container block font-semibold">24% AKG</span>
                </div>
              </div>

              <div class="space-y-2 pt-1">
                <span class="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase block">Rincian Komposisi</span>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-on-surface">
                  <div class="flex items-center justify-between py-1 px-2">
                    <span class="text-on-surface-variant">Serat Pangan</span>
                    <span class="font-bold text-primary">8g</span>
                  </div>
                  <div class="flex items-center justify-between py-1 px-2">
                    <span class="text-on-surface-variant">Gula Alami</span>
                    <span class="font-bold">6g</span>
                  </div>
                  <div class="flex items-center justify-between py-1 px-2">
                    <span class="text-on-surface-variant">Natrium</span>
                    <span class="font-bold">480mg</span>
                  </div>
                  <div class="flex items-center justify-between py-1 px-2">
                    <span class="text-on-surface-variant">Kalsium</span>
                    <span class="font-bold text-primary">15% AKG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: MENU UNTUK BESOK -->
      <section class="space-y-3 pt-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
            <h2 class="text-lg font-bold text-primary tracking-tight">Menu untuk Besok</h2>
          </div>
          <div class="flex items-center gap-1 text-primary">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span class="text-[11px] font-bold">Batas 18:00</span>
          </div>
        </div>

        <!-- Schedule Badge -->
        <div class="bg-surface-container-low border border-surface-container-highest rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary text-[22px]">local_shipping</span>
            <div>
              <div class="text-[12px] text-on-surface font-bold">Kamis, 26 Okt</div>
              <div class="text-[11px] text-on-surface-variant">Pengantaran 11:30 - 12:30 WIB</div>
            </div>
          </div>
          <span class="text-[10px] bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Dapat Diubah
          </span>
        </div>

        <!-- Tomorrow's Card -->
        <div id="tomorrow-card" :class="isPaused ? 'opacity-50 grayscale-[50%]' : ''" class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-highest transition-all duration-300">
          <div class="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
            <img :alt="tomorrowMenu.title" class="w-full h-full object-cover" :src="tomorrowMenu.imgSrc"/>
            <div class="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-on-surface">
              <span class="text-[11px] font-bold">Menu Terjadwal</span>
            </div>
          </div>
          <div class="p-4 space-y-3">
            <div>
              <h3 class="text-lg font-bold text-on-surface">{{ tomorrowMenu.title }}</h3>
              <p class="text-[12px] text-on-surface-variant mt-0.5">
                {{ tomorrowMenu.desc }}
              </p>
            </div>
            
            <!-- Macros Summary -->
            <div class="flex items-center justify-between bg-surface-container-low border border-surface-container-highest/50 p-2.5 rounded-xl">
              <div class="text-center flex-1">
                <span class="text-[11px] text-on-surface-variant block">Kalori</span>
                <span class="text-[12px] text-on-surface font-bold">{{ tomorrowMenu.cal }}</span>
              </div>
              <div class="w-px h-6 bg-surface-container-highest"></div>
              <div class="text-center flex-1">
                <span class="text-[11px] text-on-surface-variant block">Protein</span>
                <span class="text-[12px] text-primary font-bold">{{ tomorrowMenu.pro }}</span>
              </div>
              <div class="w-px h-6 bg-surface-container-highest"></div>
              <div class="text-center flex-1">
                <span class="text-[11px] text-on-surface-variant block">Karbo</span>
                <span class="text-[12px] text-secondary font-bold">{{ tomorrowMenu.carb }}</span>
              </div>
              <div class="w-px h-6 bg-surface-container-highest"></div>
              <div class="text-center flex-1">
                <span class="text-[11px] text-on-surface-variant block">Lemak</span>
                <span class="text-[12px] text-tertiary-container font-bold">{{ tomorrowMenu.fat }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <button @click="openSwapSection" class="flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary py-3 px-3 rounded-xl shadow-sm transition-transform active:scale-[0.98]">
                <span class="material-symbols-outlined text-[20px]">swap_horiz</span>
                <span class="text-sm font-bold">Swap Menu</span>
              </button>
              
              <button @click="togglePauseDay" :class="isPaused ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-surface-container-highest/80'" class="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl transition-all shadow-sm active:scale-[0.98]">
                <span class="material-symbols-outlined text-[20px]" :class="!isPaused ? 'text-tertiary-container' : ''">{{ isPaused ? 'play_circle' : 'pause_circle' }}</span>
                <span class="text-[12px] font-bold">{{ isPaused ? 'Batalkan Jeda' : 'Jeda 1 Hari' }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: SWAP OPTIONS -->
      <section id="swap-section" class="space-y-4 pt-2 scroll-mt-20">
        <div>
          <h2 class="text-lg font-bold text-primary tracking-tight">Pilihan Menu Alternatif</h2>
          <p class="text-[12px] text-on-surface-variant">Pilih menu pengganti sebelum 18:00 WIB</p>
        </div>

        <!-- Alt 1 -->
        <div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-highest flex flex-col">
          <div class="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
            <img alt="Miso Tofu & Nasu Dengaku Bento" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9PNxmBvvhpsjJCq176U-Ux1MQ3jhenh0IhOaOM7X1X82YRrDAPaTMvjGyQf7FEquwsjKxR0CmvjVpq2laEbOI7TXpF-RVet7-xFk3Qy2fNrnsBoETI3xLld-_-Vzcef4CgKv750NE4z2XdMAjIiB5nONa9c9U6gbo2Gn8uOWKoxm_g2bqM5fRWQUcHe1qSFR1K_9P_k_H7lCLkHEuSI0F6AAW3N0BjJ5cvJA5-F-fBQf486jFAVWufg"/>
            <span class="absolute top-3 left-3 bg-secondary text-on-secondary px-3 py-1 rounded-full text-[11px] font-bold shadow-sm">
              Vegetarian Delight
            </span>
            <span class="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm text-on-surface text-[12px] font-bold px-2.5 py-1 rounded-lg">
              510 kkal
            </span>
          </div>
          <div class="p-4 space-y-3">
            <div>
              <h4 class="text-lg font-bold text-on-surface">Miso Tofu & Nasu Dengaku Bento</h4>
              <p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                Tofu bakar saus miso, terong glazed nasu dengaku, nasi beras ungu, salad rumput laut wakame & edamame.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-2 text-on-surface">
              <span class="text-[11px] font-semibold bg-surface-container-low border border-surface-container-highest px-2.5 py-1 rounded-md">Protein 28g</span>
              <span class="text-[11px] font-semibold bg-surface-container-low border border-surface-container-highest px-2.5 py-1 rounded-md">Karbo 65g</span>
              <span class="text-[11px] font-semibold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-md">Serat 11g</span>
            </div>
            
            <button @click="selectAlternative('Miso Tofu & Nasu Dengaku Bento (Vegetarian)', '510 kkal', '28g', '65g', '12g', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9PNxmBvvhpsjJCq176U-Ux1MQ3jhenh0IhOaOM7X1X82YRrDAPaTMvjGyQf7FEquwsjKxR0CmvjVpq2laEbOI7TXpF-RVet7-xFk3Qy2fNrnsBoETI3xLld-_-Vzcef4CgKv750NE4z2XdMAjIiB5nONa9c9U6gbo2Gn8uOWKoxm_g2bqM5fRWQUcHe1qSFR1K_9P_k_H7lCLkHEuSI0F6AAW3N0BjJ5cvJA5-F-fBQf486jFAVWufg', 'Tofu bakar saus miso, terong glazed nasu dengaku, nasi beras ungu & wakame.')" class="w-full py-3 bg-surface-container-low hover:bg-primary-container text-primary rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-primary/20 shadow-sm transition-transform active:scale-[0.98]">
              <span class="material-symbols-outlined text-[18px]">check</span>
              Pilih Menu Ini
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
