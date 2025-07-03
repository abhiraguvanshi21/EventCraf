import Vendors from '../components/Vendors';

const VendorsPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Trusted Vendors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our carefully selected network of professional vendors who help bring your events to life with excellence and reliability.
          </p>
        </div>
      </div>
      <Vendors />
    </div>
  );
};

export default VendorsPage;