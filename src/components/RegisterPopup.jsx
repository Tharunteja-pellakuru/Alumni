import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthInput from './AuthInput';
import Button from './Button';
import logo from '../assets/logo.png';

const RegisterPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    batch: '',
    department: '',
    profession: '',
    city: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Generate batch years (2015-2023)
  const batchYears = Array.from({ length: 9 }, (_, i) => (2023 - i).toString());

  // Departments list
  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Business',
    'Arts',
    'Science',
    'Commerce',
  ];

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

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.batch) {
      newErrors.batch = 'Batch year is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => {
        onClose();
        navigate('/alumni/dashboard');
      }, 1500);
    }, 1000);
  };

  const handleSwitchToLogin = () => {
    onClose();
    setTimeout(() => {
      onSwitchToLogin();
    }, 300);
  };

  return (
    <>
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
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
                className="bg-white rounded-2xl shadow-2xl relative w-full max-w-md my-8 flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                {/* Logo Section - Fixed at top */}
                <div className="bg-gradient-to-r from-school-blue to-blue-600 px-6 py-8 text-center relative flex-shrink-0 rounded-t-2xl">
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
                    <h2 className="text-2xl font-bold text-white mb-1">Join Our Network</h2>
                    <p className="text-blue-100 text-sm">Create your alumni account</p>
                  </motion.div>
                  
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
                </div>

                {/* Form Content - Scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <AuthInput
                      label="Full Name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      error={errors.fullName}
                    />

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
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      error={errors.phone}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AuthInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                        error={errors.password}
                      />

                      <AuthInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                        error={errors.confirmPassword}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Batch Year <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <select
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors ${
                              errors.batch
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-school-blue'
                            }`}
                          >
                            <option value="">Select Batch Year</option>
                            {batchYears.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.batch && (
                          <p className="mt-1 text-sm text-red-500">{errors.batch}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors ${
                              errors.department
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-school-blue'
                            }`}
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.department && (
                          <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                        )}
                      </div>
                    </div>

                    <AuthInput
                      label="Profession / Designation"
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      placeholder="e.g., Software Engineer"
                      error={errors.profession}
                    />

                    <AuthInput
                      label="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      error={errors.city}
                    />

                    <div>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-school-blue border-gray-300 rounded focus:ring-school-blue focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I agree to the{' '}
                          <button
                            type="button"
                            className="text-school-blue hover:text-blue-700 font-medium transition-colors"
                          >
                            Terms & Conditions
                          </button>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                      )}
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
                          Creating Account...
                        </span>
                      ) : (
                        'Register'
                      )}
                    </Button>

                    <div className="text-center pt-2">
                      <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={handleSwitchToLogin}
                          className="text-school-orange hover:text-orange-600 font-semibold transition-colors"
                        >
                          Login here
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

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-[60] flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Account created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegisterPopup;
