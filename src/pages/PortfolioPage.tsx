import { useState } from 'react';
import { Eye, Calendar, Users, MapPin, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  date: string;
  location: string;
  guests: number;
  budget: string;
  description: string;
  images: string[];
  features: string[];
  testimonial: string;
  rating: number;
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', 'Weddings', 'Corporate', 'Engagements', 'Birthday Parties', 'Cultural Events'];

  const projects = [
    {
      id: 1,
      title: 'Royal Garden Wedding',
      category: 'Weddings',
      client: 'Sarah & Michael',
      date: 'June 2024',
      location: 'Mumbai, India',
      guests: 300,
      budget: '₹8,00,000',
      description: 'A breathtaking outdoor wedding celebration featuring elegant floral arrangements, traditional ceremonies, and modern touches. The couple wanted a perfect blend of Indian traditions with contemporary style.',
      images: [
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Traditional Mandap', 'Floral Decorations', 'Live Music', 'Gourmet Catering', 'Photography & Videography'],
      testimonial: 'EventCraft made our dream wedding come true! Every detail was perfect.',
      rating: 5
    },
    {
      id: 2,
      title: 'Tech Summit 2024',
      category: 'Corporate',
      client: 'TechCorp Industries',
      date: 'August 2024',
      location: 'Bangalore, India',
      guests: 500,
      budget: '₹12,00,000',
      description: 'A cutting-edge corporate summit featuring keynote speakers, interactive workshops, and networking sessions. The event showcased the latest in technology with immersive experiences.',
      images: [
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181407/pexels-photo-1181407.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Professional AV Setup', 'Interactive Displays', 'Networking Zones', 'Premium Catering', 'Live Streaming'],
      testimonial: 'Outstanding event management! Our summit was a huge success.',
      rating: 5
    },
    {
      id: 3,
      title: 'Romantic Engagement Ceremony',
      category: 'Engagements',
      client: 'Priya & Arjun',
      date: 'September 2024',
      location: 'Delhi, India',
      guests: 150,
      budget: '₹3,50,000',
      description: 'An intimate engagement celebration with traditional rituals and modern elegance. The event featured beautiful floral arrangements and a romantic ambiance.',
      images: [
        'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Ring Ceremony Setup', 'Floral Decorations', 'Traditional Music', 'Photography', 'Family Coordination'],
      testimonial: 'Perfect engagement ceremony! Everything was beautifully arranged.',
      rating: 5
    },
    {
      id: 4,
      title: 'Princess Birthday Celebration',
      category: 'Birthday Parties',
      client: 'The Sharma Family',
      date: 'October 2024',
      location: 'Pune, India',
      guests: 80,
      budget: '₹1,50,000',
      description: 'A magical princess-themed birthday party for a 7-year-old with enchanting decorations, entertainment, and activities that made every child feel like royalty.',
      images: [
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Princess Theme Decor', 'Entertainment Shows', 'Custom Cake', 'Party Games', 'Photo Booth'],
      testimonial: 'Our daughter had the most magical birthday ever! Thank you EventCraft!',
      rating: 5
    },
    {
      id: 5,
      title: 'Traditional Haldi Ceremony',
      category: 'Cultural Events',
      client: 'The Patel Family',
      date: 'November 2024',
      location: 'Ahmedabad, India',
      guests: 200,
      budget: '₹2,50,000',
      description: 'A vibrant and colorful Haldi ceremony celebrating traditional customs with authentic decorations, music, and festivities that honored cultural heritage.',
      images: [
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Traditional Decorations', 'Cultural Music', 'Authentic Catering', 'Ritual Coordination', 'Photography'],
      testimonial: 'Beautifully organized Haldi ceremony with perfect attention to traditions.',
      rating: 5
    },
    {
      id: 6,
      title: 'Silver Anniversary Celebration',
      category: 'Cultural Events',
      client: 'Mr. & Mrs. Agarwal',
      date: 'December 2024',
      location: 'Jaipur, India',
      guests: 120,
      budget: '₹4,00,000',
      description: 'A sophisticated 25th anniversary celebration honoring a couple\'s journey with elegant silver-themed decorations and heartfelt moments.',
      images: [
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      features: ['Silver Theme Decor', 'Memory Lane Display', 'Live Music', 'Gourmet Dinner', 'Anniversary Video'],
      testimonial: 'A perfect celebration of our 25 years together. Absolutely wonderful!',
      rating: 5
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of extraordinary events. Each project represents our commitment to excellence and our passion for creating unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-200">{project.client}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <div className="flex items-center">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {project.guests} guests
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold">{project.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto w-full">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                <p className="text-purple-600 font-medium">{selectedProject.category} • {selectedProject.client}</p>
              </div>
              <button
                onClick={closeProjectModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {selectedProject.images.length > 1 && (
                      <>
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
                      </>
                    )}
                  </div>
                  
                  {selectedProject.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProject.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProject.title} ${index + 1}`}
                          className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                            index === currentImageIndex ? 'ring-2 ring-purple-500' : 'hover:opacity-80'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Project Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Date</span>
                      <p className="text-gray-900 font-medium">{selectedProject.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location</span>
                      <p className="text-gray-900 font-medium">{selectedProject.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Guests</span>
                      <p className="text-gray-900 font-medium">{selectedProject.guests}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Budget</span>
                      <p className="text-gray-900 font-medium">{selectedProject.budget}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Client Testimonial</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(selectedProject.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{selectedProject.testimonial}"</p>
                    <p className="text-sm text-gray-500 mt-2">- {selectedProject.client}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Own Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's work together to create an extraordinary event that will be remembered for years to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Your Project
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;