import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './index'

export const selectRecipes = (state: RootState) => state.recipes.recipes
export const selectFilter = (state: RootState) => state.recipes.filter
export const selectSearchTerm = (state: RootState) => state.recipes.searchTerm

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectFilter, selectSearchTerm],
  (recipes, filter, searchTerm) => {
    let filtered = recipes

    if (filter !== 'all') {
      filtered = filtered.filter((recipe) => recipe.category === filter)
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(lowerSearchTerm) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(lowerSearchTerm)
          )
      )
    }

    return filtered
  }
)