import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from './ui'

interface EmptyStateProps {
  onAddRecipe: () => void
}

const EmptyState = React.memo<EmptyStateProps>(({ onAddRecipe }) => (
  <div className="text-center py-20">
    <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-xl border border-white/20 animate-pulse">
      <span className="text-6xl">🍽️</span>
    </div>
    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
      No recipes found
    </h3>
    <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto font-medium dark:text-white">
      Start building your recipe collection by adding your first delicious recipe! 🍳✨
    </p>
    <Button onClick={onAddRecipe} size="lg">
      <Plus size={20} className="mr-2" />
      Add Your First Recipe
    </Button>
  </div>
))

export default EmptyState
