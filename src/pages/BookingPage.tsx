import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Users,
  CreditCard,
  CheckCircle,
  Star,
  Filter,
  Search,
  X,
  Eye,
  Plus,
  Minus,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Vendor {
  id: string;
  name: string;
  service: string;
  category: string;
  rating: number;
  price: string;
  priceMin: number;
  priceMax: number;
  image: string;
  contact: string;
  description: string;
  location: string;
  experience: string;
  specialties: string[];
}

const allVendors: Vendor[] = [
  // Tent & Canopy Services
  {
    id: 'elite-tent-house',
    name: 'Elite Tent House',
    service: 'Tent & Canopy',
    category: 'tent-canopy',
    rating: 4.9,
    price: '₹15,000',
    priceMin: 5000,
    priceMax: 50000,
    image: 'https://ts2.mm.bing.net/th?id=OIP.YS8eBW2QTg0nuKADBkzNDQHaE8&pid=15.1',
    contact: '+91 9161036941',
    description: 'Premium tent and canopy services with red carpet included',
    location: 'Downtown District',
    experience: '10+ years',
    specialties: ['Wedding Tents', 'Corporate Canopies', 'Weather Protection']
  },
  {
    id: 'royal-canopy-solutions',
    name: 'Royal Canopy Solutions',
    service: 'Tent & Canopy',
    category: 'tent-canopy',
    rating: 4.7,
    price: '₹25,000',
    priceMin: 8000,
    priceMax: 75000,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 8840192922',
    description: 'Luxury tent and canopy solutions for premium events',
    location: 'Central City',
    experience: '8+ years',
    specialties: ['Luxury Tents', 'Marquee Setup', 'Custom Designs']
  },
  {
    id: 'weather-shield-tents',
    name: 'Weather Shield Tents',
    service: 'Tent & Canopy',
    category: 'tent-canopy',
    rating: 4.6,
    price: '₹18,000',
    priceMin: 6000,
    priceMax: 60000,
    image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 7007635630',
    description: 'Specialized in weather-resistant tent solutions',
    location: 'Garden District',
    experience: '12+ years',
    specialties: ['Waterproof Tents', 'Wind Resistant', 'Quick Setup']
  },
  {
    id: 'ayush-tent-house',
    name: 'Ayush Tent House',
    service: 'Tent & Canopy',
    category: 'tent-canopy',
    rating: 4.9,
    price: '₹35,000',
    priceMin: 86000,
    priceMax: 500000,
    image: 'https://ts1.mm.bing.net/th?id=OIP.WG3fuPUtoca5bhlsx6XnVQHaE8&pid=15.1',
    contact: '+91 9918322023',
    description: 'Premium tent solutions for large-scale events',
    location: 'Maharua Gola Ambedkarnagar',
    experience: '12+ years',
    specialties: ['Large Capacity', 'Premium Setup', 'Event Management']
  },
  // Food & Catering
  {
    id: 'gourmet-catering',
    name: 'Gourmet Catering Co.',
    service: 'Food & Catering',
    category: 'catering',
    rating: 4.8,
    price: '₹800/person',
    priceMin: 300,
    priceMax: 1500,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 9876543210',
    description: 'Multi-cuisine catering with live counters and custom menus',
    location: 'Food District',
    experience: '15+ years',
    specialties: ['Multi-cuisine', 'Live Counters', 'Custom Menus']
  },
  {
    id: 'spice-garden-catering',
    name: 'Spice Garden Catering',
    service: 'Food & Catering',
    category: 'catering',
    rating: 4.9,
    price: '₹600/person',
    priceMin: 250,
    priceMax: 1200,
    image: 'https://ts2.mm.bing.net/th?id=OIP.VTL4f8H6N8bNlia5oJ2gTwHaE7&pid=15.1',
    contact: '+91 7654321098',
    description: 'Authentic Indian catering with traditional recipes',
    location: 'Spice Market',
    experience: '20+ years',
    specialties: ['Indian Cuisine', 'Traditional Recipes', 'Regional Specialties']
  },
  {
    id: 'the-food-stories',
    name: 'The Food Stories',
    service: 'Food & Catering',
    category: 'catering',
    rating: 4.9,
    price: '₹1,200/person',
    priceMin: 1250,
    priceMax: 2500,
    image: 'https://ts1.mm.bing.net/th?id=OIP.U2drnVZY_r_e2GE7zCcRYgHaFj&pid=15.1',
    contact: '+91 7654321098',
    description: 'Premium catering for exclusive events and gatherings',
    location: 'Main Market',
    experience: '29+ years',
    specialties: ['Gourmet Cuisine', 'Premium Service', 'Exclusive Events']
  },
  // Floral Design
  {
    id: 'bloom-blossom',
    name: 'Bloom & Blossom',
    service: 'Floral Design',
    category: 'floral',
    rating: 4.9,
    price: '₹12,000',
    priceMin: 2000,
    priceMax: 25000,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 8765432109',
    description: 'Beautiful floral arrangements and venue decoration',
    location: 'Garden District',
    experience: '12+ years',
    specialties: ['Bridal Bouquets', 'Centerpieces', 'Venue Decoration']
  },
  {
    id: 'petal-perfect-designs',
    name: 'Petal Perfect Designs',
    service: 'Floral Design',
    category: 'floral',
    rating: 4.7,
    price: '₹8,000',
    priceMin: 1500,
    priceMax: 20000,
    image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 6543210987',
    description: 'Creative floral design studio with exotic arrangements',
    location: 'Flower Market',
    experience: '8+ years',
    specialties: ['Wedding Decor', 'Exotic Flowers', 'Custom Designs']
  },
  // Audio Visual
  {
    id: 'premier-sound-lights',
    name: 'Premier Sound & Lights',
    service: 'Audio Visual',
    category: 'audio-visual',
    rating: 4.7,
    price: '₹15,000',
    priceMin: 10000,
    priceMax: 100000,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 7654321098',
    description: 'Professional sound systems and stage lighting',
    location: 'Tech District',
    experience: '10+ years',
    specialties: ['Sound Systems', 'Stage Lighting', 'LED Screens']
  },
  // Photography
  {
    id: 'royal-photography',
    name: 'Royal Photography',
    service: 'Photography',
    category: 'photography',
    rating: 4.9,
    price: '₹25,000',
    priceMin: 15000,
    priceMax: 150000,
    image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 5432109876',
    description: 'Wedding photography with drone shots and same-day edits',
    location: 'Arts District',
    experience: '15+ years',
    specialties: ['Wedding Photography', 'Drone Shots', 'Same-day Edits']
  },
  {
    id: 'pixel-dreams-studio',
    name: 'Pixel Dreams Studio',
    service: 'Photography',
    category: 'photography',
    rating: 4.9,
    price: '₹18,000',
    priceMin: 5000,
    priceMax: 150000,
    image: 'https://ts4.mm.bing.net/th?id=OIP.qJ84Zjn3T7FJzm1QJ_4i0gHaE8&pid=15.1',
    contact: '+91 5432109876',
    description: 'Specializing in photography, cinematography, and digital marketing',
    location: 'Akbarpur',
    experience: '10+ years',
    specialties: ['Photography', 'Cinematography', 'Digital Marketing']
  },
  {
    id: 'shutter-bliss-studio',
    name: 'Shutter Bliss Studio',
    service: 'Photography',
    category: 'photography',
    rating: 4.9,
    price: '₹12,000',
    priceMin: 5000,
    priceMax: 50000,
    image: 'https://images.pexels.com/photos/1051076/pexels-photo-1051076.jpeg?cs=srgb&dl=pexels-element-digital-1051076.jpg&fm=jpg',
    contact: '+91 5432109876',
    description: 'Videography, video editing, and wedding photography services',
    location: 'Dostpur',
    experience: '5+ years',
    specialties: ['Videography', 'Video Editing', 'Wedding Photography']
  },
  // Event Decoration
  {
    id: 'elegant-decor-studio',
    name: 'Elegant Decor Studio',
    service: 'Decoration',
    category: 'decoration',
    rating: 4.8,
    price: '₹20,000',
    priceMin: 8000,
    priceMax: 80000,
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400',
    contact: '+91 4321098765',
    description: 'Theme decoration with balloon artistry and backdrop design',
    location: 'Design District',
    experience: '9+ years',
    specialties: ['Theme Decoration', 'Balloon Artistry', 'Backdrop Design']
  }
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'tent-canopy', name: 'Tent & Canopy' },
  { id: 'catering', name: 'Food & Catering' },
  { id: 'floral', name: 'Floral Design' },
  { id: 'audio-visual', name: 'Audio Visual' },
  { id: 'photography', name: 'Photography' },
  { id: 'decoration', name: 'Event Decoration' }
];

