import Gallery from '../components/Gallery';

const GalleryPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Event Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our stunning collection of events we've planned and executed. Each image tells a story of joy, celebration, and unforgettable memories.
          </p>
        </div>
      </div>
      <Gallery />
    </div>
  );
};

export default GalleryPage;