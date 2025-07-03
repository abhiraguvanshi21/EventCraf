import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start planning your dream event? Get in touch with our expert team and let's create something magical together.
          </p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;