import { useDispatch } from 'react-redux';
import { type Recipe, deleteRecipe, toggleFavorite } from '../store/recipeSlice';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onAddToShoppingList?: (ingredients: string[]) => void; // NEW
  onShare?: (id: string) => void; // NEW
}

export default function RecipeCard({ recipe, onEdit, onAddToShoppingList, onShare }: RecipeCardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop&auto=format'}
          alt={recipe.name}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
            recipe.isFavorite 
              ? 'bg-pink-500/90 text-white border-pink-400 shadow-lg shadow-pink-500/25' 
              : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 flex items-center gap-1">
            {recipe.category === 'Dessert' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z"/></svg>}
            {recipe.category === 'Main Course' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>}
            {recipe.category === 'Snack' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"/></svg>}
            {recipe.category === 'Appetizer' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            {recipe.category === 'Beverage' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0011.601 2.566 1 1 0 11-1.202 1.596A5.002 5.002 0 017.5 9.5v-5A1 1 0 016.5 3h-2A1 1 0 014 2z"/></svg>}
            {recipe.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">{recipe.name}</h3>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm font-medium border border-blue-200/50">
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full text-sm font-medium">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {recipe.instructions}
        </p>
        
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
            </svg>
            Delete
          </button>
          {onAddToShoppingList && (
            <button
              onClick={() => onAddToShoppingList(recipe.ingredients)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              🛒 Add Ingredients
            </button>
          )}
          {onShare && (
            <button
              onClick={() => onShare(recipe.id)}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              🔗 Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}