import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allAlumni } from '../data/dummyData';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  // Get unique batch years
  const batchYears = [...new Set(allAlumni.map((a) => a.batch))].sort().reverse();

  // Filter alumni
  const filteredAlumni = allAlumni.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = !batchFilter || alumni.batch === batchFilter;
    return matchesSearch && matchesBatch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Alumni Directory
        </h1>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name or Profession
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Batch Year
              </label>
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-school-blue focus:border-transparent"
              >
                <option value="">All Batches</option>
                {batchYears.map((year) => (
                  <option key={year} value={year}>
                    Batch {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredAlumni.length} alumni member{filteredAlumni.length !== 1 ? 's' : ''}
        </p>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <motion.div
              key={alumni.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-48 bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-school-blue">
                  {alumni.name.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{alumni.name}</h3>
                <p className="text-school-blue font-medium mb-2">Batch {alumni.batch}</p>
                <p className="text-gray-600 mb-4">{alumni.profession}</p>
                <button
                  onClick={() => setSelectedAlumni(alumni)}
                  className="w-full bg-school-orange text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedAlumni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlumni(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold text-school-blue">
                    {selectedAlumni.name.charAt(0)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedAlumni.name}</h2>
                <div className="space-y-3 mb-6">
                  <p className="text-school-blue font-semibold text-lg">Batch {selectedAlumni.batch}</p>
                  <p className="text-gray-700">
                    <strong>Profession:</strong> {selectedAlumni.profession}
                  </p>
                  <p className="text-gray-700">
                    <strong>Company:</strong> {selectedAlumni.company}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {selectedAlumni.city}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
                  <p className="text-gray-600">{selectedAlumni.bio}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Directory;

