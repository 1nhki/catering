import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DeliveryStatus, MenuItem } from '../types'

export const useTrackerStore = defineStore('tracker', () => {
  const targetCalories = ref(1850)
  const consumedCalories = ref(620)
  const remainingCredits = ref(18)
  const deliveryStatus = ref<DeliveryStatus>('dalam_pengantaran')
  const proofImageUrl = ref<string | null>(null)

  const quickAddItems = ref<Array<{ id: string; name: string; calories: number; timestamp: string }>>([
    { id: '1', name: 'Americano (No Sugar)', calories: 5, timestamp: '09:15' }
  ])

  const plannedMenu = ref<MenuItem[]>([
    {
      id: 'm1',
      name: 'Grilled Salmon with Quinoa & Steamed Greens',
      category: 'Lunch',
      calories: 580,
      protein: 42,
      carbs: 45,
      fat: 18,
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'm2',
      name: 'Herb Crusted Chicken Breast & Sweet Potato Mash',
      category: 'Dinner',
      calories: 520,
      protein: 48,
      carbs: 40,
      fat: 12,
      imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60'
    }
  ])

  const caloriePercentage = computed(() => {
    return Math.min(Math.round((consumedCalories.value / targetCalories.value) * 100), 100)
  })

  function addQuickCalories(name: string, calories: number) {
    quickAddItems.value.unshift({
      id: Date.now().toString(),
      name,
      calories,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    consumedCalories.value += calories
  }

  function simulateCourierArrived() {
    deliveryStatus.value = 'tiba'
    proofImageUrl.value = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
    // Auto-log bento calories on arrival
    consumedCalories.value += 580
  }

  return {
    targetCalories,
    consumedCalories,
    remainingCredits,
    deliveryStatus,
    proofImageUrl,
    plannedMenu,
    quickAddItems,
    caloriePercentage,
    addQuickCalories,
    simulateCourierArrived
  }
})
