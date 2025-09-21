
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import type { RecipeFormProps } from '../types'
import { CATEGORIES } from '../types'
import { addRecipe, updateRecipe } from '../store/recipeSlice'
import { Modal, Input, Textarea, Select, Button } from './ui'

const RecipeForm = React.memo<RecipeFormProps>(
  ({ recipe, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      name: '',
      ingredients: '',
      instructions: '',
      imageUrl: '',
      category: 'Main Course',
      isFavorite: false,
      prepTime: '',
      servings: '',
    })

    useEffect(() => {
      if (recipe) {
        setFormData({
          name: recipe.name,
          ingredients: recipe.ingredients.join(', '),
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
          category: recipe.category,
          isFavorite: recipe.isFavorite,
          prepTime: recipe.prepTime?.toString() || '',
          servings: recipe.servings?.toString() || '',
        })
      } else if (isOpen) {
        setFormData({
          name: '',
          ingredients: '',
          instructions: '',
          imageUrl: '',
          category: 'Main Course',
          isFavorite: false,
          prepTime: '',
          servings: '',
        })
      }
    }, [recipe, isOpen])

    const handleSubmit = useCallback(() => {
      if (
        !formData.name.trim() ||
        !formData.ingredients.trim() ||
        !formData.instructions.trim()
      ) {
        alert('Please fill in all required fields')
        return
      }

      const recipeData = {
        name: formData.name.trim(),
        ingredients: formData.ingredients
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
        instructions: formData.instructions.trim(),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
        isFavorite: formData.isFavorite,
        prepTime: formData.prepTime ? parseInt(formData.prepTime) : undefined,
        servings: formData.servings ? parseInt(formData.servings) : undefined,
      }

      if (recipe) {
        dispatch(updateRecipe({ ...recipeData, id: recipe.id }))
      } else {
        dispatch(addRecipe(recipeData))
      }

      onClose()
    }, [formData, recipe, dispatch, onClose])

    const updateField = useCallback(
      (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
      },
      []
    )

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={recipe ? 'Edit Recipe' : 'Add New Recipe'}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name *
            </label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter recipe name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (minutes)
              </label>
              <Input
                type="number"
                value={formData.prepTime}
                onChange={(e) => updateField('prepTime', e.target.value)}
                placeholder="30"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Servings
              </label>
              <Input
                type="number"
                value={formData.servings}
                onChange={(e) => updateField('servings', e.target.value)}
                placeholder="4"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients * (comma-separated)
            </label>
            <Textarea
              required
              value={formData.ingredients}
              onChange={(e) => updateField('ingredients', e.target.value)}
              rows={3}
              placeholder="flour, sugar, eggs, butter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions *
            </label>
            <Textarea
              required
              value={formData.instructions}
              onChange={(e) => updateField('instructions', e.target.value)}
              rows={4}
              placeholder="Step-by-step cooking instructions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <Input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <Select
              required
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.isFavorite}
              onChange={(e) => updateField('isFavorite', e.target.checked)}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="favorite" className="ml-2 text-sm text-gray-700">
              Mark as favorite
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {recipe ? 'Update Recipe' : 'Add Recipe'}
            </Button>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
)

export default RecipeForm