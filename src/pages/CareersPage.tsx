import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Heart, Award, Briefcase, GraduationCap, Star } from 'lucide-react';

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [applicationForm, setApplicationForm] = useState<{
    name: string;
    email: string;
    phone: string;
    position: string;
    experience: string;
    coverLetter: string;
    resume: File | null;
  }>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  const departments = ['All', 'Event Planning', 'Design & Creative', 'Operations', 'Sales & Marketing', 'Technology'];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Event Planner',
      department: 'Event Planning',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹6,00,000 - ₹10,00,000',
      description: 'Lead end-to-end event planning for weddings and corporate events. Manage client relationships and coordinate with vendor teams.',
      requirements: [
        'Bachelor\'s degree in Event Management or related field',
        '3+ years of event planning experience',
        'Excellent communication and organizational skills',
        'Experience with wedding and corporate events',
        'Proficiency in event management software'
      ],
      responsibilities: [
        'Plan and execute high-end events from concept to completion',
        'Manage client relationships and expectations',
        'Coordinate with vendors and suppliers',
        'Oversee event budgets and timelines',
        'Lead junior team members'
      ]
    },
    {
      id: 2,
      title: 'Creative Designer',
      department: 'Design & Creative',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹4,50,000 - ₹7,50,000',
      description: 'Create stunning visual concepts and designs for events. Work closely with planning team to bring creative visions to life.',
      requirements: [
        'Degree in Design, Fine Arts, or related field',
        '2+ years of design experience',
        'Proficiency in Adobe Creative Suite',
        'Strong portfolio of event design work',
        'Understanding of event production'
      ],
      responsibilities: [
        'Develop creative concepts for events',
        'Create design presentations and mood boards',
        'Collaborate with planning and operations teams',
        'Oversee design implementation on-site',
        'Stay updated with design trends'
      ]
    },
    {
      id: 3,
      title: 'Operations Coordinator',
      department: 'Operations',
      location: 'Delhi, India',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹3,50,000 - ₹5,50,000',
      description: 'Ensure smooth execution of events through detailed coordination and logistics management.',
      requirements: [
        'Bachelor\'s degree in any field',
        '1+ years of operations experience',
        'Strong organizational skills',
        'Ability to work under pressure',
        'Excellent problem-solving abilities'
      ],
      responsibilities: [
        'Coordinate event logistics and timelines',
        'Manage vendor relationships',
        'Oversee setup and breakdown processes',
        'Handle on-site event coordination',
        'Maintain quality standards'
      ]
    },
    {
      id: 4,
      title: 'Digital Marketing Specialist',
      department: 'Sales & Marketing',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹4,00,000 - ₹7,00,000',
      description: 'Drive digital marketing initiatives to promote EventCraft\'s services and build brand awareness.',
      requirements: [
        'Degree in Marketing, Communications, or related field',
        '2+ years of digital marketing experience',
        'Experience with social media platforms',
        'Knowledge of SEO and content marketing',
        'Analytics and reporting skills'
      ],
      responsibilities: [
        'Develop and execute digital marketing campaigns',
        'Manage social media presence',
        'Create engaging content for various platforms',
        'Analyze campaign performance',
        'Collaborate with design team for marketing materials'
      ]
    },
    {
      id: 5,
      title: 'Junior Event Coordinator',
      department: 'Event Planning',
      location: 'Pune, India',
      type: 'Full-time',
      experience: '0-2 years',
      salary: '₹2,50,000 - ₹4,00,000',
      description: 'Support senior planners in event coordination and client management. Perfect for fresh graduates passionate about events.',
      requirements: [
        'Bachelor\'s degree in any field',
        'Fresh graduates welcome',
        'Strong communication skills',
        'Enthusiasm for event planning',
        'Willingness to learn and grow'
      ],
      responsibilities: [
        'Assist in event planning and coordination',
        'Support client communication',
        'Help with vendor coordination',
        'Maintain event documentation',
        'Learn from senior team members'
      ]
    },
    {
      id: 6,
      title: 'Full Stack Developer',
      department: 'Technology',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '₹8,00,000 - ₹15,00,000',
      description: 'Develop and maintain EventCraft\'s digital platforms and tools to enhance client and vendor experiences.',
      requirements: [
        'Computer Science degree or equivalent',
        '3+ years of full-stack development experience',
        'Proficiency in React, Node.js, and databases',
        'Experience with cloud platforms',
        'Understanding of event management workflows'
      ],
      responsibilities: [
        'Develop web applications and platforms',
        'Maintain and improve existing systems',
        'Collaborate with business teams',
        'Implement new features and functionality',
        'Ensure system security and performance'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, wellness programs, and mental health support'
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: 'Continuous learning opportunities, workshops, and professional development programs'
    },
    {
      icon: Users,
      title: 'Team Culture',
      description: 'Collaborative work environment with team building activities and celebrations'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and generous time-off policies'
    },
    {
      icon: Award,
      title: 'Recognition & Rewards',
      description: 'Performance-based bonuses, recognition programs, and career advancement opportunities'
    },
    {
      icon: Star,
      title: 'Unique Perks',
      description: 'Event planning discounts, creative workspace, and access to industry events'
    }
  ];

  const filteredJobs = selectedDepartment === 'All' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    console.log('Application submitted:', applicationForm);
    alert('Thank you for your application! We will review it and get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a passionate team that creates extraordinary experiences. Discover exciting career opportunities 
            and help us make every celebration unforgettable.
          </p>
        </div>
      </div>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventCraft?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in nurturing talent, fostering creativity, and building a workplace where everyone can thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600">
              Find the perfect role that matches your skills and passion
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedDepartment === department
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                        {job.experience}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.slice(0, 3).map((resp, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold text-gray-900">Salary Range</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mb-6">{job.salary}</p>
                      
                      <button
                        onClick={() => setApplicationForm({...applicationForm, position: job.title})}
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Application Form */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Apply Now</h2>
                  <form onSubmit={handleApplicationSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={applicationForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={applicationForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={applicationForm.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="position">Position</label>
                        <select
                          id="position"
                          name="position"
                          value={applicationForm.position}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                          <option value="">Select a position</option>
                          {jobOpenings.map((job) => (
                            <option key={job.id} value={job.title}>{job.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="experience">Experience</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          value={applicationForm.experience}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="resume">Resume</label>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files ? e.target.files[0] : null })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-gray-700 font-semibold mb-2" htmlFor="coverLetter">Cover Letter</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={applicationForm.coverLetter}
                        onChange={handleInputChange}
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-8 w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold text-lg"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        );
      };
      
      export default CareersPage;