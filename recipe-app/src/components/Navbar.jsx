import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className=" bg-orange-500 text-white p-4 shadow-lg top-0">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="https://dcassetcdn.com/design_img/10150/25224/25224_294121_10150_image.jpg" 
            alt="Recipe App Logo" 
            className="w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
          <h1 className="text-2xl font-extrabold italic tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer" style={{fontFamily: 'Georgia, serif'}}>Recipe App</h1>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-200 transition-colors">
            Home
          </Link>
          {user && (
            <>
              <Link to="/favorites" className="hover:text-yellow-200 transition-colors">
                Favorites
              </Link>
              <Link to="/profile" className="hover:text-yellow-200 transition-colors">
                Profile
              </Link>
            </>
          )}
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-yellow-100 text-orange-800 px-4 py-2 rounded hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-orange-500 hover:scale-105 transition-all duration-300"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;