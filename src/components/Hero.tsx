import { Link } from 'react-router-dom';
import { Star, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-20 bg-gradient-to-br from-purple-50 to-amber-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Floating CTA Badge */}
      <div className="absolute top-6 right-6 z-20">
        <span className="animate-bounce bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          ✨ Limited 2025 Wedding Slots
        </span>
      </div>

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="mb-16 lg:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6"
            >
              <span className="block">Create</span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-500"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Magical
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Moments
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl"
            >
              From intimate gatherings to grand celebrations, we bring your vision to life with premium planning, trusted vendors, and unforgettable experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Link
                to="/booking"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Start Planning
              </Link>
              <Link
                to="/gallery"
                className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 transition-all duration-300 text-center"
              >
                View Portfolio
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 mr-2" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span>500+ Events</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-amber-500 mr-2" />
                <span>98% Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful wedding decoration"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Decorative gradient blobs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-amber-400 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-purple-400 rounded-full opacity-30 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
