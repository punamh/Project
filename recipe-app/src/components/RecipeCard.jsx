import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user?.uid) {
        setIsFavorite(false);
        return;
      }
      
      try {
        const response = await axios.get(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/favorites/${user.uid}/${recipe.id}.json`);
        setIsFavorite(!!response.data);
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    };

    checkIfFavorite();
  }, [user?.uid, recipe.id]);

  const toggleFavorite = async () => {
    if (!user) return;
    
    try {
      if (isFavorite) {
        await axios.delete(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/favorites/${user.uid}/${recipe.id}.json`);
        setIsFavorite(false);
      } else {
        await axios.put(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/favorites/${user.uid}/${recipe.id}.json`, recipe);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300">
      {user && (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 hover:scale-110 transition-all duration-200"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      )}
      <img 
        src={recipe.image} 
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.instructions[0]}</p>
        <Link 
          to={`/recipe/${recipe.id}`}
          className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 hover:scale-105 transition-all duration-300 text-center"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;