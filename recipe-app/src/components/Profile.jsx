import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [userRecipes, setUserRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    ingredients: '',
    instructions: '',
    cuisine: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: ''
  });

  const isAdmin = user?.email === 'admin@recipe.com';

  useEffect(() => {
    if (user) {
      fetchUserRecipes();
    }
  }, [user]);

  const fetchUserRecipes = async () => {
    try {
      const response = await axios.get('https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe.json');
      const recipes = response.data ? Object.entries(response.data).map(([id, recipe]) => ({ id, ...recipe })) : [];
      const filtered = recipes.filter(recipe => recipe.createdBy === user.uid);
      setUserRecipes(filtered);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      instructions: formData.instructions.split('.').map(i => i.trim()).filter(i => i),
      prepTimeMinutes: parseInt(formData.prepTimeMinutes),
      cookTimeMinutes: parseInt(formData.cookTimeMinutes),
      servings: parseInt(formData.servings),
      createdBy: user.uid,
      createdAt: new Date().toISOString()
    };

    try {
      if (editingRecipe) {
        await axios.put(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe/${editingRecipe.id}.json`, recipeData);
      } else {
        await axios.post('https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe.json', recipeData);
      }
      setFormData({ name: '', image: '', ingredients: '', instructions: '', cuisine: '', prepTimeMinutes: '', cookTimeMinutes: '', servings: '' });
      setShowForm(false);
      setEditingRecipe(null);
      fetchUserRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      name: recipe.name,
      image: recipe.image,
      ingredients: recipe.ingredients.join(', '),
      instructions: recipe.instructions.join('. '),
      cuisine: recipe.cuisine,
      prepTimeMinutes: recipe.prepTimeMinutes.toString(),
      cookTimeMinutes: recipe.cookTimeMinutes.toString(),
      servings: recipe.servings.toString()
    });
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe/${recipeId}.json`);
        fetchUserRecipes();
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Profile</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                {showForm ? 'Cancel' : 'Add Recipe'}
              </button>
            </div>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {isAdmin ? 'Admin' : 'User'}</p>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Recipe Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Ingredients (comma separated)"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  className="w-full p-2 border rounded h-20"
                  required
                />
                <textarea
                  placeholder="Instructions (period separated)"
                  value={formData.instructions}
                  onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                  className="w-full p-2 border rounded h-32"
                  required
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Cuisine"
                    value={formData.cuisine}
                    onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Prep Time (min)"
                    value={formData.prepTimeMinutes}
                    onChange={(e) => setFormData({...formData, prepTimeMinutes: e.target.value})}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cook Time (min)"
                    value={formData.cookTimeMinutes}
                    onChange={(e) => setFormData({...formData, cookTimeMinutes: e.target.value})}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Servings"
                    value={formData.servings}
                    onChange={(e) => setFormData({...formData, servings: e.target.value})}
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                >
                  {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
                </button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">My Recipes ({userRecipes.length})</h3>
            {userRecipes.length === 0 ? (
              <p className="text-gray-600">No recipes created yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userRecipes.map((recipe) => (
                  <div key={recipe.id} className="border rounded-lg overflow-hidden">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold">{recipe.name}</h4>
                      <p className="text-sm text-gray-600">{recipe.cuisine}</p>
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 hover:scale-105 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;