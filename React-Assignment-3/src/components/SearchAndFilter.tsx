import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, Filter } from 'lucide-react'
import { setFilter, setSearchTerm } from '../store/recipeSlice'
import { selectFilter, selectSearchTerm } from '../store/selectors'
import { CATEGORIES } from '../types'
import { Card, Input, Select } from './ui'

const SearchAndFilter = React.memo(() => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)
  const searchTerm = useSelector(selectSearchTerm)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(e.target.value))
    },
    [dispatch]
  )

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilter(e.target.value))
    },
    [dispatch]
  )

  return (
    <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/30 dark:border-gray-700/30">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 dark:text-gray-300">
            🔍 Search Recipes
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={20}
            />
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or ingredient..."
              className="pl-12 text-base"
            />
          </div>
        </div>

        <div className="md:w-56">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 dark:text-gray-300">
            🏷️ Filter by Category
          </label>
          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={20}
            />
            <Select
              value={filter}
              onChange={handleFilterChange}
              className="pl-12 text-base"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === 'Dessert' && '🍰'}
                  {category === 'Main Course' && '🍽️'}
                  {category === 'Snack' && '🍿'}
                  {category === 'Appetizer' && '🥗'}
                  {category === 'Beverage' && '🥤'}
                  {' '}{category}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Card>
  )
})

export default SearchAndFilter