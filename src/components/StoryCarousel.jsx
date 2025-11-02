import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryCarousel = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-80 bg-white rounded-lg shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-8 flex flex-col md:flex-row items-center"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center text-4xl md:text-5xl font-bold text-white mb-4 md:mb-0 md:mr-8 flex-shrink-0">
              {stories[currentIndex].name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl text-gray-700 italic mb-4">
                "{stories[currentIndex].quote}"
              </p>
              <div className="space-y-1">
                <p className="font-semibold text-school-blue text-lg">
                  {stories[currentIndex].name}
                </p>
                <p className="text-gray-600">
                  Batch {stories[currentIndex].batch} • {stories[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-school-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-school-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-school-orange' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryCarousel;

