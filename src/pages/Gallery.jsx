import GalleryGrid from '../components/GalleryGrid';
import { galleryImages } from '../data/dummyData';

const Gallery = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Event Gallery
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Relive the memorable moments from our alumni events and gatherings
        </p>
        <GalleryGrid images={galleryImages} />
      </div>
    </div>
  );
};

export default Gallery;

