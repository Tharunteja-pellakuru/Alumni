import { motion } from 'framer-motion';

const EventCard = ({ event, isPast = false, onRegister }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-40 md:h-48 bg-gradient-to-r from-school-orange to-orange-400 flex items-center justify-center">
        <div className="text-white text-5xl md:text-6xl font-bold opacity-20">
          {new Date(event.date).getDate()}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-school-orange">
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          {isPast && (
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
              Past Event
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {event.time}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {event.location}
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        {!isPast && (
          <button 
            onClick={() => onRegister && onRegister(event)}
            className="w-full bg-school-orange text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Register
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;

