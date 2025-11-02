import { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import FeaturedAlumniCard from "../components/FeaturedAlumniCard";
import EventCard from "../components/EventCard";
import EventRegisterPopup from "../components/EventRegisterPopup";
import StoryCarousel from "../components/StoryCarousel";
import GalleryGrid from "../components/GalleryGrid";
import {
  featuredAlumni,
  upcomingEvents,
  alumniStories,
  galleryImages,
} from "../data/dummyData";
import schoolImage from "../assets/School Image.jpg";

const Home = () => {
  const { openRegister } = useModal();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[420px] md:h-[560px] lg:h-[700px] xl:h-[760px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${schoolImage})`,
            filter: "blur(2px) brightness(0.9)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-school-blue mb-6">
            Welcome to Kakatiya School of Excellence Alumni Portal
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white mb-8 font-medium">
            Connecting our esteemed alumni to their alma mater and to each
            other.
          </p>
          <button
            onClick={openRegister}
            className="inline-block px-8 py-4 bg-school-orange text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            Join the Alumni Network
          </button>
        </div>
      </section>

      {/* Alumni Portal Features Section */}
      <section className="relative -mt-24 md:-mt-32 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Alumni Directory */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border-2 border-school-orange rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-school-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-school-blue mb-3">
                  Alumni Directory
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore the profiles of notable alumni and reconnect with your
                  classmates.
                </p>
              </div>

              {/* Upcoming Events */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border-2 border-school-orange rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-school-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-school-blue mb-3">
                  Upcoming Events
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stay informed about upcoming recitations, networking events,
                  and more.
                </p>
              </div>

              {/* Alumni Stories */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border-2 border-school-orange rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-school-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-school-blue mb-3">
                  Alumni Stories
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Read engaging stories and updates from our distinguished
                  alumni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Kakatiya School of Excellence Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-school-blue mb-6">
                About Kakatiya School of Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kakatiya School of Excellence has been a beacon of quality
                education, nurturing students to excel in their chosen fields.
                Our alumni network represents the success stories of our
                institution, connecting graduates across generations and
                professions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through this portal, we aim to strengthen the bond between our
                esteemed alumni and their alma mater, fostering a community that
                continues to grow, learn, and contribute to society together.
              </p>
            </div>

            {/* Right: Building Image */}
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={schoolImage}
                  alt="Kakatiya School of Excellence"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-school-blue">
            Featured Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 text-center">
                  {/* Circular Profile Picture */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-school-blue to-blue-600 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {alumni.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-school-blue mb-2">
                    {alumni.name.split(" ")[0]}{" "}
                    {alumni.name.split(" ")[1]?.charAt(0)}.
                  </h3>

                  {/* Batch */}
                  <p className="text-gray-600 text-sm mb-2">
                    {alumni.batch} | Batch
                  </p>

                  {/* Role/Profession */}
                  <p className="text-gray-600 text-sm">{alumni.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Upcoming Events
            </h2>
            <Link
              to="/events"
              className="text-school-blue hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 3).map((event) => (
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
        </div>
      </section>

      {/* Alumni Stories Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Alumni Stories
          </h2>
          <StoryCarousel stories={alumniStories} />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Gallery
            </h2>
            <Link
              to="/gallery"
              className="text-school-blue hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <GalleryGrid images={galleryImages.slice(0, 6)} />
        </div>
      </section>

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

export default Home;
