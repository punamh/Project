import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id.startsWith('firebase_')) {
          // Fetch from Firebase
          const firebaseId = id.replace('firebase_', '');
          const response = await axios.get(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/recipe/${firebaseId}.json`);
          setRecipe(response.data);
        } else {
          // Fetch from DummyJSON
          const response = await fetch(`https://dummyjson.com/recipes/${id}`);
          const data = await response.json();
          setRecipe(data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/comments/${id}.json`);
        const commentsData = response.data ? Object.entries(response.data).map(([commentId, comment]) => ({ commentId, ...comment })) : [];
        setComments(commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    
    setCommentsLoading(true);
    try {
      const commentData = {
        text: newComment.trim(),
        userEmail: user.email,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      
      await axios.post(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/comments/${id}.json`, commentData);
      
      // Refresh comments
      const response = await axios.get(`https://recipe-app-4e72e-default-rtdb.firebaseio.com/comments/${id}.json`);
      const commentsData = response.data ? Object.entries(response.data).map(([commentId, comment]) => ({ commentId, ...comment })) : [];
      setComments(commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <div>Loading recipe...</div>
      </div>
    </div>
  );
  
  if (!recipe) return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <div>Recipe not found</div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700">{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-6 flex gap-4 text-sm text-gray-600">
              <span>Prep: {recipe.prepTimeMinutes} min</span>
              <span>Cook: {recipe.cookTimeMinutes} min</span>
              <span>Servings: {recipe.servings}</span>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>
          
          {/* Add Comment Form */}
          {user ? (
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim() || commentsLoading}
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400 hover:scale-105 transition-all duration-300"
              >
                {commentsLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600">Please login to leave a comment</p>
            </div>
          )}
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.commentId} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {comment.userEmail ? comment.userEmail.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{comment.userEmail || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 ml-11">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;