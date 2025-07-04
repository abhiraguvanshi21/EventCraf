import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Calendar, Phone, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isVendor = user?.accountType === "vendor";

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">EventCraft</span>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors duration-300 ${
                isActive("/")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-300 ${
                isActive("/about")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              About
            </Link>

            <Link
              to="/services"
              className={`transition-colors duration-300 ${
                isActive("/services")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Services
            </Link>
            <Link
              to="/vendors"
              className={`transition-colors duration-300 ${
                isActive("/vendors")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Vendors
            </Link>
            <Link
              to="/gallery"
              className={`transition-colors duration-300 ${
                isActive("/gallery")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Gallery
            </Link>
            {user && !isVendor && (
              <Link
                to="/planning"
                className={`transition-colors duration-300 ${
                  isActive("/planning")
                    ? "text-purple-600 font-semibold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Planning
              </Link>
            )}
            <Link
              to="/contact"
              className={`transition-colors duration-300 ${
                isActive("/contact")
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>+91 9161036941</span>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-300"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {!isVendor && (
                      <Link
                        to="/planning"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Planning
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/vendors"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              {user && !isVendor && (
                <Link
                  to="/planning"
                  className="text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planning
                </Link>
              )}
              <Link
                to="/contact"
                className="text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Welcome, {user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-full w-fit flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-purple-600 text-white px-6 py-2 rounded-full w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
