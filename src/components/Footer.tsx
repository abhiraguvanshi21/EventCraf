import { Calendar, Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-2xl font-bold">EventCraft</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating magical moments and unforgettable experiences for every occasion. 
              Your dream event is our passion.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-300" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-300" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-300" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Weddings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Engagements</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Corporate Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Birthday Parties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Family Functions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Special Occasions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Our Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Portfolio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-3" />
                <span className="text-gray-300">hello@eventcraft.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <span className="text-gray-300">123 Event Street<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 EventCraft. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
            <Heart className="h-4 w-4 text-red-400 mr-1" />
            Made with love for unforgettable moments
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;