import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthInput from './AuthInput';
import Button from './Button';
import logo from '../assets/logo.png';

const EventRegisterPopup = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batch: '',
    numberOfGuests: '1',
    specialRequests: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Generate batch years (2015-2023)
  const batchYears = Array.from({ length: 9 }, (_, i) => (2023 - i).toString());

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

  // Reset form when modal opens/closes or event changes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        batch: '',
        numberOfGuests: '1',
        specialRequests: '',
        agreeToTerms: false,
      });
      setErrors({});
    }
  }, [isOpen, event]);

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

    if (!formData.batch) {
      newErrors.batch = 'Batch year is required';
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
        handleClose();
      }, 2000);
    }, 1000);
  };

  if (!event) return null;

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
                    <h2 className="text-2xl font-bold text-white mb-2">Register for Event</h2>
                    <p className="text-blue-100 text-sm">{event.title}</p>
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

                {/* Event Details */}
                <div className="px-6 pt-4 pb-2 bg-blue-50 border-b border-blue-100">
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-school-blue">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })} • {event.time}
                    </p>
                    <p className="flex items-center text-school-blue">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Form Content - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 280px)' }}>
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
                          Number of Guests
                        </label>
                        <select
                          name="numberOfGuests"
                          value={formData.numberOfGuests}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Any dietary restrictions or special accommodations..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="flex items-start">
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
                          Registering...
                        </span>
                      ) : (
                        'Register for Event'
                      )}
                    </Button>
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
            <span className="font-semibold">Successfully registered for the event!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventRegisterPopup;

