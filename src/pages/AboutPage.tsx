import { Calendar, Heart, Award, Users, Target, Lightbulb, Shield, Globe } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We pour our heart into every event, ensuring each celebration is crafted with love and attention to detail.'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Your special moments deserve unwavering commitment. We build lasting relationships through trust and reliability.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Creativity',
      description: 'We constantly innovate and bring fresh, creative ideas to make your events unique and memorable.'
    },
    {
      icon: Globe,
      title: 'Cultural Sensitivity',
      description: 'We honor and celebrate diverse traditions, ensuring every cultural aspect is respected and beautifully presented.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Founded EventCraft', description: 'Started with a vision to transform event planning' },
    { year: '2019', title: '100+ Events', description: 'Celebrated our first 100 successful events' },
    { year: '2020', title: 'Digital Innovation', description: 'Launched virtual event planning during pandemic' },
    { year: '2021', title: '500+ Happy Clients', description: 'Reached milestone of 500 satisfied customers' },
    { year: '2022', title: 'Award Recognition', description: 'Won "Best Event Planning Company" award' },
    { year: '2023', title: 'Team Expansion', description: 'Grew to 50+ dedicated team members' },
    { year: '2024', title: '1000+ Events', description: 'Celebrated over 1000 successful events' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About EventCraft</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are passionate event planners dedicated to creating extraordinary experiences that celebrate life's most precious moments. 
              With years of expertise and a commitment to excellence, we transform your vision into unforgettable reality.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  EventCraft was born from a simple belief: every celebration deserves to be extraordinary. 
                  Founded in 2018 by a team of passionate event enthusiasts, we started with a mission to 
                  transform the way people experience their most important moments.
                </p>
                <p>
                  What began as a small team with big dreams has grown into a comprehensive event planning 
                  company that has orchestrated over 1,000 successful events. From intimate family gatherings 
                  to grand corporate celebrations, we've had the privilege of being part of countless special moments.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, unwavering dedication to quality, 
                  and an ever-growing network of trusted vendors and partners who share our commitment to excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm">Events Planned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-purple-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create extraordinary experiences that celebrate life's most precious moments. We strive to 
                transform every event into a masterpiece of joy, beauty, and unforgettable memories through 
                meticulous planning, creative innovation, and unwavering dedication to our clients' dreams.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-8 w-8 text-amber-500 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the most trusted and innovative event planning company, known for creating magical moments 
                that exceed expectations. We envision a world where every celebration is a perfect reflection 
                of our clients' unique stories, brought to life with creativity, precision, and heart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we serve our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership - here's how we've grown over the years.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">EventCraft by Numbers</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our achievements speak for themselves - here's what we've accomplished together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, number: '1000+', label: 'Events Planned' },
              { icon: Users, number: '500+', label: 'Happy Clients' },
              { icon: Award, number: '15+', label: 'Awards Won' },
              { icon: Heart, number: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <IconComponent className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Create Magic Together?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's turn your vision into an extraordinary celebration that you and your guests will remember forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Start Planning Your Event
            </a>
            <a
              href="/gallery"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;