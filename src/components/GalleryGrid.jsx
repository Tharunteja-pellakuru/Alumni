import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImage(image)}
          >
            <div className="w-full h-64 bg-gradient-to-br from-school-blue to-school-orange flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-30">
                {index + 1}
              </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-96 bg-gradient-to-br from-school-blue to-school-orange rounded-lg">
                <div className="text-white text-9xl font-bold opacity-30 flex items-center justify-center h-full">
                  {images.indexOf(selectedImage) + 1}
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;

