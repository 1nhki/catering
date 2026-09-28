export type UserGoal = 'fat_loss' | 'muscle_gain' | 'maintenance'

export type Gender = 'male' | 'female'

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active'

export interface UserMetrics {
  age: number
  gender: Gender
  heightCm: number
  weightKg: number
  activityLevel: ActivityLevel
  goal: UserGoal
  tdee: number
  targetCalories: number
}

export type DeliveryStatus = 'diproses_dapur' | 'dalam_pengantaran' | 'tiba'

export interface MenuItem {
  id: string
  name: string
  category: 'Lunch' | 'Dinner'
  calories: number
  protein: number
  carbs: number
  fat: number
  imageUrl?: string
  description?: string
}
