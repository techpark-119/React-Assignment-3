import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchTerm } from '../store/recipeSlice';
import { selectFilter, selectSearchTerm } from '../store/selectors';

const categories = ['all', 'Dessert', 'Main Course', 'Snack', 'Appetizer', 'Beverage'];

export default function SearchAndFilter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const searchTerm = useSelector(selectSearchTerm);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8 shadow-xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
            Search Recipes
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search by name or ingredient..."
              className="w-full p-4 pl-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="md:w-56">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter by Category
          </label>
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 cursor-pointer"
          >
            {categories.map(category => {
              const icons = {
                all: '🍽️',
                Dessert: '🍰',
                'Main Course': '🍖',
                Snack: '🥨',
                Appetizer: '🥗',
                Beverage: '🥤'
              };
              return (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}