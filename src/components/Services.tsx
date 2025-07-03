import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import {
  Heart,
  Gift,
  Briefcase,
  Users,
  Cake,
  Star,
  CheckCircle,
} from 'lucide-react';

const services = [
  {
    id: 'weddings',
    icon: Heart,
    title: 'Weddings',
    description: 'Complete wedding planning from intimate',
    features: ['Bridal decoration', 'Venue setup', 'Catering services', 'Photography'],
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹2,50,000',
  },
  {
    id: 'engagements',
    icon: Gift,
    title: 'Engagements',
    description: 'Romantic and memorable engagement celebrations',
    features: ['Ring ceremony setup', 'Floral arrangements', 'Music & entertainment', 'Custom themes'],
    image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹80,000',
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Professional corporate gatherings and conferences',
    features: ['Conference setup', 'Audio/visual equipment', 'Catering', 'Event coordination'],
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹1,20,000',
  },
  {
    id: 'family-functions',
    icon: Users,
    title: 'Family Functions',
    description: 'Traditional ceremonies like Tilak, Haldi, and family gatherings',
    features: ['Traditional decor', 'Cultural arrangements', 'Custom catering', 'Photography'],
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹60,000',
  },
  {
    id: 'birthday-parties',
    icon: Cake,
    title: 'Birthday Parties',
    description: 'Fun and memorable birthday celebrations for all ages',
    features: ['Theme decorations', 'Entertainment', 'Custom cakes', 'Party favors'],
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹40,000',
  },
  {
    id: 'special-occasions',
    icon: Star,
    title: 'Special Occasions',
    description: 'Anniversaries, graduations, and milestone celebrations',
    features: ['Custom themes', 'Personalized decor', 'Catering options', 'Memory keepsakes'],
    image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 'From ₹50,000',
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-purple-800 dark:text-white mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We specialize in creating unforgettable experiences for every occasion. Choose from our wide range of event services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] overflow-hidden group border border-purple-100 dark:border-gray-700"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-full p-3 shadow-lg">
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-purple-700 dark:text-purple-400">{service.price}</span>
                    <Link
                      to={`/services/${service.id}`}
                      className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-400 text-sm font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>

                  <Link
                    to={`/booking?service=${service.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-600 transition-colors duration-300 text-center block font-medium"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
