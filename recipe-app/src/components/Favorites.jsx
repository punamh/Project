import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/favorites/${user.uid}.json`);
      const favorites = response.data ? Object.values(response.data).filter(recipe => recipe && recipe.id) : [];
      setFavoriteRecipes(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Please login to view your favorites.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>
        {loading ? (
          <div className="text-center">Loading favorites...</div>
        ) : favoriteRecipes.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No favorite recipes yet.</p>
            <p>Click the heart icon on any recipe to add it to your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.filter(recipe => recipe && recipe.id).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;