import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';
import { selectFilteredRecipes } from './store/selectors';
import { type Recipe } from './store/recipeSlice';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import SearchAndFilter from './components/SearchAndFilter';


// NEW: Shopping List Modal
function ShoppingListModal({ items, onClose }: { items: string[], onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">🛒 Shopping List</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No items in your shopping list.</p>
        ) : (
          <ul className="mb-4">
            {items.map((item, i) => (
              <li key={i} className="py-1 border-b last:border-b-0">{item}</li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function RecipeApp() {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'favorite'>('name');
  const filteredRecipes = useSelector(selectFilteredRecipes);

  // Theme effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Sorting
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    if (sortBy === 'favorite') return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
    return 0;
  });

  // Add ingredients to shopping list
  const handleAddToShoppingList = (ingredients: string[]) => {
    setShoppingList((prev) => Array.from(new Set([...prev, ...ingredients])));
    setShowShoppingList(true);
  };

  // Share recipe (copy link)
  const handleShareRecipe = (id: string) => {
    const url = `${window.location.origin}/#recipe-${id}`;
    navigator.clipboard.writeText(url);
    alert('Recipe link copied to clipboard!');
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRecipe(undefined);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-full mb-6 border border-white/20">
            <span className="text-6xl">🍳</span>
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-4">
            Recipe Book
          </h1>
          <p className="text-white/80 text-lg font-medium">Discover and manage your favorite recipes with style</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition"
              title="Toggle theme"
            >
              {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={() => setShowShoppingList(true)}
              className="bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition"
              title="View shopping list"
            >
              🛒 Shopping List ({shoppingList.length})
            </button>
          </div>
        </header>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 border border-white/20 backdrop-blur-sm"
            >
              ✨ Add Recipe
            </button>
            <div className="flex items-center gap-2">
              <label className="text-white/80 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="rounded-xl px-3 py-2 bg-white/20 text-white"
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="favorite">Favorite</option>
              </select>
            </div>
          </div>
          <SearchAndFilter />
        </div>

        {sortedRecipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/10 backdrop-blur-lg rounded-full mb-8 border border-white/20">
              <span className="text-8xl">🍽️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              No recipes found
            </h3>
            <p className="text-white/70 mb-8 text-lg max-w-md mx-auto">
              Start building your recipe collection by adding your first delicious recipe!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              🎆 Add Your First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRecipes.map(recipe => (
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

        {showForm && (
          <RecipeForm
            recipe={editingRecipe}
            onClose={handleCloseForm}
          />
        )}
        {showShoppingList && (
          <ShoppingListModal
            items={shoppingList}
            onClose={() => setShowShoppingList(false)}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RecipeApp />
    </Provider>
  );
}