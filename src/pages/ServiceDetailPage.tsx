import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Calendar, Users, DollarSign, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const serviceDetails = {
  weddings: {
    title: 'Wedding Planning Services',
    subtitle: 'Creating Your Perfect Dream Wedding',
    description: 'Transform your special day into an unforgettable celebration with our comprehensive wedding planning services. From intimate ceremonies to grand celebrations, we handle every detail with precision and care.',
    longDescription: 'Our wedding planning service is designed to make your dream wedding a reality. We understand that your wedding day is one of the most important days of your life, and we are committed to making it perfect. Our experienced team works closely with you to understand your vision, preferences, and budget to create a personalized wedding experience that reflects your unique love story.',
    price: 'From ₹2,50,000',
    duration: '6-12 months planning',
    capacity: '50-500 guests',
    images: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Complete wedding planning and coordination',
      'Venue selection and booking',
      'Vendor management and coordination',
      'Bridal decoration and floral arrangements',
      'Catering and menu planning',
      'Photography and videography',
      'Entertainment and music coordination',
      'Guest accommodation assistance',
      'Transportation arrangements',
      'Day-of coordination and management'
    ],
    packages: [
      {
        name: 'Essential Wedding',
        price: '₹2,50,000',
        features: ['Basic decoration', 'Standard catering', 'Photography', 'Music system', 'Day coordination']
      },
      {
        name: 'Premium Wedding',
        price: '₹4,50,000',
        features: ['Premium decoration', 'Multi-cuisine catering', 'Professional photography & videography', 'Live entertainment', 'Full planning service']
      },
      {
        name: 'Luxury Wedding',
        price: '₹8,00,000',
        features: ['Luxury decoration', 'Gourmet catering', 'Cinematic photography', 'Celebrity entertainment', 'Complete concierge service']
      }
    ],
    reviews: [
      {
        name: 'Sarah & Michael Johnson',
        rating: 5,
        comment: 'EventCraft made our wedding absolutely perfect! Every detail was flawlessly executed. The team was professional, creative, and went above and beyond our expectations.',
        date: 'June 2024',
        image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Priya & Raj Sharma',
        rating: 5,
        comment: 'Amazing service! They understood our cultural requirements perfectly and created a beautiful traditional wedding. Highly recommended!',
        date: 'May 2024',
        image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Emily & David Chen',
        rating: 5,
        comment: 'Professional, creative, and stress-free planning. Our wedding was everything we dreamed of and more. Thank you EventCraft!',
        date: 'April 2024',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  },
  engagements: {
    title: 'Engagement Ceremony Planning',
    subtitle: 'Celebrate Your Love Story',
    description: 'Mark the beginning of your journey together with a beautiful engagement ceremony. We create romantic and memorable celebrations that reflect your unique love story.',
    longDescription: 'Our engagement planning service focuses on creating intimate and romantic celebrations that mark this special milestone in your relationship. Whether you prefer a traditional ring ceremony or a modern celebration, we work with you to design an event that captures the essence of your love story and creates lasting memories for you and your loved ones.',
    price: 'From ₹80,000',
    duration: '2-4 months planning',
    capacity: '30-200 guests',
    images: [
      'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Ring ceremony coordination',
      'Romantic venue decoration',
      'Floral arrangements and centerpieces',
      'Photography and videography',
      'Catering and refreshments',
      'Music and entertainment',
      'Guest coordination',
      'Traditional ceremony elements',
      'Custom themes and styling',
      'Gift coordination'
    ],
    packages: [
      {
        name: 'Intimate Engagement',
        price: '₹80,000',
        features: ['Basic decoration', 'Light refreshments', 'Photography', 'Music system', 'Coordination']
      },
      {
        name: 'Traditional Engagement',
        price: '₹1,50,000',
        features: ['Traditional decoration', 'Full catering', 'Professional photography', 'Cultural entertainment', 'Complete planning']
      },
      {
        name: 'Grand Engagement',
        price: '₹2,50,000',
        features: ['Luxury decoration', 'Premium catering', 'Cinematic coverage', 'Live entertainment', 'Full-service planning']
      }
    ],
    reviews: [
      {
        name: 'Priya & Arjun',
        rating: 5,
        comment: 'Beautiful engagement ceremony! The decoration was stunning and everything was perfectly organized. Our families were so impressed.',
        date: 'July 2024',
        image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Neha & Vikram',
        rating: 5,
        comment: 'EventCraft made our engagement so special. The attention to detail and cultural sensitivity was outstanding.',
        date: 'June 2024',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  },
  corporate: {
    title: 'Corporate Event Management',
    subtitle: 'Professional Business Events',
    description: 'Elevate your business events with our professional corporate event management services. From conferences to product launches, we ensure your corporate events make a lasting impression.',
    longDescription: 'Our corporate event management service is designed to help businesses create impactful and professional events that achieve their objectives. Whether you\'re planning a conference, product launch, team building event, or corporate celebration, we have the expertise and resources to deliver exceptional results that reflect your brand values and engage your audience.',
    price: 'From ₹1,20,000',
    duration: '1-6 months planning',
    capacity: '20-1000 attendees',
    images: [
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181407/pexels-photo-1181407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Conference and seminar planning',
      'Product launch events',
      'Corporate parties and celebrations',
      'Team building activities',
      'Award ceremonies',
      'Audio-visual equipment setup',
      'Professional staging and lighting',
      'Catering and hospitality',
      'Registration and guest management',
      'Brand integration and marketing'
    ],
    packages: [
      {
        name: 'Business Meeting',
        price: '₹1,20,000',
        features: ['Basic AV setup', 'Light refreshments', 'Registration desk', 'Basic coordination']
      },
      {
        name: 'Corporate Conference',
        price: '₹2,50,000',
        features: ['Professional AV', 'Full catering', 'Stage setup', 'Complete event management']
      },
      {
        name: 'Premium Corporate Event',
        price: '₹5,00,000',
        features: ['High-end AV', 'Gourmet catering', 'Custom staging', 'Full-service event production']
      }
    ],
    reviews: [
      {
        name: 'David Chen - Tech Corp',
        rating: 5,
        comment: 'Outstanding corporate event management! Our product launch was flawless and professional. Highly recommend EventCraft for business events.',
        date: 'August 2024',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Sarah Williams - Marketing Director',
        rating: 5,
        comment: 'Professional service from start to finish. Our annual conference was a huge success thanks to EventCraft\'s expertise.',
        date: 'July 2024',
        image: 'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  },
  'family-functions': {
    title: 'Family Function Planning',
    subtitle: 'Traditional Ceremonies & Family Gatherings',
    description: 'Celebrate your family traditions with our specialized family function planning services. From Tilak and Haldi ceremonies to family reunions, we honor your customs with care.',
    longDescription: 'Our family function planning service specializes in traditional ceremonies and family gatherings that honor your cultural heritage. We understand the importance of family traditions and work closely with you to ensure every ritual and custom is respected and beautifully presented. Our team has extensive experience in organizing various cultural ceremonies and family celebrations.',
    price: 'From ₹60,000',
    duration: '1-3 months planning',
    capacity: '20-300 guests',
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/587742/pexels-photo-587742.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Traditional ceremony planning',
      'Cultural decoration and setup',
      'Religious ritual coordination',
      'Traditional catering and menu',
      'Family photography',
      'Cultural entertainment',
      'Guest accommodation assistance',
      'Traditional attire coordination',
      'Priest and pandit arrangements',
      'Custom ceremony elements'
    ],
    packages: [
      {
        name: 'Simple Family Function',
        price: '₹60,000',
        features: ['Basic traditional decoration', 'Simple catering', 'Photography', 'Basic coordination']
      },
      {
        name: 'Traditional Ceremony',
        price: '₹1,20,000',
        features: ['Complete traditional setup', 'Full catering', 'Professional photography', 'Cultural entertainment']
      },
      {
        name: 'Grand Family Celebration',
        price: '₹2,00,000',
        features: ['Luxury traditional decoration', 'Premium catering', 'Complete documentation', 'Full-service planning']
      }
    ],
    reviews: [
      {
        name: 'Sunita Patel',
        rating: 5,
        comment: 'Perfect Tilak ceremony! EventCraft understood all our traditions and executed everything beautifully. Our family was so happy.',
        date: 'September 2024',
        image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Rajesh Kumar',
        rating: 5,
        comment: 'Excellent service for our Haldi ceremony. They respected all our customs and made it a memorable celebration.',
        date: 'August 2024',
        image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  },
  'birthday-parties': {
    title: 'Birthday Party Planning',
    subtitle: 'Memorable Birthday Celebrations',
    description: 'Create magical birthday memories with our comprehensive party planning services. From kids\' themed parties to elegant adult celebrations, we make every birthday special.',
    longDescription: 'Our birthday party planning service is designed to create unforgettable celebrations for all ages. Whether you\'re planning a fun-filled children\'s party with themes and entertainment or an elegant adult celebration, we handle every detail to ensure your special day is perfect. We offer creative themes, entertainment options, and personalized touches that make each birthday unique.',
    price: 'From ₹40,000',
    duration: '2-8 weeks planning',
    capacity: '10-150 guests',
    images: [
      'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1616114/pexels-photo-1616114.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Theme-based decoration',
      'Custom birthday cakes',
      'Entertainment and activities',
      'Party favors and gifts',
      'Photography and videography',
      'Balloon decorations',
      'Games and competitions',
      'Catering and refreshments',
      'Music and DJ services',
      'Party coordination'
    ],
    packages: [
      {
        name: 'Kids Birthday Party',
        price: '₹40,000',
        features: ['Theme decoration', 'Entertainment', 'Custom cake', 'Party favors', 'Photography']
      },
      {
        name: 'Teen Birthday Bash',
        price: '₹75,000',
        features: ['Modern decoration', 'DJ and music', 'Catering', 'Games', 'Professional photography']
      },
      {
        name: 'Adult Birthday Celebration',
        price: '₹1,20,000',
        features: ['Elegant decoration', 'Premium catering', 'Live entertainment', 'Bar service', 'Complete planning']
      }
    ],
    reviews: [
      {
        name: 'Meera Gupta',
        rating: 5,
        comment: 'Amazing birthday party for my daughter! The superhero theme was perfect and all the kids had a blast. Thank you EventCraft!',
        date: 'October 2024',
        image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Amit Sharma',
        rating: 5,
        comment: 'Fantastic adult birthday celebration! The decoration was elegant and the food was excellent. Highly recommended!',
        date: 'September 2024',
        image: 'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  },
  'special-occasions': {
    title: 'Special Occasion Planning',
    subtitle: 'Milestone Celebrations & Anniversaries',
    description: 'Commemorate life\'s special moments with our tailored occasion planning services. From anniversaries to graduations, we make every milestone memorable.',
    longDescription: 'Our special occasion planning service is dedicated to celebrating life\'s important milestones and achievements. Whether you\'re commemorating a wedding anniversary, graduation, retirement, or any other special moment, we create personalized celebrations that honor the significance of the occasion and create lasting memories for you and your loved ones.',
    price: 'From ₹50,000',
    duration: '2-6 weeks planning',
    capacity: '15-200 guests',
    images: [
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/587742/pexels-photo-587742.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: [
      'Anniversary celebrations',
      'Graduation parties',
      'Retirement celebrations',
      'Achievement awards',
      'Milestone birthdays',
      'Custom themes and decoration',
      'Memory displays and photo walls',
      'Personalized catering',
      'Entertainment coordination',
      'Keepsake creation'
    ],
    packages: [
      {
        name: 'Intimate Celebration',
        price: '₹50,000',
        features: ['Simple decoration', 'Light refreshments', 'Photography', 'Basic coordination']
      },
      {
        name: 'Milestone Celebration',
        price: '₹1,00,000',
        features: ['Themed decoration', 'Full catering', 'Entertainment', 'Professional photography']
      },
      {
        name: 'Grand Anniversary',
        price: '₹1,80,000',
        features: ['Luxury decoration', 'Premium catering', 'Live entertainment', 'Complete celebration planning']
      }
    ],
    reviews: [
      {
        name: 'Mr. & Mrs. Agarwal',
        rating: 5,
        comment: 'Beautiful 25th anniversary celebration! EventCraft made our silver jubilee so special with perfect decoration and arrangements.',
        date: 'November 2024',
        image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        name: 'Ravi Mehta',
        rating: 5,
        comment: 'Excellent graduation party planning! Everything was perfect and our family was so proud. Thank you for making it memorable!',
        date: 'October 2024',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ]
  }
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(0);

  const service = serviceDetails[serviceId as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <Link to="/services" className="text-purple-600 hover:text-purple-700">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Services
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <p className="text-xl text-purple-600 font-semibold mb-4">{service.subtitle}</p>
              <p className="text-lg text-gray-600 mb-6">{service.description}</p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600">{service.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-600">{service.capacity}</span>
                </div>
              </div>
              
              <Link
                to={`/booking?service=${serviceId}`}
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 inline-block"
              >
                Book This Service
              </Link>
            </div>
            
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={service.images[currentImageIndex]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{service.longDescription}</p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Packages */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Packages</h3>
              <div className="space-y-4">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedPackage === index
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedPackage(index)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{pkg.name}</h4>
                      <span className="text-xl font-bold text-purple-600">{pkg.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <Link
                to={`/booking?service=${serviceId}&package=${selectedPackage}`}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-center block font-semibold mt-6"
              >
                Book Selected Package
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Client Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 text-amber-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's create an unforgettable experience for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/booking?service=${serviceId}`}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;