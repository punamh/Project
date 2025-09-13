import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch from DummyJSON API
        const dummyResponse = await fetch('https://dummyjson.com/recipes');
        const dummyData = await dummyResponse.json();
        
        // Fetch from Firebase
        const firebaseResponse = await axios.get('https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe.json');
        const firebaseRecipes = firebaseResponse.data ? 
          Object.entries(firebaseResponse.data).map(([id, recipe]) => ({ 
            id: `firebase_${id}`, 
            ...recipe 
          })) : [];
        
        // Combine both sources
        const allRecipes = [...dummyData.recipes, ...firebaseRecipes];
        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);
        
        // Extract unique countries
        const uniqueCountries = [...new Set(allRecipes.map(recipe => recipe.cuisine))];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;
    
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCountry) {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCountry);
    }
    
    if (selectedDiet) {
      if (selectedDiet === 'veg') {
        filtered = filtered.filter(recipe => 
          !recipe.ingredients.some(ingredient => 
            /\b(chicken|beef|pork|fish|meat|lamb|turkey|bacon|ham|sausage|shrimp|crab|lobster)\b/i.test(ingredient)
          )
        );
      } else if (selectedDiet === 'non-veg') {
        filtered = filtered.filter(recipe => 
          recipe.ingredients.some(ingredient => 
            /\b(chicken|beef|pork|fish|meat|lamb|turkey|bacon|ham|sausage|shrimp|crab|lobster)\b/i.test(ingredient)
          )
        );
      }
    }
    
    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCountry, selectedDiet, recipes]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-6 flex flex-col md:flex-row gap-4 animate-slide-down">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Types</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>
        
        {loading ? (
          <div className="text-center">Loading recipes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
        
        {!loading && filteredRecipes.length === 0 && (
          <div className="text-center text-gray-600">
            No recipes found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;