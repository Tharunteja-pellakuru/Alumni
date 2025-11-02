import { useState } from "react";
import EventCard from "../components/EventCard";
import EventRegisterPopup from "../components/EventRegisterPopup";
import { upcomingEvents, pastEvents } from "../data/dummyData";

const Events = () => {
  const [showPast, setShowPast] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Alumni Events
        </h1>

        {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setShowPast(false)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                !showPast
                  ? "bg-school-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                showPast
                  ? "bg-school-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {!showPast ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={(event) => {
                      setSelectedEvent(event);
                      setIsRegisterOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No upcoming events at the moment.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Past Events
            </h2>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No past events to display.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Registration Popup */}
      <EventRegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;