const budgetRanges = [
  { id: 'all', name: 'All Budgets', min: 0, max: Infinity },
  { id: 'under-10k', name: 'Under ₹10,000', min: 0, max: 10000 },
  { id: '10k-25k', name: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { id: '25k-50k', name: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { id: '50k-100k', name: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
  { id: 'over-100k', name: 'Over ₹1,00,000', min: 100000, max: Infinity }
];

const serviceTypeMapping = {
  weddings: 'wedding',
  engagements: 'engagement',
  corporate: 'corporate',
  'family-functions': 'family',
  'birthday-parties': 'birthday',
  'special-occasions': 'anniversary',
};

const BookingPage = () => {
  const { user, saveBookingData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    eventName: '',
    eventType: '',
    date: '',
    time: '',
    venue: '',
    guestCount: '',
    budget: '',
    description: '',
    theme: '',
    specialRequirements: '',
    selectedVendors: [] as { vendor: Vendor; quantity: number; selectedBudget?: number }[],
    advanceAmount: 0,
    totalAmount: 0,
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card',
    upiApp: '',
  });

  // Vendor selection filters
  const [vendorFilters, setVendorFilters] = useState({
    category: 'all',
    budget: 'all',
    search: '',
  });

  const [showVendorModal, setShowVendorModal] = useState(false);

  // Pre-fill event type based on service parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (
      serviceParam &&
      serviceTypeMapping[serviceParam as keyof typeof serviceTypeMapping]
    ) {
      setBookingData((prev) => ({
        ...prev,
        eventType:
          serviceTypeMapping[serviceParam as keyof typeof serviceTypeMapping],
      }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredVendors = allVendors.filter((vendor) => {
    const categoryMatch = vendorFilters.category === 'all' || vendor.category === vendorFilters.category;
    
    const budgetRange = budgetRanges.find(range => range.id === vendorFilters.budget);
    const budgetMatch = !budgetRange || budgetRange.id === 'all' || 
      (vendor.priceMin >= budgetRange.min && vendor.priceMin <= budgetRange.max);
    
    const searchMatch = !vendorFilters.search || 
      vendor.name.toLowerCase().includes(vendorFilters.search.toLowerCase()) ||
      vendor.service.toLowerCase().includes(vendorFilters.search.toLowerCase()) ||
      vendor.description.toLowerCase().includes(vendorFilters.search.toLowerCase());

    return categoryMatch && budgetMatch && searchMatch;
  });

  const addVendor = (vendor: Vendor, selectedBudget?: number) => {
    const existingVendor = bookingData.selectedVendors.find(v => v.vendor.id === vendor.id);
    
    if (existingVendor) {
      // Increase quantity
      updateVendorQuantity(vendor.id, existingVendor.quantity + 1);
    } else {
      // Add new vendor
      const updatedVendors = [...bookingData.selectedVendors, { vendor, quantity: 1, selectedBudget }];
      updateBookingTotals(updatedVendors);
    }
  };

  const removeVendor = (vendorId: string) => {
    const updatedVendors = bookingData.selectedVendors.filter(v => v.vendor.id !== vendorId);
    updateBookingTotals(updatedVendors);
  };

  const updateVendorQuantity = (vendorId: string, quantity: number) => {
    if (quantity <= 0) {
      removeVendor(vendorId);
      return;
    }

    const updatedVendors = bookingData.selectedVendors.map(v => 
      v.vendor.id === vendorId ? { ...v, quantity } : v
    );
    updateBookingTotals(updatedVendors);
  };

  const updateBookingTotals = (vendors: { vendor: Vendor; quantity: number; selectedBudget?: number }[]) => {
    const totalAmount = vendors.reduce((sum, { vendor, quantity, selectedBudget }) => {
      let price = selectedBudget || vendor.priceMin;
      
      if (vendor.service.includes('person')) {
        price = price * parseInt(bookingData.guestCount || '50') * quantity;
      } else {
        price = price * quantity;
      }
      
      return sum + price;
    }, 0);

    const advanceAmount = Math.round(totalAmount * 0.4); // 30% advance

    setBookingData(prev => ({
      ...prev,
      selectedVendors: vendors,
      totalAmount,
      advanceAmount,
    }));
  };

  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed' | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string>('');

  const sendPaymentMessageToApp = (method: string) => {
    // Simulate sending a message to the app after payment method selection
    console.log(`Payment method selected: ${method}`);
    setPaymentMessage(`Payment method selected: ${method}`);
  };

  const processPayment = () => {
    // Simulate payment processing and giving money
    setPaymentStatus('pending');
    setTimeout(() => {
      setPaymentStatus('completed');
      setPaymentMessage('Payment successful! Money has been transferred.');
    }, 2000);
  };

  const handleBookingSubmit = () => {
    if (paymentStatus !== 'completed') {
      processPayment();
      return;
    }

    // Prepare full booking data with required fields
    const fullBookingData = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      paidAmount: bookingData.advanceAmount,
      status: "confirmed" as const,
      bookingDate: new Date().toISOString(),
    };
    // Save booking data to context
    saveBookingData(fullBookingData);

    // Redirect to planning page after successful booking
    navigate('/planning');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Event Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={bookingData.eventName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={bookingData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="tilak">Tilak Ceremony</option>
                  <option value="haldi">Haldi Ceremony</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="family">Family Function</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Location *
              </label>
              <input
                type="text"
                name="venue"
                value={bookingData.venue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter venue address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Guests *
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={bookingData.guestCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Number of guests"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={bookingData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50000">Under ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                  <option value="200000-500000">₹2,00,000 - ₹5,00,000</option>
                  <option value="over-500000">Over ₹5,00,000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Theme
              </label>
              <input
                type="text"
                name="theme"
                value={bookingData.theme}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Traditional, Modern, Floral, Royal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description
              </label>
              <textarea
                name="description"
                value={bookingData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your event vision and requirements..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Select Vendors</h3>
              <button
                onClick={() => setShowVendorModal(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Browse Vendors
              </button>
            </div>
            
            <p className="text-gray-600">
              Choose the vendors you need for your event. You can browse by category and budget to find the perfect match.
            </p>

            {/* Selected Vendors */}
            {bookingData.selectedVendors.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Selected Vendors</h4>
                {bookingData.selectedVendors.map(({ vendor, quantity, selectedBudget }) => (
                  <div key={vendor.id} className="border border-gray-200 rounded-xl p-4 bg-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-gray-900">{vendor.name}</h5>
                          <p className="text-purple-600 font-medium">{vendor.service}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm text-gray-600">{vendor.rating}</span>
                            <span className="text-sm text-gray-500 ml-2">{vendor.location}</span>
                          </div>
                          {selectedBudget && (
                            <p className="text-sm text-green-600 font-medium">
                              Selected Budget: ₹{selectedBudget.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateVendorQuantity(vendor.id, quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{quantity}</span>
                          <button
                            onClick={() => updateVendorQuantity(vendor.id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-purple-600">
                            ₹{(selectedBudget || vendor.priceMin).toLocaleString()}
                          </p>
                          {quantity > 1 && (
                            <p className="text-sm text-gray-600">× {quantity}</p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => removeVendor(vendor.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-purple-50 rounded-xl p-6 mt-6">
                  <h4 className="font-bold text-gray-900 mb-4">Booking Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-purple-600">₹{bookingData.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Advance Payment (30%):</span>
                      <span>₹{bookingData.advanceAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Vendors Selected</h4>
                <p className="text-gray-600 mb-4">Browse our vendor directory to find the perfect services for your event.</p>
                <button
                  onClick={() => setShowVendorModal(true)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Browse Vendors
                </button>
              </div>
            )}

            {/* Vendor Selection Modal */}
            {showVendorModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-hidden w-full">
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">Select Vendors</h3>
                    <button
                      onClick={() => setShowVendorModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-8 w-8" />
                    </button>
                  </div>
                  
                  {/* Filters */}
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={vendorFilters.category}
                          onChange={(e) => setVendorFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <select
                          value={vendorFilters.budget}
                          onChange={(e) => setVendorFilters(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          {budgetRanges.map(range => (
                            <option key={range.id} value={range.id}>{range.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={vendorFilters.search}
                            onChange={(e) => setVendorFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Search vendors..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vendor Grid */}
                  <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVendors.map((vendor) => {
                        const isSelected = bookingData.selectedVendors.some(v => v.vendor.id === vendor.id);
                        
                        return (
                          <VendorCard
                            key={vendor.id}
                            vendor={vendor}
                            isSelected={isSelected}
                            onAdd={addVendor}
                          />
                        );
                      })}
                    </div>
                    
                    {filteredVendors.length === 0 && (
                      <div className="text-center py-12">
                        <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Vendors Found</h4>
                        <p className="text-gray-600">Try adjusting your filters to see more vendors.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Booking Summary
            </h3>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">Event Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Event:</span>{' '}
                  {bookingData.eventName}
                </div>
                <div>
                  <span className="font-medium">Type:</span>{' '}
                  {bookingData.eventType}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {bookingData.date}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {bookingData.time}
                </div>
                <div>
                  <span className="font-medium">Venue:</span>{' '}
                  {bookingData.venue}
                </div>
                <div>
                  <span className="font-medium">Guests:</span>{' '}
                  {bookingData.guestCount}
                </div>
                {bookingData.theme && (
                  <div>
                    <span className="font-medium">Theme:</span>{' '}
                    {bookingData.theme}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">Selected Vendors</h4>
              <div className="space-y-3">
                {bookingData.selectedVendors.map(({ vendor, quantity, selectedBudget }) => (
                  <div key={vendor.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{vendor.name}</span>
                      <span className="text-gray-600 ml-2">({vendor.service})</span>
                      {quantity > 1 && (
                        <span className="text-purple-600 ml-2">× {quantity}</span>
                      )}
                    </div>
                    <span className="font-semibold text-purple-600">
                      ₹{(selectedBudget || vendor.priceMin).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Total Event Cost:</span>
                  <span className="font-semibold">
                    ₹{bookingData.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-purple-600">
                  <span>Advance Payment (30%):</span>
                  <span className="font-bold text-lg">
                    ₹{bookingData.advanceAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Remaining Amount:</span>
                  <span>
                    ₹
                    {(
                      bookingData.totalAmount - bookingData.advanceAmount
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Payment Details
            </h3>
            <p className="text-gray-600 mb-6">
              Pay advance amount of{' '}
              <span className="font-bold text-purple-600">
                ₹{bookingData.advanceAmount.toLocaleString()}
              </span>{' '}
              to confirm your booking.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
              <div className="flex flex-wrap gap-3 mb-6">
                {['card', 'upi-app', 'upi', 'netbanking', 'wallet', 'others'].map((method) => {
                  const methodLabels: Record<string, string> = {
                    card: 'Credit/Debit Card',
                    'upi-app': 'UPI by App',
                    upi: 'UPI Payment',
                    netbanking: 'Net Banking',
                    wallet: 'Wallet',
                    others: 'Others',
                  };
                  const isSelected = paymentData.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => {
                        setPaymentData(prev => ({ ...prev, paymentMethod: method }));
                        sendPaymentMessageToApp(method);
                      }}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      {methodLabels[method]}
                    </button>
                  );
                })}
              </div>
              </div>

              {paymentData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter cardholder name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

            {(paymentData.paymentMethod === 'upi' || paymentData.paymentMethod === 'upi-app') && (
              <div>
                {paymentData.paymentMethod === 'upi' && (
                  <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="yourname@upi"
                  />
                  </>
                )}
                {paymentData.paymentMethod === 'upi-app' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select UPI App
                    </label>
                    <select
                      name="upiApp"
                      value={paymentData.upiApp || ''}
                      onChange={(e) =>
                        setPaymentData(prev => ({ ...prev, upiApp: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select an app</option>
                      <option value="googlepay">Google Pay</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="paytm">Paytm</option>
                      <option value="bhim">BHIM</option>
                      <option value="amazonpay">Amazon Pay</option>
                    </select>
                    {paymentData.upiApp && (
                      <p className="mt-2 text-gray-700">
                        Please open {paymentData.upiApp.charAt(0).toUpperCase() + paymentData.upiApp.slice(1)} to complete the payment.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {paymentData.paymentMethod === 'netbanking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                </select>
                <p className="text-gray-700 mt-2">
                  Please complete the payment through your selected bank's net banking portal.
                </p>
              </div>
            )}
            {paymentData.paymentMethod === 'wallet' && (
              <div>
                <p className="text-gray-700">
                  Please open your wallet app to complete the payment.
                </p>
              </div>
            )}
            {paymentData.paymentMethod === 'others' && (
              <div>
                <p className="text-gray-700">
                  Please follow the instructions provided by your selected payment method.
                </p>
              </div>
            )}
          </div>

          {paymentStatus === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-yellow-600 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span className="text-sm text-yellow-800">Processing payment...</span>
              </div>
            </div>
          )}

          {paymentStatus === 'completed' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">{paymentMessage}</span>
              </div>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-600 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-sm text-red-800">{paymentMessage}</span>
              </div>
            </div>
          )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please Login to Continue
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to book an event.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span
              className={
                currentStep >= 1
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-500'
              }
            >
              Event Details
            </span>
            <span
              className={
                currentStep >= 2
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-500'
              }
            >
              Select Vendors
            </span>
            <span
              className={
                currentStep >= 3
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-500'
              }
            >
              Review Booking
            </span>
            <span
              className={
                currentStep >= 4
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-500'
              }
            >
              Payment
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 &&
                  (!bookingData.eventName ||
                    !bookingData.eventType ||
                    !bookingData.date ||
                    !bookingData.venue)) ||
                (currentStep === 2 && bookingData.selectedVendors.length === 0)
              }
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleBookingSubmit}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Pay ₹{bookingData.advanceAmount.toLocaleString()} & Confirm
              Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Vendor Card Component with Budget Selection
const VendorCard: React.FC<{
  vendor: Vendor;
  isSelected: boolean;
  onAdd: (vendor: Vendor, selectedBudget?: number) => void;
}> = ({ vendor, isSelected, onAdd }) => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(vendor.priceMin);
  const navigate = useNavigate();

  const budgetOptions = [
    { value: vendor.priceMin, label: `Basic - ₹${vendor.priceMin.toLocaleString()}` },
    { value: Math.round((vendor.priceMin + vendor.priceMax) / 2), label: `Standard - ₹${Math.round((vendor.priceMin + vendor.priceMax) / 2).toLocaleString()}` },
    { value: vendor.priceMax, label: `Premium - ₹${vendor.priceMax.toLocaleString()}` }
  ];

  const handleAddWithBudget = () => {
    onAdd(vendor, selectedBudget);
    setShowBudgetModal(false);
  };

  return (
    <>
      <div
        className={`border-2 rounded-xl p-4 transition-all duration-300 ${
          isSelected
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-200 hover:border-purple-300'
        }`}
      >
        <div className="relative mb-4">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          {isSelected && (
            <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        <h4 className="font-bold text-gray-900 mb-1">{vendor.name}</h4>
        <p className="text-purple-600 font-medium mb-2">{vendor.service}</p>

        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-sm text-gray-600">{vendor.rating}</span>
          <span className="text-sm text-gray-500 ml-2">• {vendor.experience}</span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{vendor.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {vendor.specialties.slice(0, 2).map((specialty, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-purple-600">{vendor.price}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/vendors/${vendor.id}`)}
              className="text-purple-600 hover:text-purple-700 p-2"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-sm"
            >
              {isSelected ? 'Add More' : 'Add'}
            </button>
          </div>
        </div>
      </div>

      {/* Budget Selection Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Budget</h3>
              <button
                onClick={() => setShowBudgetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{vendor.name}</h4>
              <p className="text-gray-600 text-sm">{vendor.service}</p>
            </div>

            <div className="space-y-3 mb-6">
              {budgetOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedBudget === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={option.value}
                    checked={selectedBudget === option.value}
                    onChange={(e) => setSelectedBudget(parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                  {selectedBudget === option.value && (
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  )}
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWithBudget}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Add to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPage;