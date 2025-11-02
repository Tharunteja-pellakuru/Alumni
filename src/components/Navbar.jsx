import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openLogin, openRegister } = useModal();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/directory", label: "Directory" },
    { path: "/events", label: "Events" },
    { path: "/stories", label: "Stories" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-16 border-2 border-school-orange rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-lg relative px-4">
              <img
                src={logo}
                alt="KSE Logo"
                className="h-full w-auto object-contain py-1.5 max-w-none"
                style={{ minHeight: "48px" }}
                onError={(e) => {
                  // Fallback to text if image doesn't exist
                  e.target.style.display = "none";
                  const fallback =
                    e.target.parentElement.querySelector(".logo-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="logo-fallback w-full h-full bg-school-blue rounded-lg items-center justify-center"
                style={{ display: "none", position: "absolute" }}
              >
                <span className="text-white font-bold text-base">KSE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-school-blue border-b-2 border-school-blue"
                    : "text-gray-700 hover:text-school-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <button
                  onClick={openLogin}
                  className="px-6 py-2 bg-school-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={openRegister}
                  className="px-4 py-2 bg-white border border-school-blue text-school-blue rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Join Now
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu((s) => !s)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-school-blue text-white flex items-center justify-center font-semibold">
                    {(user.name && user.name[0]) || user.email[0]}
                  </div>
                  <span className="text-sm text-gray-700">
                    {user.name || user.email}
                  </span>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/alumni/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-school-blue focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "text-school-blue bg-blue-50"
                    : "text-gray-700 hover:text-school-blue hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openLogin();
                  }}
                  className="block w-full px-3 py-2 mt-2 text-school-blue hover:text-blue-700 text-center font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openRegister();
                  }}
                  className="block w-full px-3 py-2 mt-2 bg-school-orange text-white rounded-md hover:bg-orange-600 text-center font-medium"
                >
                  Join Now
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 mt-2 text-gray-700 hover:text-school-blue"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate("/");
                  }}
                  className="block w-full px-3 py-2 mt-2 text-left text-gray-700 hover:text-school-blue"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
