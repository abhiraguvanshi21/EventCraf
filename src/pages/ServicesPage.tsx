import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of event planning services. From intimate gatherings to grand celebrations, we create unforgettable experiences tailored to your vision.
          </p>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default ServicesPage;