import { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Wedding Tips', 'Event Planning', 'Trends', 'Vendor Guides', 'Real Events'];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Tips for Planning Your Dream Wedding',
      excerpt: 'Planning a wedding can be overwhelming, but with the right approach and timeline, you can create the perfect celebration. Here are our top tips for stress-free wedding planning.',
      content: 'Full article content would go here...',
      author: 'Sarah Johnson',
      date: '2024-12-15',
      readTime: '8 min read',
      category: 'Wedding Tips',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Wedding', 'Planning', 'Tips', 'Bride']
    },
    {
      id: 2,
      title: 'Latest Event Decoration Trends for 2024',
      excerpt: 'Discover the hottest decoration trends that are defining events in 2024. From sustainable decor to bold color palettes, here\'s what\'s trending.',
      content: 'Full article content would go here...',
      author: 'Michael Chen',
      date: '2024-12-10',
      readTime: '6 min read',
      category: 'Trends',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Trends', 'Decoration', '2024', 'Design']
    },
    {
      id: 3,
      title: 'How to Choose the Perfect Wedding Venue',
      excerpt: 'Your venue sets the tone for your entire wedding. Learn how to evaluate venues, ask the right questions, and make the best choice for your special day.',
      content: 'Full article content would go here...',
      author: 'Priya Sharma',
      date: '2024-12-08',
      readTime: '10 min read',
      category: 'Wedding Tips',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Wedding', 'Venue', 'Selection', 'Tips']
    },
    {
      id: 4,
      title: 'Corporate Event Planning: A Complete Guide',
      excerpt: 'From conferences to product launches, corporate events require special attention to detail. Here\'s your comprehensive guide to successful corporate event planning.',
      content: 'Full article content would go here...',
      author: 'David Rodriguez',
      date: '2024-12-05',
      readTime: '12 min read',
      category: 'Event Planning',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Corporate', 'Business', 'Planning', 'Professional']
    },
    {
      id: 5,
      title: 'Finding the Right Vendors for Your Event',
      excerpt: 'The success of your event depends heavily on your vendor team. Learn how to research, evaluate, and select the best vendors for your celebration.',
      content: 'Full article content would go here...',
      author: 'Emily Thompson',
      date: '2024-12-03',
      readTime: '7 min read',
      category: 'Vendor Guides',
      image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Vendors', 'Selection', 'Quality', 'Partnership']
    },
    {
      id: 6,
      title: 'Real Wedding: Sarah & Michael\'s Garden Celebration',
      excerpt: 'Take a behind-the-scenes look at Sarah and Michael\'s stunning garden wedding. From planning challenges to magical moments, here\'s their complete story.',
      content: 'Full article content would go here...',
      author: 'EventCraft Team',
      date: '2024-12-01',
      readTime: '5 min read',
      category: 'Real Events',
      image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Real Wedding', 'Garden', 'Inspiration', 'Success Story']
    },
    {
      id: 7,
      title: 'Budget-Friendly Event Planning Ideas',
      excerpt: 'Creating a memorable event doesn\'t have to break the bank. Discover creative ways to plan stunning events while staying within your budget.',
      content: 'Full article content would go here...',
      author: 'Raj Patel',
      date: '2024-11-28',
      readTime: '9 min read',
      category: 'Event Planning',
      image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Budget', 'Savings', 'Creative', 'Affordable']
    },
    {
      id: 8,
      title: 'Traditional Indian Wedding Ceremonies Explained',
      excerpt: 'Understanding the significance and beauty of traditional Indian wedding ceremonies. A comprehensive guide to rituals, customs, and their meanings.',
      content: 'Full article content would go here...',
      author: 'Priya Sharma',
      date: '2024-11-25',
      readTime: '15 min read',
      category: 'Wedding Tips',
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Indian Wedding', 'Traditions', 'Culture', 'Ceremonies']
    },
    {
      id: 9,
      title: 'Sustainable Event Planning: Going Green',
      excerpt: 'Learn how to plan eco-friendly events that are both beautiful and environmentally responsible. Tips for sustainable decorations, catering, and more.',
      content: 'Full article content would go here...',
      author: 'Emily Thompson',
      date: '2024-11-22',
      readTime: '11 min read',
      category: 'Trends',
      image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Sustainable', 'Eco-friendly', 'Green', 'Environment']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">EventCraft Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert tips, latest trends, and inspiring stories from the world of event planning. 
            Your guide to creating extraordinary celebrations.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full mr-4">
                    {featuredPost.category}
                  </span>
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(featuredPost.date).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{featuredPost.author}</span>
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter and never miss the latest event planning tips, trends, and inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;