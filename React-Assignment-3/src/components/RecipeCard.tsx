import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Edit, Trash2, Heart, Share2, ShoppingCart } from 'lucide-react'
import type { RecipeCardProps } from '../types'
import { deleteRecipe, toggleFavorite } from '../store/recipeSlice'
import { Button, Card, Badge } from './ui'

const RecipeCard = React.memo<RecipeCardProps>(
  ({ recipe, onEdit, onAddToShoppingList, onShare }) => {
    const dispatch = useDispatch()

    const handleDelete = useCallback(() => {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        dispatch(deleteRecipe(recipe.id))
      }
    }, [dispatch, recipe.id])

    const handleToggleFavorite = useCallback(() => {
      dispatch(toggleFavorite(recipe.id))
    }, [dispatch, recipe.id])

    const handleEdit = useCallback(() => {
      onEdit(recipe)
    }, [onEdit, recipe])

    const handleAddToShoppingList = useCallback(() => {
      onAddToShoppingList?.(recipe.ingredients)
    }, [onAddToShoppingList, recipe.ingredients])

    const handleShare = useCallback(() => {
      onShare?.(recipe.id)
    }, [onShare, recipe.id])

    return (
      <Card className="overflow-hidden group hover-lift">
        <div className="relative overflow-hidden">
          <img
            src={
              recipe.imageUrl ||
              'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=240&fit=crop&auto=format'
            }
            alt={recipe.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 shadow-lg ${
                recipe.isFavorite
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 shadow-red-500/25'
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <Heart
                size={18}
                fill={recipe.isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="primary" className="shadow-lg backdrop-blur-sm">
              {recipe.category === 'Dessert' && '🍰'}
              {recipe.category === 'Main Course' && '🍽️'}
              {recipe.category === 'Snack' && '🍿'}
              {recipe.category === 'Appetizer' && '🥗'}
              {recipe.category === 'Beverage' && '🥤'}
              {' '}{recipe.category}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-purple-700 transition-colors dark:text-white dark:group-hover:text-purple-400">
              {recipe.name}
            </h3>
          </div>

          {(recipe.prepTime || recipe.servings) && (
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-2 dark:bg-gray-700/50 dark:text-gray-300">
              {recipe.prepTime && <span className="flex items-center gap-1">⏱️ {recipe.prepTime} min</span>}
              {recipe.servings && <span className="flex items-center gap-1">👥 {recipe.servings} servings</span>}
            </div>
          )}

          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} className="text-xs">
                  {ingredient}
                </Badge>
              ))}
              {recipe.ingredients.length > 3 && (
                <Badge variant="warning" className="text-xs">
                  +{recipe.ingredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed dark:text-gray-400">
            {recipe.instructions}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="ghost" onClick={handleEdit} className="flex-1">
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="danger" onClick={handleDelete} className="flex-1">
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
            {onAddToShoppingList && (
              <Button
                size="sm"
                variant="success"
                onClick={handleAddToShoppingList}
                className="flex-1"
              >
                <ShoppingCart size={16} className="mr-1" />
                Shop
              </Button>
            )}
            {onShare && (
              <Button size="sm" variant="ghost" onClick={handleShare}>
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }
)

export default RecipeCard