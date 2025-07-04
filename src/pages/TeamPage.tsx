import { Mail, Linkedin, Twitter, Award, Users, Calendar, Heart } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'With over 15 years in event planning, Sarah founded EventCraft with a vision to create extraordinary experiences. Her passion for perfection and eye for detail have made her a respected leader in the industry.',
      specialties: ['Wedding Planning', 'Corporate Events', 'Luxury Celebrations'],
      email: 'sarah@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Michael brings artistic vision to life with his innovative design concepts. His background in fine arts and architecture creates stunning visual experiences that captivate and inspire.',
      specialties: ['Event Design', 'Floral Arrangements', 'Venue Styling'],
      email: 'michael@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Priya ensures every event runs seamlessly from start to finish. Her exceptional organizational skills and attention to logistics make even the most complex events appear effortless.',
      specialties: ['Event Coordination', 'Vendor Management', 'Timeline Planning'],
      email: 'priya@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Client Relations Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'David builds lasting relationships with our clients, understanding their unique needs and ensuring their vision becomes reality. His warm personality and professional expertise create trust and confidence.',
      specialties: ['Client Consultation', 'Relationship Management', 'Custom Solutions'],
      email: 'david@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 5,
      name: 'Emily Thompson',
      role: 'Marketing & Communications',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Emily tells our story and showcases our work to the world. Her creative marketing strategies and compelling content help couples and companies discover the magic of EventCraft.',
      specialties: ['Digital Marketing', 'Content Creation', 'Brand Strategy'],
      email: 'emily@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 6,
      name: 'Raj Patel',
      role: 'Technology & Innovation',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Raj leads our digital transformation, developing innovative solutions that enhance the event planning experience. His technical expertise brings cutting-edge technology to traditional event planning.',
      specialties: ['Event Technology', 'Digital Solutions', 'Process Innovation'],
      email: 'raj@eventcraft.com',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const departments = [
    {
      name: 'Planning & Design',
      description: 'Creative visionaries who bring your dreams to life',
      icon: Calendar,
      members: 12,
      color: 'purple'
    },
    {
      name: 'Operations & Logistics',
      description: 'Detail-oriented professionals ensuring flawless execution',
      icon: Users,
      members: 15,
      color: 'blue'
    },
    {
      name: 'Client Services',
      description: 'Dedicated team members focused on your satisfaction',
      icon: Heart,
      members: 8,
      color: 'green'
    },
    {
      name: 'Vendor Relations',
      description: 'Building partnerships with the best in the industry',
      icon: Award,
      members: 6,
      color: 'amber'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Behind every extraordinary event is an extraordinary team. Meet the passionate professionals who make magic happen every day.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leaders guide EventCraft with vision, expertise, and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-purple-200">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href={member.twitter}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each department brings specialized expertise to ensure every aspect of your event is handled with care and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              const colorClasses = {
                purple: 'bg-purple-100 text-purple-600 border-purple-200',
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                green: 'bg-green-100 text-green-600 border-green-200',
                amber: 'bg-amber-100 text-amber-600 border-amber-200'
              };
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${colorClasses[dept.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 mb-4">{dept.description}</p>
                  <div className="text-2xl font-bold text-purple-600">{dept.members}</div>
                  <div className="text-sm text-gray-500">Team Members</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  At EventCraft, we believe that great events come from great people. Our team culture is built on 
                  collaboration, creativity, and a shared passion for creating extraordinary experiences.
                </p>
                <p>
                  We foster an environment where every team member can thrive, grow, and contribute their unique 
                  talents to our collective success. From brainstorming sessions to post-event celebrations, 
                  we work together as one unified team.
                </p>
                <p>
                  Our commitment to work-life balance, continuous learning, and professional development ensures 
                  that our team members are not just employees, but valued partners in our mission to create magic.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team collaboration"
                className="w-full h-48 object-cover rounded-xl"
              />
              <img 
                src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team celebration"
                className="w-full h-48 object-cover rounded-xl mt-8"
              />
              <img 
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team planning"
                className="w-full h-48 object-cover rounded-xl -mt-8"
              />
              <img 
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team success"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Amazing Team</h2>
          <p className="text-xl text-white/90 mb-8">
            Ready to be part of something extraordinary? We're always looking for passionate individuals who share our vision.
          </p>
          <a
            href="/careers"
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;