import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthInput from './AuthInput';
import Button from './Button';
import logo from '../assets/logo.png';

const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleClose = () => {
    onClose();
    // Navigate to home when modal is closed (via X or overlay click)
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Navigate directly to dashboard on success
      navigate('/alumni/dashboard');
    }, 1000);
  };

  const handleSwitchToRegister = () => {
    onClose();
    setTimeout(() => {
      onSwitchToRegister();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Background Overlay */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl relative w-full max-w-md overflow-hidden"
            >
              {/* Logo Section */}
              <div className="bg-gradient-to-r from-school-blue to-blue-600 px-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block"
                >
                    <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4 overflow-hidden p-2">
                      <img 
                        src={logo} 
                        alt="KSE Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                  <p className="text-blue-100 text-sm">Sign in to continue</p>
                </motion.div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Form Content */}
              <div className="p-6 md:p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    error={errors.email}
                  />

                  <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    error={errors.password}
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-school-blue border-gray-300 rounded focus:ring-school-blue focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-school-blue hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      'Login'
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-gray-600 text-sm">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={handleSwitchToRegister}
                        className="text-school-orange hover:text-orange-600 font-semibold transition-colors"
                      >
                        Register here
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
