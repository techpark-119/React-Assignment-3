import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Recipe, RecipeState } from '../types'

const loadFromStorage = (): Recipe[] => {
  try {
    const saved = localStorage.getItem('recipes')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialState: RecipeState = {
  recipes: loadFromStorage(),
  filter: 'all',
  searchTerm: '',
}

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Omit<Recipe, 'id'>>) => {
      const newRecipe: Recipe = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.recipes.push(newRecipe)
      localStorage.setItem('recipes', JSON.stringify(state.recipes))
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      )
      if (index !== -1) {
        state.recipes[index] = action.payload
        localStorage.setItem('recipes', JSON.stringify(state.recipes))
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      )
      localStorage.setItem('recipes', JSON.stringify(state.recipes))
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.find(
        (recipe) => recipe.id === action.payload
      )
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite
        localStorage.setItem('recipes', JSON.stringify(state.recipes))
      }
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  setFilter,
  setSearchTerm,
} = recipeSlice.actions

export default recipeSlice.reducer