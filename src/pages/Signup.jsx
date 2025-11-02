import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    batch: '',
    profession: '',
    city: '',
    role: 'Alumni',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Generate batch years (2015-2023)
  const batchYears = Array.from({ length: 9 }, (_, i) => (2023 - i).toString());

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!formData.profession.trim()) {
      newErrors.profession = 'Profession is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      
      // Redirect to dashboard after showing toast
      setTimeout(() => {
        navigate('/alumni/dashboard');
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <AuthLayout
        title="Join the KSE Alumni Network"
        description="Create your account and reconnect with your alma mater"
      >
        <form onSubmit={handleSignup} className="space-y-6 py-8">
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
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            error={errors.email}
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
              placeholder="Confirm your password"
              required
              error={errors.confirmPassword}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Year <span className="text-red-500">*</span>
              </label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors ${
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
              {errors.batch && (
                <p className="mt-1 text-sm text-red-500">{errors.batch}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent transition-colors"
              >
                <option value="Alumni">Alumni</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <AuthInput
            label="Profession / Designation"
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
            required
            error={errors.profession}
          />

          <AuthInput
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
            error={errors.city}
          />

          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-school-blue border-gray-300 rounded focus:ring-school-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-school-blue hover:text-blue-700 font-medium">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-school-orange hover:text-orange-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </AuthLayout>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Account created successfully! Redirecting...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Signup;

