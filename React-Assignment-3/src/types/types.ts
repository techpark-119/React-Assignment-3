export interface Recipe {
  id: string
  name: string
  ingredients: string[]
  instructions: string
  imageUrl: string
  category: string
  isFavorite: boolean
  prepTime?: number
  servings?: number
}

export interface RecipeState {
  recipes: Recipe[]
  filter: string
  searchTerm: string
}

export type SortBy = 'name' | 'category' | 'favorite'

export interface RecipeCardProps {
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
  onAddToShoppingList?: (ingredients: string[]) => void
  onShare?: (id: string) => void
}

export interface RecipeFormProps {
  recipe?: Recipe
  isOpen: boolean
  onClose: () => void
}

export interface ShoppingListModalProps {
  items: string[]
  isOpen: boolean
  onClose: () => void
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const CATEGORIES = [
  'Dessert',
  'Main Course',
  'Snack',
  'Appetizer',
  'Beverage',
] as const
