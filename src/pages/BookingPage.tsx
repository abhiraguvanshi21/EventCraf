import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Star, 
  CheckCircle, 
  ArrowLeft,
  CreditCard,
  Smartphone,
  MessageCircle,
  Wallet,
  Shield,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


// Mock vendor data - in a real app, this would come from an API
const mockVendors = [
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

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, saveBookingData } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVendors, setSelectedVendors] = useState<Array<{
    vendor: typeof mockVendors[0];
    quantity: number;
    selectedBudget?: number;
  }>>([]);

  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventType: searchParams.get('service') || '',
    date: '',
    time: '',
    venue: '',
    guestCount: '',
    budget: '',
    description: '',
    theme: '',
    specialRequirements: ''
  });

  const [contactInfo, setContactInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    alternatePhone: '',
    address: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [userUpiId, setUserUpiId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Company payment details
  const companyUpiId = 'eventcraft@paytm';
  const companyPhone = '+91 9161036941';

  const upiApps = [
    { id: 'paytm', name: 'Paytm', scheme: 'paytmmp' },
    { id: 'phonepe', name: 'PhonePe', scheme: 'phonepe' },
    { id: 'googlepay', name: 'Google Pay', scheme: 'tez' },
    { id: 'bhim', name: 'BHIM UPI', scheme: 'bhim' }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/booking' } } });
    }
  }, [user, navigate]);

  const handleEventDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleVendorSelection = (vendor: typeof mockVendors[0], quantity: number, budget?: number) => {
    const existingIndex = selectedVendors.findIndex(v => v.vendor.id === vendor.id);
    
    if (existingIndex >= 0) {
      const updated = [...selectedVendors];
      updated[existingIndex] = { vendor, quantity, selectedBudget: budget };
      setSelectedVendors(updated);
    } else {
      setSelectedVendors([...selectedVendors, { vendor, quantity, selectedBudget: budget }]);
    }
  };

  const removeVendor = (vendorId: string) => {
    setSelectedVendors(selectedVendors.filter(v => v.vendor.id !== vendorId));
  };

  const calculateTotal = () => {
    return selectedVendors.reduce((total, { vendor, quantity, selectedBudget }) => {
      const cost = selectedBudget || vendor.priceMin;
      const totalCost = vendor.service.includes('person') 
        ? cost * parseInt(eventDetails.guestCount || '50') * quantity
        : cost * quantity;
      return total + totalCost;
    }, 0);
  };

  const totalAmount = calculateTotal();
  const advanceAmount = Math.round(totalAmount * 0.3); // 30% advance
  const remainingAmount = totalAmount - advanceAmount;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVendors.length === 0) {
      alert('Please select at least one vendor before proceeding to payment.');
      return;
    }
    setCurrentStep(3);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleUpiPayment = async () => {
    if (!selectedUpiApp || !userUpiId || !contactInfo.phone) {
      alert('Please select UPI app, enter your UPI ID, and provide phone number');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStatus('processing');

    try {
      // Create UPI payment URL
      const upiUrl = `upi://pay?pa=${companyUpiId}&pn=EventCraft&am=${advanceAmount}&cu=INR&tn=Event Booking Advance Payment`;
      
      // Try to open the selected UPI app
      const app = upiApps.find(app => app.id === selectedUpiApp);
      if (app) {
        // Create app-specific URL
        const appUrl = `${app.scheme}://upi/pay?pa=${companyUpiId}&pn=EventCraft&am=${advanceAmount}&cu=INR&tn=Event Booking Advance Payment`;
        
        // Try to open the app
        window.location.href = appUrl;
        
        // Fallback to generic UPI URL after a delay
        setTimeout(() => {
          window.location.href = upiUrl;
        }, 2000);
      }

      // Send WhatsApp message with payment details
      const whatsappMessage = `Hi! I want to make payment for event booking.
      
*Payment Details:*
- Amount: ₹${advanceAmount.toLocaleString()}
- UPI ID: ${companyUpiId}
- My UPI ID: ${userUpiId}
- Phone: ${contactInfo.phone}
- Event: ${eventDetails.eventName || eventDetails.eventType}
- Date: ${eventDetails.date}

Please confirm payment receipt.`;

      const whatsappUrl = `https://wa.me/${companyPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus('completed');
        setIsProcessingPayment(false);
        
        // Save booking data
        const bookingData = {
          ...eventDetails,
          ...contactInfo,
          selectedVendors,
          totalAmount,
          advanceAmount,
          paymentMethod: `UPI - ${app?.name}`,
          userUpiId,
          companyUpiId,
          id: Date.now().toString(),
          paidAmount: advanceAmount,
          status: 'confirmed' as "confirmed" | "completed" | "pending",
          bookingDate: new Date().toISOString(),
        };
        
        saveBookingData(bookingData);
        setCurrentStep(4);
      }, 3000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      setIsProcessingPayment(false);
      alert('Payment failed. Please try again.');
    }
  };

  const handlePhonePayment = () => {
    if (!contactInfo.phone) {
      alert('Please provide your phone number');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStatus('processing');

    const whatsappMessage = `Hi! I want to make payment for event booking.
    
*Payment Details:*
- Amount: ₹${advanceAmount.toLocaleString()}
- Company UPI ID: ${companyUpiId}
- My Phone: ${contactInfo.phone}
- Event: ${eventDetails.eventName || eventDetails.eventType}
- Date: ${eventDetails.date}

Please send me payment link or UPI details.`;

    const whatsappUrl = `https://wa.me/${companyPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setPaymentStatus('completed');
      setIsProcessingPayment(false);
      
      const bookingData = {
        ...eventDetails,
        ...contactInfo,
        selectedVendors,
        totalAmount,
        advanceAmount,
        paymentMethod: 'Phone Payment',
        companyUpiId,
        id: Date.now().toString(),
        paidAmount: advanceAmount,
        status: 'confirmed' as "confirmed" | "completed" | "pending",
        bookingDate: new Date().toISOString(),
      };
      
      saveBookingData(bookingData);
      setCurrentStep(4);
    }, 2000);
  };

  const handleCardPayment = () => {
    if (!contactInfo.phone) {
      alert('Please provide your phone number');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStatus('processing');

    // Simulate card payment processing
    setTimeout(() => {
      setPaymentStatus('completed');
      setIsProcessingPayment(false);
      
      const bookingData = {
        ...eventDetails,
        ...contactInfo,
        selectedVendors,
        totalAmount,
        advanceAmount,
        paymentMethod: 'Card Payment',
        companyUpiId,
        id: Date.now().toString(),
        paidAmount: advanceAmount,
        status: 'confirmed' as "confirmed" | "completed" | "pending",
        bookingDate: new Date().toISOString(),
      };
      
      saveBookingData(bookingData);
      setCurrentStep(4);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to book an event.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Event</h1>
          <p className="text-xl text-gray-600">Let's create something magical together</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Event Details</h2>
            <form onSubmit={handleEventDetailsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                  <input
                    type="text"
                    value={eventDetails.eventName}
                    onChange={(e) => setEventDetails({...eventDetails, eventName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter event name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                  <select
                    value={eventDetails.eventType}
                    onChange={(e) => setEventDetails({...eventDetails, eventType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="family-function">Family Function</option>
                    <option value="anniversary">Anniversary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                  <input
                    type="date"
                    value={eventDetails.date}
                    onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
                  <input
                    type="time"
                    value={eventDetails.time}
                    onChange={(e) => setEventDetails({...eventDetails, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue/Location *</label>
                  <input
                    type="text"
                    value={eventDetails.venue}
                    onChange={(e) => setEventDetails({...eventDetails, venue: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter venue or location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests *</label>
                  <input
                    type="number"
                    value={eventDetails.guestCount}
                    onChange={(e) => setEventDetails({...eventDetails, guestCount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Expected number of guests"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={eventDetails.budget}
                    onChange={(e) => setEventDetails({...eventDetails, budget: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-50000">Under ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-250000">₹1,00,000 - ₹2,50,000</option>
                    <option value="250000-500000">₹2,50,000 - ₹5,00,000</option>
                    <option value="over-500000">Over ₹5,00,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme/Style</label>
                  <input
                    type="text"
                    value={eventDetails.theme}
                    onChange={(e) => setEventDetails({...eventDetails, theme: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Traditional, Modern, Floral"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
                <textarea
                  value={eventDetails.description}
                  onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe your event vision and requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  value={eventDetails.specialRequirements}
                  onChange={(e) => setEventDetails({...eventDetails, specialRequirements: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Any special requirements or requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold text-lg"
              >
                Continue to Vendor Selection
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Vendor Selection */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Vendors</h2>
              
              {/* Selected Vendors Summary */}
              {selectedVendors.length > 0 && (
                <div className="mb-8 p-6 bg-purple-50 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Vendors</h3>
                  <div className="space-y-4">
                    {selectedVendors.map(({ vendor, quantity, selectedBudget }) => (
                      <div key={vendor.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img src={vendor.image} alt={vendor.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                            <p className="text-purple-600 text-sm">{vendor.service}</p>
                            <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ₹{((selectedBudget || vendor.priceMin) * 
                              (vendor.service.includes('person') ? parseInt(eventDetails.guestCount || '50') : 1) * 
                              quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeVendor(vendor.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-purple-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Available Vendors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onSelect={handleVendorSelection}
                    isSelected={selectedVendors.some(v => v.vendor.id === vendor.id)}
                    guestCount={parseInt(eventDetails.guestCount || '50')}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-400 transition-colors duration-300 font-semibold"
                >
                  Back to Event Details
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
                  disabled={selectedVendors.length === 0}
                >
                  Continue to Contact & Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Payment */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                    <input
                      type="tel"
                      value={contactInfo.alternatePhone}
                      onChange={(e) => setContactInfo({...contactInfo, alternatePhone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter your complete address"
                  />
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment Details</h2>
              
              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advance Payment (30%):</span>
                    <span className="font-bold text-purple-600">₹{advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Amount:</span>
                    <span className="font-semibold">₹{remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Company Payment Info */}
                <div className="mt-6 pt-6 border-t border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-3">Payment will be received by:</h4>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company UPI ID:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-purple-600">{companyUpiId}</span>
                        <button
                          onClick={() => copyToClipboard(companyUpiId)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company Phone:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{companyPhone}</span>
                        <button
                          onClick={() => copyToClipboard(companyPhone)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Choose Payment Method</h3>
                
                {/* UPI Payment */}
                <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'upi' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`} onClick={() => setPaymentMethod('upi')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-6 w-6 text-purple-600" />
                      <span className="text-lg font-semibold">UPI Payment</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-purple-600"
                    />
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your UPI ID *</label>
                        <input
                          type="text"
                          value={userUpiId}
                          onChange={(e) => setUserUpiId(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="yourname@paytm / yourname@phonepe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select UPI App *</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {upiApps.map((app) => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => setSelectedUpiApp(app.id)}
                              className={`p-3 border-2 rounded-lg text-center transition-all duration-300 ${
                                selectedUpiApp === app.id
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              <div className="font-semibold">{app.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={handleUpiPayment}
                        disabled={!selectedUpiApp || !userUpiId || !contactInfo.phone || isProcessingPayment}
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-5 w-5 mr-2" />
                            Pay ₹{advanceAmount.toLocaleString()} via UPI
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Phone Payment */}
                <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'phone' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`} onClick={() => setPaymentMethod('phone')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-6 w-6 text-green-600" />
                      <span className="text-lg font-semibold">Phone Payment</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="phone"
                      checked={paymentMethod === 'phone'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-purple-600"
                    />
                  </div>
                  
                  {paymentMethod === 'phone' && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-semibold text-green-800">WhatsApp Payment</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          Click below to send a WhatsApp message with payment details. Our team will assist you with the payment process.
                        </p>
                      </div>
                      
                      <button
                        onClick={handlePhonePayment}
                        disabled={!contactInfo.phone || isProcessingPayment}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-5 w-5 mr-2" />
                            Send WhatsApp for Payment
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Payment */}
                <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`} onClick={() => setPaymentMethod('card')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-semibold">Card Payment</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-purple-600"
                    />
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Shield className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-blue-800">Secure Card Payment</span>
                        </div>
                        <p className="text-blue-700 text-sm">
                          Pay securely using your debit/credit card. Your payment information is encrypted and secure.
                        </p>
                      </div>
                      
                      <button
                        onClick={handleCardPayment}
                        disabled={!contactInfo.phone || isProcessingPayment}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-5 w-5 mr-2" />
                            Pay ₹{advanceAmount.toLocaleString()} via Card
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Status */}
              {paymentStatus && (
                <div className={`mt-6 p-4 rounded-lg ${
                  paymentStatus === 'completed' ? 'bg-green-50 border border-green-200' :
                  paymentStatus === 'processing' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {paymentStatus === 'completed' && <CheckCircle className="h-5 w-5 text-green-600 mr-2" />}
                    {paymentStatus === 'processing' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-2"></div>}
                    {paymentStatus === 'failed' && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
                    <span className={`font-semibold ${
                      paymentStatus === 'completed' ? 'text-green-800' :
                      paymentStatus === 'processing' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      {paymentStatus === 'completed' && 'Payment Successful!'}
                      {paymentStatus === 'processing' && 'Processing Payment...'}
                      {paymentStatus === 'failed' && 'Payment Failed'}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-400 transition-colors duration-300 font-semibold"
                >
                  Back to Vendors
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-gray-600">
                Thank you for choosing EventCraft. Your event booking has been confirmed.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-600">Event:</span>
                  <p className="font-semibold">{eventDetails.eventName || eventDetails.eventType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-semibold">{eventDetails.date}</p>
                </div>
                <div>
                  <span className="text-gray-600">Venue:</span>
                  <p className="font-semibold">{eventDetails.venue}</p>
                </div>
                <div>
                  <span className="text-gray-600">Guests:</span>
                  <p className="font-semibold">{eventDetails.guestCount}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <p className="font-semibold text-purple-600">₹{totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Advance Paid:</span>
                  <p className="font-semibold text-green-600">₹{advanceAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Our team will contact you within 24 hours to confirm all details and coordinate with your selected vendors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/planning')}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
                >
                  View Planning Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300 font-semibold"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Vendor Card Component
const VendorCard = ({ vendor, onSelect, isSelected, guestCount }: {
  vendor: typeof mockVendors[0];
  onSelect: (vendor: typeof mockVendors[0], quantity: number, budget?: number) => void;
  isSelected: boolean;
  guestCount: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedBudget, setSelectedBudget] = useState<number>(vendor.priceMin);

  const calculateCost = () => {
    const cost = vendor.service.includes('person') 
      ? selectedBudget * guestCount * quantity
      : selectedBudget * quantity;
    return cost;
  };

  return (
    <div className={`border-2 rounded-xl p-6 transition-all duration-300 ${
      isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
    }`}>
      <div className="flex items-center mb-4">
        <img src={vendor.image} alt={vendor.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>
          <p className="text-purple-600 text-sm">{vendor.service}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm font-medium">{vendor.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={vendor.priceMin}
              max={vendor.priceMax}
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium text-purple-600 min-w-[100px]">
              ₹{selectedBudget.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Cost:</span>
            <span className="font-bold text-green-600">₹{calculateCost().toLocaleString()}</span>
          </div>
          {vendor.service.includes('person') && (
            <p className="text-xs text-gray-500 mt-1">
              ₹{selectedBudget} × {guestCount} guests × {quantity} = ₹{calculateCost().toLocaleString()}
            </p>
          )}
        </div>

        <button
          onClick={() => onSelect(vendor, quantity, selectedBudget)}
          className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            isSelected
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
          }`}
        >
          {isSelected ? 'Update Selection' : 'Select Vendor'}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;