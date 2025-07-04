import { useState } from 'react';
import { Star, Quote, Calendar, Heart, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const featuredTestimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      event: 'Dream Wedding',
      rating: 5,
      date: 'June 2024',
      image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'EventCraft made our wedding day absolutely perfect! From the initial consultation to the last dance, every detail was flawlessly executed. Their team\'s creativity, professionalism, and attention to detail exceeded all our expectations. We couldn\'t have asked for a better experience.',
      location: 'Mumbai, India',
      eventType: 'Wedding'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      event: 'Traditional Engagement',
      rating: 5,
      date: 'May 2024',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'The attention to detail and cultural sensitivity for our traditional engagement was outstanding. EventCraft understood our vision perfectly and brought it to life beautifully. Every ritual was honored with respect and elegance.',
      location: 'Delhi, India',
      eventType: 'Engagement'
    },
    {
      id: 3,
      name: 'David Chen',
      event: 'Corporate Product Launch',
      rating: 5,
      date: 'April 2024',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Professional, efficient, and creative. EventCraft handled our product launch event with such professionalism. The setup was stunning and everything ran smoothly. Our clients were thoroughly impressed.',
      location: 'Bangalore, India',
      eventType: 'Corporate Event'
    }
  ];

  const allTestimonials = [
    ...featuredTestimonials,
    {
      id: 4,
      name: 'Meera Gupta',
      event: 'Princess Birthday Party',
      rating: 5,
      date: 'October 2024',
      image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Amazing birthday party for my daughter! The superhero theme was perfect and all the kids had a blast. The attention to detail was incredible.',
      location: 'Pune, India',
      eventType: 'Birthday Party'
    },
    {
      id: 5,
      name: 'Rajesh Kumar',
      event: 'Haldi Ceremony',
      rating: 5,
      date: 'August 2024',
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Excellent service for our Haldi ceremony. They respected all our customs and made it a memorable celebration for our entire family.',
      location: 'Ahmedabad, India',
      eventType: 'Cultural Event'
    },
    {
      id: 6,
      name: 'Emily & James Wilson',
      event: 'Destination Wedding',
      rating: 5,
      date: 'September 2024',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Our destination wedding was a dream come true! EventCraft coordinated everything perfectly, from guest accommodations to the ceremony setup.',
      location: 'Goa, India',
      eventType: 'Wedding'
    },
    {
      id: 7,
      name: 'Mr. & Mrs. Agarwal',
      event: '25th Anniversary',
      rating: 5,
      date: 'November 2024',
      image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Beautiful 25th anniversary celebration! EventCraft made our silver jubilee so special with perfect decoration and arrangements.',
      location: 'Jaipur, India',
      eventType: 'Anniversary'
    },
    {
      id: 8,
      name: 'Amit Sharma',
      event: 'Corporate Annual Meet',
      rating: 5,
      date: 'July 2024',
      image: 'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Fantastic corporate event management! The annual meeting was organized flawlessly with excellent AV setup and catering.',
      location: 'Chennai, India',
      eventType: 'Corporate Event'
    },
    {
      id: 9,
      name: 'Neha & Vikram',
      event: 'Ring Ceremony',
      rating: 5,
      date: 'December 2024',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'EventCraft made our engagement so special. The attention to detail and cultural sensitivity was outstanding.',
      location: 'Kolkata, India',
      eventType: 'Engagement'
    }
  ];

  const stats = [
    { icon: Heart, number: '500+', label: 'Happy Clients' },
    { icon: Star, number: '4.9', label: 'Average Rating' },
    { icon: Award, number: '98%', label: 'Satisfaction Rate' },
    { icon: Users, number: '1000+', label: 'Events Completed' }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Client Testimonials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients say about their experiences with EventCraft.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-xl text-gray-600">
              Hear from some of our most memorable celebrations
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img
                    src={featuredTestimonials[currentTestimonial].image}
                    alt={featuredTestimonials[currentTestimonial].name}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Quote className="h-6 w-6 text-purple-600" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    {[...Array(featuredTestimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-amber-500 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{featuredTestimonials[currentTestimonial].text}"
                  </blockquote>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {featuredTestimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-purple-600 font-medium">
                          {featuredTestimonials[currentTestimonial].event}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {featuredTestimonials[currentTestimonial].date}
                          <span className="mx-2">•</span>
                          {featuredTestimonials[currentTestimonial].location}
                        </div>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredTestimonials[currentTestimonial].eventType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Every testimonial represents a successful celebration and a happy client
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-600 text-sm">{testimonial.event}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-600 leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {testimonial.date}
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {testimonial.eventType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video Testimonials</h2>
            <p className="text-xl text-gray-600">
              Watch our clients share their experiences in their own words
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <div key={video} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-amber-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <svg className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Video Testimonial {video}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Client Story {video}</h4>
                  <p className="text-gray-600 text-sm">
                    Watch how EventCraft transformed their special day into an unforgettable celebration.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Own Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of satisfied clients who trusted EventCraft with their most important celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Planning Today
            </a>
            <a
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;