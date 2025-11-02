import { motion } from 'framer-motion';

const FeaturedAlumniCard = ({ alumni }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-48 bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-school-blue">
          {alumni.name.charAt(0)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{alumni.name}</h3>
        <p className="text-school-blue font-medium mb-2">Batch {alumni.batch}</p>
        <p className="text-gray-600">{alumni.profession}</p>
      </div>
    </motion.div>
  );
};

export default FeaturedAlumniCard;

