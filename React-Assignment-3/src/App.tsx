import { useEffect, useState, useMemo, useCallback } from 'react'
import { Provider, useSelector } from 'react-redux'
import { Plus, ShoppingCart, Sun, Moon } from 'lucide-react'
import { store } from './store'
import { selectFilteredRecipes } from './store/selectors'
import type { Recipe, SortBy } from './types'
import { Button, Select } from './components/ui'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './components/RecipeForm'
import SearchAndFilter from './components/SearchAndFilter'
import ShoppingListModal from './components/ShoppingListModal'
import EmptyState from './components/EmptyState'

function RecipeApp() {
  const [showForm, setShowForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>()
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [shoppingList, setShoppingList] = useState<string[]>([])
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy>('name')
  const filteredRecipes = useSelector(selectFilteredRecipes)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const sortedRecipes = useMemo(() => {
    return [...filteredRecipes].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'favorite':
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
        default:
          return 0
      }
    })
  }, [filteredRecipes, sortBy])

  const handleAddToShoppingList = useCallback((ingredients: string[]) => {
    setShoppingList((prev) => Array.from(new Set([...prev, ...ingredients])))
    setShowShoppingList(true)
  }, [])

  const handleShareRecipe = useCallback((id: string) => {
    const url = `${window.location.origin}/#recipe-${id}`
    navigator.clipboard.writeText(url).then(() => {
      alert('Recipe link copied to clipboard!')
    })
  }, [])

  const handleEdit = useCallback((recipe: Recipe) => {
    setEditingRecipe(recipe)
    setShowForm(true)
  }, [])

  const handleCloseForm = useCallback(() => {
    setShowForm(false)
    setEditingRecipe(undefined)
  }, [])

  const handleAddRecipe = useCallback(() => {
    setEditingRecipe(undefined)
    setShowForm(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <div
      className={`min-h-screen bg-gray-50 ${
        theme === 'dark' ? 'dark:bg-gray-900' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe Collection
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Discover and manage your favorite recipes
          </p>

          <div className="flex justify-center items-center gap-4 mb-8">
            <Button onClick={handleAddRecipe}>
              <Plus size={18} className="mr-2" />
              Add Recipe
            </Button>

            <Button variant="ghost" onClick={() => setShowShoppingList(true)}>
              <ShoppingCart size={18} className="mr-2" />
              Shopping List ({shoppingList.length})
            </Button>

            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          <div className="flex justify-center items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="w-40"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="favorite">Favorite</option>
            </Select>
          </div>
        </header>

        <div className="mb-8">
          <SearchAndFilter />
        </div>

        {sortedRecipes.length === 0 ? (
          <EmptyState onAddRecipe={handleAddRecipe} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEdit}
                onAddToShoppingList={handleAddToShoppingList}
                onShare={handleShareRecipe}
              />
            ))}
          </div>
        )}

        <RecipeForm
          recipe={editingRecipe}
          isOpen={showForm}
          onClose={handleCloseForm}
        />

        <ShoppingListModal
          items={shoppingList}
          isOpen={showShoppingList}
          onClose={() => setShowShoppingList(false)}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <RecipeApp />
    </Provider>
  )
}