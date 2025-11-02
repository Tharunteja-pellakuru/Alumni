import { useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    profession: '',
    city: '',
    bio: '',
    photo: null,
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setFormData({
        name: '',
        email: '',
        batch: '',
        profession: '',
        city: '',
        bio: '',
        photo: null,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Join the Alumni Network
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Register yourself and connect with fellow alumni
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
                placeholder="e.g., 2010"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profession <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-school-orange text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-semibold text-lg"
          >
            Submit Registration
          </button>
        </motion.form>

        {/* Success Toast */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Registration submitted successfully!</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Register;

