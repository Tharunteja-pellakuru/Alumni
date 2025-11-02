import { useState } from 'react';
import { motion } from 'framer-motion';
import { alumniStories } from '../data/dummyData';

const Stories = () => {
  const [expandedStory, setExpandedStory] = useState(null);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Alumni Success Stories
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover inspiring journeys of our alumni who are making a difference in their fields
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {alumniStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                    {story.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {story.name}
                    </h3>
                    <p className="text-school-blue font-medium">
                      Batch {story.batch}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {story.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{expandedStory === story.id ? story.quote : `${story.quote.substring(0, 150)}...`}"
                </p>
                <button
                  onClick={() =>
                    setExpandedStory(expandedStory === story.id ? null : story.id)
                  }
                  className="text-school-orange hover:text-orange-600 font-medium text-sm"
                >
                  {expandedStory === story.id ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;

