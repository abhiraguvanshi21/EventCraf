import { useEffect, useState } from "react";
import { Star, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  image: string;
  specialties: string[];
  description: string;
  experience: string;
  priceRange: string;
  availability: string;
  portfolio: string[];
  website?: string;
  services?: string[];
  testimonials?: {
    name: string;
    event: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  packages?: {
    name: string;
    price: string;
    features: string[];
  }[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  vendors: Vendor[];
}

interface LocalVendor {
  id: number;
  name: string;
  email: string;
  shopName: string;
  vendorType: string;
  rating?: number;
  reviews?: number;
  location?: string;
  phone?: string;
}

const currentUser = JSON.parse(
  localStorage.getItem("eventcraft_user") || "null"
);
const isAdmin = currentUser?.email === "admin@eventcraft.com";

const initialCategories: Category[] = [
  {
    id: "tent-canopy",
    name: "Tent & Canopy Services",
    description: "Professional tent and canopy rental services",
    image:
      "https://ts4.mm.bing.net/th?id=OIP.pzsIeXOfUfiGxZUFwJ_VwwHaE4&pid=15.1",
    vendors: [
      {
        id: "elite-tent-house",
        name: "Elite Tent House",
        category: "Tent & Canopy Services",
        rating: 4.9,
        reviews: 156,
        location: "Downtown District",
        phone: "+91 9161036941",
        email: "elite@tentservice.com",
        website: "www.elitetents.com",
        image:
          "https://ts2.mm.bing.net/th?id=OIP.YS8eBW2QTg0nuKADBkzNDQHaE8&pid=15.1",
        specialties: [
          "Wedding Tents",
          "Corporate Canopies",
          "Outdoor Events",
          "Weather Protection",
        ],
        description:
          "Premium tent rental service with over 10 years of experience. We provide high-quality tents and canopies for all types of events.",
        experience: "10+ years",
        priceRange: "₹5,000 - ₹50,000",
        availability: "Available 7 days a week",
        services: [
          "Wedding Tent Rental",
          "Corporate Canopy Setup",
          "Outdoor Event Structures",
          "Weather Protection Solutions",
          "Custom Tent Designs",
          "Installation & Setup",
          "Maintenance Support",
          "Emergency Services",
        ],
        portfolio: [
          "https://ts3.mm.bing.net/th?id=OIP.0LdXagidl5_xUkbCTeuuRgHaFb&pid=15.1",
          "https://ts2.mm.bing.net/th?id=OIP.cJZENEmIGUuaV9IqXBOMzAHaE8&pid=15.1",
          "https://ts1.mm.bing.net/th?id=OIP.TDIupbtGCWKQQnUnBg_EzwHaE8&pid=15.1",
          "https://ts3.mm.bing.net/th?id=OIP.mGg20sD_4VSmdSvEzm6TtAHaHa&pid=15.1",
          "https://i.pinimg.com/originals/7b/3f/25/7b3f2586efa311ffee6abd50654a0a1c.jpg",
          "https://ts1.mm.bing.net/th?id=OIP.ACITNQ937AoxJQK7TGxmgwAAAA&pid=15.1",
        ],
        testimonials: [
          {
            name: "Rajesh Kumar",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Excellent service! The tent setup was perfect and the team was very professional.",
            date: "November 2024",
          },
          {
            name: "Priya Sharma",
            event: "Corporate Event",
            rating: 5,
            comment:
              "Great quality tents and timely installation. Highly recommended!",
            date: "October 2024",
          },
        ],
        packages: [
          {
            name: "Basic Tent Package",
            price: "₹5,000 - ₹15,000",
            features: [
              "Standard tent setup",
              "Basic installation",
              "Weather protection",
              "24-hour rental",
            ],
          },
          {
            name: "Premium Wedding Package",
            price: "₹20,000 - ₹35,000",
            features: [
              "Luxury tent setup",
              "Decorative elements",
              "Professional installation",
              "Extended rental period",
            ],
          },
          {
            name: "Corporate Event Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Large capacity tents",
              "Corporate branding",
              "Professional setup",
              "Full-day service",
            ],
          },
        ],
      },
      {
        id: "royal-canopy-solutions",
        name: "Royal Canopy Solutions",
        category: "Tent & Canopy Services",
        rating: 4.9,
        reviews: 156,
        location: "Central City",
        phone: "+91 8840192922",
        email: "royal@canopy.com",
        website: "www.elitetents.com",
        image:
          "https://miro.medium.com/v2/resize:fit:680/1*k4KnvmuXCE7PUffnU48mEQ.jpeg",
        specialties: [
          "Wedding Tents",
          "Corporate Canopies",
          "Outdoor Events",
          "Weather Protection",
        ],
        description:
          "Royal Canopy Solutions service with over 8 years of experience. We provide high-quality tents and canopies for all types of events.",
        experience: "8+ years",
        priceRange: "₹5,000 - ₹75,000",
        availability: "Available 7 days a week",
        services: [
          "Wedding Tent Rental",
          "Corporate Canopy Setup",
          "Outdoor Event Structures",
          "Weather Protection Solutions",
          "Custom Tent Designs",
          "Installation & Setup",
          "Maintenance Support",
          "Emergency Services",
        ],
        portfolio: [
          "https://ts3.mm.bing.net/th?id=OIP.G6sSHlxnAz6dK72McNtxRgHaGL&pid=15.1",
          "https://www.indiantents.com/wp-content/uploads/2023/07/Indian-Tents-1-150x150.jpg",
          "https://ts3.mm.bing.net/th?id=OIP.Doh_BfKfG2WytWdgMYZNkQHaIN&pid=15.1",
          "https://ts3.mm.bing.net/th?id=OIP.-VEiNfm5DGEMiJkfhFM-DgHaFj&pid=15.1",
          "https://ts4.mm.bing.net/th?id=OIP.Pcd-rZYvqTGz2LfUsRuorwHaCP&pid=15.1",
          "https://ts1.mm.bing.net/th?id=OIP.ACITNQ937AoxJQK7TGxmgwAAAA&pid=15.1",
        ],
        testimonials: [
          {
            name: "Rakesh Kumar",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Excellent service! The tent setup was perfect and the team was very professional.",
            date: "November 2023",
          },
          {
            name: "Riya Sharma",
            event: "Corporate Event",
            rating: 5,
            comment:
              "Great quality tents and timely installation. Highly recommended!",
            date: "October 2022",
          },
        ],
        packages: [
          {
            name: "Basic Tent Package",
            price: "₹5,000 - ₹15,000",
            features: [
              "Standard tent setup",
              "Basic installation",
              "Weather protection",
              "24-hour rental",
            ],
          },
          {
            name: "Premium Wedding Package",
            price: "₹20,000 - ₹35,000",
            features: [
              "Luxury tent setup",
              "Decorative elements",
              "Professional installation",
              "Extended rental period",
            ],
          },
          {
            name: "Corporate Event Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Large capacity tents",
              "Corporate branding",
              "Professional setup",
              "Full-day service",
            ],
          },
        ],
      },
      {
        id: "weather-shield-tents",
        name: "Weather Shield Tents",
        category: "Tent & Canopy Services",
        rating: 4.6,
        reviews: 124,
        location: "Garden District",
        phone: "+91 7007635630",
        email: "weather@shield.com",
        image:
          "https://images.squarespace-cdn.com/content/v1/56589d96e4b0c377c45acf92/1660586796539-AK4SKPC583KH9ROKQV5B/Grand+Pavilion+in+Canary+Yellow+and+White.jpg",
        specialties: [
          "Waterproof Tents",
          "Wind Resistant",
          "Large Capacity",
          "Quick Setup",
        ],
        description:
          "Specialized in weather-resistant tent solutions. Perfect for outdoor events in any season.",
        experience: "12+ years",
        priceRange: "₹6,000 - ₹60,000",
        availability: "Available 24/7",
        services: [
          "Wedding Tent Rental",
          "Corporate Canopy Setup",
          "Outdoor Event Structures",
          "Weather Protection Solutions",
          "Custom Tent Designs",
          "Installation & Setup",
          "Maintenance Support",
          "Emergency Services",
        ],
        portfolio: [
          "https://cdn0.weddingwire.in/vendor/1064/3_2/960/jpg/file-1585034001631_15_131064-158503400653699.jpeg",
          "https://www.shaadidukaan.com/user_files/d_c_images/4-53.jpg",
          "https://image.wedmegood.com/resized/720X/uploads/member/3247446/1657093596_WhatsApp_Image_2022_07_06_at_1.15.39_PM__2_.jpeg",
          "https://www.bharattentmanu.com/img/luxarywedding/luxuarywedding-02.jpg",
          "https://cdn0.weddingwire.in/vendor/4296/3_2/960/jpg/c3c13b90-4bc6-4c6c-b650-77ff4244375c_15_114296.jpeg",
          "https://miro.medium.com/v2/resize:fit:1128/1*Qc6VuYkNegVi6w_-oc--WA.jpeg",
        ],
        testimonials: [
          {
            name: "Rakesh Kumar",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Excellent service! The tent setup was perfect and the team was very professional.",
            date: "November 2023",
          },
          {
            name: "Riya Sharma",
            event: "Corporate Event",
            rating: 5,
            comment:
              "Great quality tents and timely installation. Highly recommended!",
            date: "October 2022",
          },
        ],
        packages: [
          {
            name: "Basic Tent Package",
            price: "₹5,000 - ₹15,000",
            features: [
              "Standard tent setup",
              "Basic installation",
              "Weather protection",
              "24-hour rental",
            ],
          },
          {
            name: "Premium Wedding Package",
            price: "₹20,000 - ₹35,000",
            features: [
              "Luxury tent setup",
              "Decorative elements",
              "Professional installation",
              "Extended rental period",
            ],
          },
          {
            name: "Corporate Event Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Large capacity tents",
              "Corporate branding",
              "Professional setup",
              "Full-day service",
            ],
          },
        ],
      },
      {
        id: "ayush-tent-house",
        name: "Ayush Tent House",
        category: "Tent & Canopy Services",
        rating: 4.9,
        reviews: 124,
        location: "Maharua Gola Ambedkarnagar",
        phone: "+91 9918322023",
        email: "Ayushtenthouse@gmail.com",
        image:
          "https://ts1.mm.bing.net/th?id=OIP.WG3fuPUtoca5bhlsx6XnVQHaE8&pid=15.1",
        specialties: [
          "Waterproof Tents",
          "Wind Resistant",
          "Large Capacity",
          "Quick Setup",
        ],
        description:
          "Specialized in weather-resistant tent solutions. Perfect for outdoor events in any season.",
        experience: "12+ years",
        priceRange: "₹16,000 - ₹5,00,000",
        availability: "Available 24/7",
        services: [
          "Wedding Tent Rental",
          "Corporate Canopy Setup",
          "Outdoor Event Structures",
          "Weather Protection Solutions",
          "Custom Tent Designs",
          "Installation & Setup",
          "Maintenance Support",
          "Emergency Services",
        ],
        portfolio: [
          "https://thumbs.dreamstime.com/b/decorative-tents-used-indian-weddings-210293034.jpg",
          "https://thumbs.dreamstime.com/b/wedding-indian-tent-new-delhi-61710824.jpg",
          "https://cdn0.weddingwire.in/vendor/6441/3_2/960/jpg/tent-house-rupesh-tent-house-wedding-tenting1_15_306441-158919434914206.jpeg",
          "https://4.imimg.com/data4/YN/FY/MY-18792217/wedding-tents-1000x1000.jpg",
          "https://content3.jdmagicbox.com/v2/comp/rudrapur/p3/9999p5944.5944.140309095134.j5p3/catalogue/maa-sharda-tent-house-and-decorators-bhurarani-rudrapur-wedding-mandap-decorators-viktel09ax.jpg",
          "https://content.jdmagicbox.com/comp/def_content/pandal-decorators/pandal-decorators-3-pandal-decorators-10-usqr0.jpg",
        ],
        testimonials: [
          {
            name: "Rakesh Kumar",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Excellent service! The tent setup was perfect and the team was very professional.",
            date: "November 2023",
          },
          {
            name: "Riya Sharma",
            event: "Corporate Event",
            rating: 5,
            comment:
              "Great quality tents and timely installation. Highly recommended!",
            date: "October 2022",
          },
        ],
        packages: [
          {
            name: "Basic Tent Package",
            price: "₹5,000 - ₹15,000",
            features: [
              "Standard tent setup",
              "Basic installation",
              "Weather protection",
              "24-hour rental",
            ],
          },
          {
            name: "Premium Wedding Package",
            price: "₹20,000 - ₹35,000",
            features: [
              "Luxury tent setup",
              "Decorative elements",
              "Professional installation",
              "Extended rental period",
            ],
          },
          {
            name: "Corporate Event Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Large capacity tents",
              "Corporate branding",
              "Professional setup",
              "Full-day service",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "catering",
    name: "Food & Catering",
    description: "Delicious catering services with diverse menu options",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
    vendors: [
      {
        id: "gourmet-catering",
        name: "Gourmet Catering Co.",
        category: "Food & Catering",
        rating: 4.8,
        reviews: 203,
        location: "Food District",
        phone: "+91 9876543210",
        email: "gourmet@catering.com",
        website: "www.gourmetcatering.com",
        image:
          "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
        specialties: [
          "Multi-cuisine",
          "Live Counters",
          "Custom Menus",
          "Dietary Options",
        ],
        description:
          "Premium catering service offering multi-cuisine options with live cooking stations and customized menus.",
        experience: "15+ years",
        priceRange: "₹300 - ₹1,500 per person",
        availability: "Available daily",
        services: [
          "Multi-cuisine Catering",
          "Live Cooking Stations",
          "Custom Menu Planning",
          "Dietary Accommodations",
          "Buffet Services",
          "Plated Dinners",
          "Cocktail Catering",
          "Dessert Stations",
        ],
        portfolio: [
          "https://skcaterers.in/img/services/wedding.jpg",
          "https://www.gharoacatering.com/wp-content/uploads/elementor/thumbs/wedding-catering-services-in-kolkata-with-gharoa-catering--quanbfx0kmclt684kuga98adjzhzhmetgjaulol0fk.jpg",
          "https://media.istockphoto.com/id/1472804671/photo/luxury-delicious-appetizer-serving.jpg?s=612x612&w=0&k=20&c=2anc2oN7XNMcsygVv-S6wCV07ekrXb2SAoJPuiIeuS0=",
          "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/2034451/421437_247319.png",
          "https://sweet-n-sour.in/wp-content/uploads/2019/11/outdoor-catering-services-5.jpg",
        ],
        testimonials: [
          {
            name: "Anita Patel",
            event: "Wedding Reception",
            rating: 5,
            comment:
              "Amazing food quality and presentation. All our guests were impressed!",
            date: "December 2024",
          },
          {
            name: "Vikram Singh",
            event: "Corporate Lunch",
            rating: 5,
            comment:
              "Professional service and delicious food. Perfect for our business event.",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Catering",
            price: "₹300 - ₹500 per person",
            features: [
              "Standard menu",
              "Buffet service",
              "Basic presentation",
              "Standard service staff",
            ],
          },
          {
            name: "Premium Catering",
            price: "₹600 - ₹1,000 per person",
            features: [
              "Multi-cuisine menu",
              "Live counters",
              "Enhanced presentation",
              "Professional service",
            ],
          },
          {
            name: "Luxury Catering",
            price: "₹1,100 - ₹1,500 per person",
            features: [
              "Gourmet menu",
              "Multiple live stations",
              "Premium presentation",
              "Full-service experience",
            ],
          },
        ],
      },
      {
        id: "spice-garden-catering",
        name: "Spice Garden Catering",
        category: "Food & Catering",
        rating: 4.9,
        reviews: 167,
        location: "Spice Market",
        phone: "+91 7654321098",
        email: "spice@garden.com",
        image:
          "https://ts2.mm.bing.net/th?id=OIP.VTL4f8H6N8bNlia5oJ2gTwHaE7&pid=15.1",
        specialties: [
          "Indian Cuisine",
          "Traditional Recipes",
          "Authentic Flavors",
          "Regional Specialties",
        ],
        description:
          "Authentic Indian catering with traditional recipes and regional specialties. Perfect for cultural events.",
        experience: "20+ years",
        priceRange: "₹250 - ₹1,200 per person",
        availability: "Mon-Sun, 8 AM - 10 PM",
        services: [
          "Multi-cuisine Catering",
          "Live Cooking Stations",
          "Custom Menu Planning",
          "Dietary Accommodations",
          "Buffet Services",
          "Plated Dinners",
          "Cocktail Catering",
          "Dessert Stations",
        ],
        portfolio: [
          "https://lh6.googleusercontent.com/proxy/dJbW6H4qwbLOgp0ZSvtK549kn-f2K23rLuKMWw_RejRFp5hgwgtjT6mXmXlVwl4nSRCh37zdQJKop1d9hinaQ0Si_XADv0nI7Eex8gGL0kI",
          "https://craftmyplate.com/wp-content/uploads/2024/03/Copy-of-_MG_0214-scaled.jpg",
          "https://www.saitradingcompany.co/wp-content/uploads/2025/05/Wedding-caterers-in-Delhi-e1559899746776.jpg",
          "https://img.freepik.com/free-photo/waiter-carries-plate-with-tasty-snacks_8353-1263.jpg",
          "https://www.mindstick.com/MindStickArticle/b6d18478-e0fd-4b64-8a41-070d76fd18cf/images/60d93720-4876-47e7-9955-3d3f0a37b109.jpeg",
        ],
        testimonials: [
          {
            name: "Anita Patel",
            event: "Wedding Reception",
            rating: 5,
            comment:
              "Amazing food quality and presentation. All our guests were impressed!",
            date: "December 2024",
          },
          {
            name: "Vikram Singh",
            event: "Corporate Lunch",
            rating: 5,
            comment:
              "Professional service and delicious food. Perfect for our business event.",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Catering",
            price: "₹300 - ₹500 per person",
            features: [
              "Standard menu",
              "Buffet service",
              "Basic presentation",
              "Standard service staff",
            ],
          },
          {
            name: "Premium Catering",
            price: "₹600 - ₹1,000 per person",
            features: [
              "Multi-cuisine menu",
              "Live counters",
              "Enhanced presentation",
              "Professional service",
            ],
          },
          {
            name: "Luxury Catering",
            price: "₹1,100 - ₹1,500 per person",
            features: [
              "Gourmet menu",
              "Multiple live stations",
              "Premium presentation",
              "Full-service experience",
            ],
          },
        ],
      },
      {
        id: "the-food-stories",
        name: "The Food Stories",
        category: "Food & Catering",
        rating: 4.9,
        reviews: 77,
        location: "Main Market",
        phone: "+91 7654321098",
        email: "food@store.com",
        image:
          "https://ts1.mm.bing.net/th?id=OIP.U2drnVZY_r_e2GE7zCcRYgHaFj&pid=15.1",
        specialties: [
          "Indian Cuisine",
          "Traditional Recipes",
          "Authentic Flavors",
          "Regional Specialties",
        ],
        description:
          "provides fresh, delicious meals for events, parties, and gatherings",
        experience: "29+ years",
        priceRange: "₹250 - ₹1,200 per person",
        availability: "Mon-Sun, 8 AM - 10 PM",
        services: [
          "Multi-cuisine Catering",
          "Live Cooking Stations",
          "Custom Menu Planning",
          "Dietary Accommodations",
          "Buffet Services",
          "Plated Dinners",
          "Cocktail Catering",
          "Dessert Stations",
        ],
        portfolio: [
          "https://t4.ftcdn.net/jpg/02/71/43/75/360_F_271437574_doTjDM96i4VpYYU68nFLpjLA2rOlSh5v.jpg",
          "https://static.toiimg.com/thumb/msid-117376795,width-1280,height-720,imgsize-102974,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
          "https://image.wedmegood.com/resized/720X/uploads/member/30927/1451475490_Go_Ranga_Caterers_010.jpg",
          "https://stubbys.com/wp-content/uploads/2022/10/LM-2.jpg",
          "https://image.wedmegood.com/resized/720X/uploads/member/26327/1489017982_1449133884_Best_wedding_caterers_in_kolkata_Continental_catering_services_WedMeGood__5_.jpg",
        ],
        testimonials: [
          {
            name: "Anita Patel",
            event: "Wedding Reception",
            rating: 5,
            comment:
              "Amazing food quality and presentation. All our guests were impressed!",
            date: "December 2024",
          },
          {
            name: "Vikram Singh",
            event: "Corporate Lunch",
            rating: 5,
            comment:
              "Professional service and delicious food. Perfect for our business event.",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Catering",
            price: "₹300 - ₹500 per person",
            features: [
              "Standard menu",
              "Buffet service",
              "Basic presentation",
              "Standard service staff",
            ],
          },
          {
            name: "Premium Catering",
            price: "₹600 - ₹1,000 per person",
            features: [
              "Multi-cuisine menu",
              "Live counters",
              "Enhanced presentation",
              "Professional service",
            ],
          },
          {
            name: "Luxury Catering",
            price: "₹1,100 - ₹1,500 per person",
            features: [
              "Gourmet menu",
              "Multiple live stations",
              "Premium presentation",
              "Full-service experience",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "floral",
    name: "Floral Design",
    description: "Beautiful floral arrangements and venue decoration",
    image:
      "https://ts4.mm.bing.net/th?id=OIP.RmmfZU_xoeathtbqOuMLegHaJQ&pid=15.1",
    vendors: [
      {
        id: "bloom-blossom",
        name: "Bloom & Blossom",
        category: "Floral Design",
        rating: 4.9,
        reviews: 189,
        location: "Garden District",
        phone: "+91 8765432109",
        email: "bloom@blossom.com",
        website: "www.bloomblossom.com",
        image:
          "https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/1280/jpg/articulos-india/2019/non-troncales/indian-flowers/flagship-by-fnp-indian-flowers-cover.webp",
        specialties: [
          "Bridal Bouquets",
          "Centerpieces",
          "Venue Decoration",
          "Seasonal Arrangements",
        ],
        description:
          "Expert floral designers creating stunning arrangements for weddings and special events.",
        experience: "12+ years",
        priceRange: "₹2,000 - ₹25,000",
        availability: "Tue-Sun, 9 AM - 6 PM",
        services: [
          "Bridal Bouquet Design",
          "Venue Floral Decoration",
          "Centerpiece Arrangements",
          "Ceremony Arch Decoration",
          "Seasonal Flower Arrangements",
          "Corporate Event Florals",
          "Custom Floral Designs",
          "Flower Delivery Service",
        ],
        portfolio: [
          "https://www.livemint.com/lm-img/img/2024/05/22/600x338/PHOTO-2024-03-26-22-00-35_1716375217572_1716375237515.jpg",
          "https://thedesibride.com/admin/blog_image/medium/3191637000817.jpg",
          "https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/1280/jpg/articulos-india/2019/non-troncales/indian-flowers/flagship-by-fnp-indian-flowers-cover.webp",
          "https://miro.medium.com/v2/resize:fit:750/0*PSbUMXYWD2a4Rq54.jpg",
        ],
        testimonials: [
          {
            name: "Meera Gupta",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Absolutely beautiful floral arrangements! They made our wedding look like a fairy tale.",
            date: "December 2024",
          },
          {
            name: "Rohit Agarwal",
            event: "Anniversary Celebration",
            rating: 5,
            comment:
              "Creative and fresh designs. The centerpieces were stunning!",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Floral Package",
            price: "₹2,000 - ₹8,000",
            features: [
              "Simple arrangements",
              "Basic centerpieces",
              "Standard flowers",
              "Basic delivery",
            ],
          },
          {
            name: "Wedding Floral Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Bridal bouquet",
              "Ceremony decoration",
              "Reception centerpieces",
              "Premium flowers",
            ],
          },
          {
            name: "Luxury Floral Package",
            price: "₹20,000 - ₹25,000",
            features: [
              "Complete venue decoration",
              "Exotic flowers",
              "Custom designs",
              "Full-service setup",
            ],
          },
        ],
      },
      {
        id: "petal-perfect-designs",
        name: "Petal Perfect Designs",
        category: "Floral Design",
        rating: 4.7,
        reviews: 145,
        location: "Flower Market",
        phone: "+91 6543210987",
        email: "petal@perfect.com",
        image:
          "https://thumbs.dreamstime.com/b/indian-wedding-flower-garlands-garland-other-items-hindu-ceremony-98486077.jpg",
        specialties: [
          "Wedding Decor",
          "Corporate Events",
          "Exotic Flowers",
          "Custom Designs",
        ],
        description:
          "Creative floral design studio specializing in unique and exotic flower arrangements.",
        experience: "8+ years",
        priceRange: "₹1,500 - ₹20,000",
        availability: "Mon-Sat, 10 AM - 7 PM",
        services: [
          "Bridal Bouquet Design",
          "Venue Floral Decoration",
          "Centerpiece Arrangements",
          "Ceremony Arch Decoration",
          "Seasonal Flower Arrangements",
          "Corporate Event Florals",
          "Custom Floral Designs",
          "Flower Delivery Service",
        ],
        portfolio: [
          "https://www.nativepoppy.com/cdn/shop/articles/Alexa_Anuj_wedding_mandap_florals.jpg?v=1647902669&width=1100",
          "https://d397bfy4gvgcdm.cloudfront.net/80135-BinnyJason3-0227.jpeg",
          "https://thumbs.dreamstime.com/z/breathtaking-view-meticulously-crafted-floral-arrangements-adorning-wedding-stage-vibrant-colors-intricate-373761794.jpg",
          "https://miro.medium.com/v2/resize:fit:750/0*PSbUMXYWD2a4Rq54.jpg",
        ],
        testimonials: [
          {
            name: "Meera Gupta",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Absolutely beautiful floral arrangements! They made our wedding look like a fairy tale.",
            date: "December 2024",
          },
          {
            name: "Rohit Agarwal",
            event: "Anniversary Celebration",
            rating: 5,
            comment:
              "Creative and fresh designs. The centerpieces were stunning!",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Floral Package",
            price: "₹2,000 - ₹8,000",
            features: [
              "Simple arrangements",
              "Basic centerpieces",
              "Standard flowers",
              "Basic delivery",
            ],
          },
          {
            name: "Wedding Floral Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Bridal bouquet",
              "Ceremony decoration",
              "Reception centerpieces",
              "Premium flowers",
            ],
          },
          {
            name: "Luxury Floral Package",
            price: "₹20,000 - ₹25,000",
            features: [
              "Complete venue decoration",
              "Exotic flowers",
              "Custom designs",
              "Full-service setup",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "audio-visual",
    name: "Sound System",
    description:
      "provides professional sound systems, lighting, and DJ equipment for parties, weddings, and events",
    image:
      "https://ts2.mm.bing.net/th?id=OIP.jy6ua92Aaa5c9x-QLieIeQHaE8&pid=15.1",
    vendors: [
      {
       id: "premier-sound-lights",
        name: "Premier Sound & Lights",
        category: "Audio Visual",
        rating: 4.7,
        reviews: 142,
        location: "Tech District",
        phone: "+91 7654321098",
        email: "premier@sound.com",
        image: "https://i.ytimg.com/vi/aOumD3IsdQ4/maxresdefault.jpg",
        specialties: [
          "Sound Systems",
          "Stage Lighting",
          "LED Screens",
          "Live Streaming",
        ],
        description:
          "Professional audio-visual services with state-of-the-art equipment for all types of events.",
        experience: "10+ years",
        priceRange: "₹10,000 - ₹1,00,000",
        availability: "Available 24/7",
        services: [
          "Event Sound System Setup",
          "Intelligent Lighting Design",
          "Dance Floor Lighting Effects",
          "Custom Soundtrack Mixing & DJ Booth Setup",
          "Stage Lighting & Truss Structures",
          "On-Site Technical Support & Live Operation",
          "LED Wall & Visual Display Installation",
        ],
        portfolio: [
          "https://dreamweddinghub.com/public/uploads/vendor_images/1723011736-D.J.%20Jayesh%20Sound%20&%20Light.jpg",
          "https://dreamweddinghub.com/public/uploads/vendor_images/1723012505-Khushi%20Dj%20Light%20&%20Sound.jpg",
          "https://www.mecreeled.com/wp-content/uploads/2018/12/rgb-floodlights-led.jpg",
          "https://s.alicdn.com/@sc04/kf/H13edd59b9ba1426cba76c02dc628240aC.jpg",
          "https://weddingeventwala.com/wp-content/uploads/2021/11/Wedding-DJ-Sound-Services.jpg",
        ],
        testimonials: [
          {
            name: "Meera Gupta",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Absolutely beautiful floral arrangements! They made our wedding look like a fairy tale.",
            date: "December 2024",
          },
          {
            name: "Rohit Agarwal",
            event: "Anniversary Celebration",
            rating: 5,
            comment:
              "Creative and fresh designs. The centerpieces were stunning!",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Sound & Light Package",
            price: "₹3,000 - ₹7,000",
            features: [
              "2 basic speakers",
              "Standard microphone",
              "Basic stage lighting",
              "Setup & teardown included",
            ],
          },
          {
            name: "Wedding Sound & Light Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Full speaker setup",
              "Wireless microphones",
              "Decorative stage lighting",
              "DJ console support",
            ],
          },
          {
            name: "Luxury Sound & Light Package",
            price: "₹20,000 - ₹30,000",
            features: [
              "Concert-grade sound system",
              "LED and laser lighting effects",
              "Fog machine & spotlight setup",
              "Dedicated sound & light technician",
            ],
          },
        ],
      },
      {
         id: "star-sound-lights",
        name: "Star Sound & Lights",
        category: "Audio Visual",
        rating: 4.7,
        reviews: 90,
        location: "Amber District",
        phone: "+91 7654321098",
        email: "star@sound.com",
        image:
          "https://cdn.prod.website-files.com/5e312a97b76b83289d2deeef/6245726333840061cccfc70b_DJ-Equipment-Hire-Weddings-Functions-Events-The-DJ-Company.jpg",
        specialties: [
          "High-Fidelity Sound Systems",
          "Dynamic Stage Lighting",
          "LED Wall Installations",
          "Live Event Broadcasting",
          "Fog & Laser Effects",
        ],
        description:
          "Star Sound & Lights delivers immersive audio-visual experiences for weddings, concerts, corporate events, and private parties.",
        experience: "7+ years",
        priceRange: "₹5,000 - ₹1,00,000",
        availability: "Available 24/7",
        services: [
          "Event Sound System Setup",
          "Intelligent Lighting Design",
          "Dance Floor Lighting Effects",
          "Custom Soundtrack Mixing & DJ Booth Setup",
          "Stage Lighting & Truss Structures",
          "On-Site Technical Support & Live Operation",
          "LED Wall & Visual Display Installation",
        ],
        portfolio: [
          "https://i.ytimg.com/vi/aOumD3IsdQ4/maxresdefault.jpg",
          "https://floodlightz.com/wp-content/uploads/2023/08/LED-Acrylic-4-800x600-3-e1691408664563.jpg",
          "https://www.luckylighthouse.in/images/gallery/building-lighling/o3b.jpg",
          "https://i.pinimg.com/736x/bf/a9/1b/bfa91beb092aa75d90645bd05e825a6d.jpg",
          "https://static-01.daraz.pk/p/4b2a88e9aeed3b7e01f40b660f7bbe93.jpg",
        ],
        testimonials: [
          {
            name: "Meera Gupta",
            event: "Wedding Ceremony",
            rating: 5,
            comment:
              "Absolutely beautiful floral arrangements! They made our wedding look like a fairy tale.",
            date: "December 2024",
          },
          {
            name: "Rohit Agarwal",
            event: "Anniversary Celebration",
            rating: 5,
            comment:
              "Creative and fresh designs. The centerpieces were stunning!",
            date: "November 2024",
          },
        ],
        packages: [
          {
            name: "Basic Sound & Light Package",
            price: "₹3,000 - ₹7,000",
            features: [
              "2 basic speakers",
              "Standard microphone",
              "Basic stage lighting",
              "Setup & teardown included",
            ],
          },
          {
            name: "Wedding Sound & Light Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Full speaker setup",
              "Wireless microphones",
              "Decorative stage lighting",
              "DJ console support",
            ],
          },
          {
            name: "Luxury Sound & Light Package",
            price: "₹20,000 - ₹30,000",
            features: [
              "Concert-grade sound system",
              "LED and laser lighting effects",
              "Fog machine & spotlight setup",
              "Dedicated sound & light technician",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "photography",
    name: "Photography & Video",
    description: "Capture your special moments with professional photography",
    image:
      "https://ts2.mm.bing.net/th?id=OIP.rbUc54s_eHJ-vBBqxdxaoQHaHa&pid=15.1",
    vendors: [
      {
        id: "royal-photography",
        name: "Royal Photography",
        category: "Photography",
        rating: 4.9,
        reviews: 120,
        location: "Downtown District",
        phone: "+91 6543210987",
        email: "royal@photo.com",
        image:
          "https://www.bollywoodshaadis.com/img/article-l-20174958334430824000.jpg",
        specialties: [
          "Wedding Photography",
          "Drone Videography",
          "Candid Shots",
          "Traditional Coverage",
          "Same-Day Edits",
        ],
        description:
          "Royal Photography captures your most cherished moments with elegance and creativity, turning memories into timeless visuals.",
        experience: "10+ years",
        priceRange: "₹10,000 - ₹75,000",
        availability: "Available for bookings 7 days a week",
        services: [
          "Pre-Wedding Shoots",
          "Candid Photography",
          "Drone Videography",
          "Wedding Albums & Prints",
          "Traditional Coverage",
          "Same-Day Edit Video",
        ],
        portfolio: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMEyRvylsd2Q6SHrc21Q_VM60dKm9VAEf2xBhmW-CLNzKxIr4jn4vlm_tcAlDb4qPEOsI&usqp=CAU",
          "https://thumbs.dreamstime.com/b/drone-captures-beautiful-outdoor-wedding-ceremony-floral-decorations-seating-drone-hovers-over-wedding-setup-352367071.jpg",
          "https://cdn.expertphotography.com/wp-content/uploads/2019/11/drone-wedding-photography-couple-lying-on-floor-aerial-view.jpg",
          "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeaK4wUMZb6OeikWsNRvOTy-FPaVuTJlIRLLgzGvWWImfc7f08fpnf8rPmGVP3O219gEYBk3LpdSZ7_JHkedXD6AiI-Q2m-_z0MoXxdg5N1_qjX3vWsEvzS9M5oRdwT-T-zKrerq6WNCtxRN6QuPiY2IDQ?key=qvJwNu7lcaGfj4GsIyKlwg",
        ],
        testimonials: [
          {
            name: "Aarav Mishra",
            event: "Wedding",
            rating: 5,
            comment:
              "Outstanding experience. Royal Photography truly made our big day unforgettable!",
            date: "February 2025",
          },
          {
            name: "Kriti Sharma",
            event: "Engagement",
            rating: 5,
            comment:
              "Loved the candid shots and drone views. Highly professional team!",
            date: "January 2025",
          },
        ],
        packages: [
          {
            name: "Basic Photography Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Traditional photography",
              "100 edited photos",
              "Online gallery",
              "1 printed album",
            ],
          },
          {
            name: "Wedding Photography Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Full-day coverage",
              "Drone videography",
              "Cinematic highlights",
              "Wedding album + pendrive",
            ],
          },
          {
            name: "Luxury Photography Package",
            price: "₹60,000 - ₹75,000",
            features: [
              "Pre-wedding + wedding + reception",
              "3 albums + cinematic trailer",
              "All raw files + full HD videos",
              "2 professional photographers + drone team",
            ],
          },
        ],
      },
      {
       id: "pixel-dreams-studio",
        name: "Pixel Dreams Studio",
        category: "Photography",
        rating: 4.9,
        reviews: 120,
        location: "Akbarpur",
        phone: "+91 5432109876",
        email: "pixel@photography.com",
        image:
          "https://ts4.mm.bing.net/th?id=OIP.qJ84Zjn3T7FJzm1QJ_4i0gHaE8&pid=15.1",
        specialties: [
          "Fashion & Editorial Shoots",
          "Studio Portraits",
          "Creative Concept Shoots",
          "Event Photography",
        ],
        description:
          "Pixel Dreams Studio brings imagination to life through vibrant, high-definition photography that tells a visual story.",
        experience: "10+ years",
        priceRange: "₹5,000 - ₹1,50,000",
        availability: "Available daily",
        services: [
          "Fashion & Editorial Photography",
          "Indoor Studio Shoots",
          "Conceptual Event Coverage",
          "High-End Retouching",
          "Digital Albums & Delivery",
        ],
        portfolio: [
          "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://www.bollywoodshaadis.com/img/article-20174957520928329000.jpg",
          "https://zerogravity.photography/wp-content/uploads/2025/05/Right-Wedding-Photographer_result-768x486.webp",
          "https://sc0.blr1.digitaloceanspaces.com/large/704019-f883d187-c5da-4ba5-9374-43581052568d.jpg",
        ],
        testimonials: [
          {
            name: "Aarav Mishra",
            event: "Wedding",
            rating: 5,
            comment:
              "Outstanding experience. Royal Photography truly made our big day unforgettable!",
            date: "February 2025",
          },
          {
            name: "Kriti Sharma",
            event: "Engagement",
            rating: 5,
            comment:
              "Loved the candid shots and drone views. Highly professional team!",
            date: "January 2025",
          },
        ],
        packages: [
          {
            name: "Basic Photography Package",
            price: "₹10,000 - ₹18,000",
            features: [
              "Traditional photography",
              "100 edited photos",
              "Online gallery",
              "1 printed album",
            ],
          },
          {
            name: "Wedding Photography Package",
            price: "₹25,000 - ₹50,000",
            features: [
              "Full-day coverage",
              "Drone videography",
              "Cinematic highlights",
              "Wedding album + pendrive",
            ],
          },
          {
            name: "Luxury Photography Package",
            price: "₹60,000 - ₹75,000",
            features: [
              "Pre-wedding + wedding + reception",
              "3 albums + cinematic trailer",
              "All raw files + full HD videos",
              "2 professional photographers + drone team",
            ],
          },
        ],
      },
      {
        id: "shutter-bliss-studio",
        name: "Shutter Bliss Studio",
        category: "Photography",
        rating: 4.9,
        reviews: 105,
        location: "Maple Gardens",
        phone: "+91 9123456780",
        email: "bliss@shutter.com",
        image:
          "https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&w=600",
        specialties: [
          "Candid Wedding Photography",
          "Maternity & Baby Shoots",
          "Engagement Sessions",
          "Destination Shoots",
        ],
        description:
          "Shutter Bliss Studio specializes in heartfelt, natural photography that captures joy and emotion in every moment.",
        experience: "8+ years",
        priceRange: "₹12,000 - ₹85,000",
        availability: "Weekdays & weekends with prior booking",
        services: [
          "Wedding Photography",
          "Couple & Engagement Shoots",
          "Maternity Shoots",
          "Destination Pre-Weddings",
          "Family Portrait Sessions",
        ],
        portfolio: [
          "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg",
          "https://shaadiwish.com/blog/wp-content/uploads/2020/06/wedding-photographers-in-south-delhi.jpg",
          "https://i.pinimg.com/736x/50/9b/f1/509bf1784fdb0ed67663386e05eaf370.jpg",
          "https://image.wedmegood.com/resized/720X/uploads/project/301314/1732260008__RZ86647.jpg?crop=101,246,1778,1000",
        ],
        testimonials: [
          {
            name: "Nikhil Verma",
            event: "Destination Wedding",
            rating: 5,
            comment:
              "They made our Goa wedding look like a Bollywood dream. Truly blissful!",
            date: "October 2024",
          },
          {
            name: "Pallavi Jain",
            event: "Maternity Shoot",
            rating: 5,
            comment: "So patient and warm! The photos melted our hearts.",
            date: "September 2024",
          },
        ],
        packages: [
          {
            name: "Blissful Moments Package",
            price: "₹12,000 - ₹20,000",
            features: [
              "2-hour candid shoot",
              "Maternity or couple theme",
              "15 edited photos",
              "Soft copy & mobile-friendly album",
            ],
          },
          {
            name: "Complete Wedding Coverage",
            price: "₹35,000 - ₹60,000",
            features: [
              "2-day full event coverage",
              "Candid + traditional styles",
              "Photobook album",
              "Short wedding trailer",
            ],
          },
          {
            name: "Destination Story Package",
            price: "₹65,000 - ₹85,000",
            features: [
              "Pre-wedding & wedding shoot",
              "Travel and stay coverage",
              "Cinematic video & drone shots",
              "Premium album & all raw files",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "transport",
    name: "Transportation",
    description:
      "nsure your guests arrive on time and stress-free with our coordinated shuttle services.",
    image:
      "https://cdn0.weddingwire.in/vendor/7163/3_2/960/jpg/wedding-transportation-imported-car-limo-wedding-transport-19_15_307163-158979582020545.jpeg",
    vendors: [
      {
        id: "bridal-car-elegance",
        name: "Bridal Car Elegance",
        category: "Transportation",
        rating: 4.9,
        reviews: 105,
        location: "Maple Gardens",
        phone: "+91 9123456780",
        email: "travel@bridal.com",
        image:
          "https://cdn0.weddingwire.in/vendor/3430/3_2/640/jpg/img-20150815-wa0017_15_73430.jpeg",
        specialties: [
          "Wedding Guest Transport",
          "Luxury Car Rentals",
          "Airport Pickup & Drop",
          "Outstation Trip Packages",
        ],
        description:
          "Bridal Car Elegance Arrive in style with our luxury bridal cars, tailored to match your wedding aesthetic.",
        experience: "15+ years",
        priceRange: "₹45,000 - ₹1,50,000",
        availability: "Available daily",
        services: [
          "Luxury Car Hire for Weddings",
          "Bus & Tempo Traveller Rentals",
          "Airport Transfers",
          "Outstation and City Tours",
          "Chauffeur-Driven Packages",
        ],
        portfolio: [
          "https://weddingpicasso.com/assets/images/wedding-logistics-main.jpg",
          "https://www.eventsinpushkar.com/serviceimages/logistics-for-wedding-anniversary-in-pushkar.webp",
          "https://www.onlinebusbookingindia.com/uploads/26800_58484_merc1_big%20(1).jpg",
          "https://www.luxsuv.com/wp-content/gallery/wedding/WeddingFlowers2-1200x600-1.jpg",
        ],
        testimonials: [
          {
            name: "Aman Tiwari",
            event: "Wedding Guest Transport",
            rating: 5,
            comment:
              "Superb coordination and comfortable rides for all guests. Highly recommended!",
            date: "March 2025",
          },
          {
            name: "Sonal Kapoor",
            event: "Bride Entry Car Service",
            rating: 5,
            comment:
              "The vintage car for my wedding entry was stunning and arrived right on time!",
            date: "February 2025",
          },
        ],
        packages: [
          {
            name: "Essential Travel Package",
            price: "₹5,000 - ₹12,000",
            features: [
              "Airport pickup/drop service",
              "A/C Sedan vehicle",
              "Chauffeur included",
              "2-hour local coverage",
            ],
          },
          {
            name: "Wedding Day Transport",
            price: "₹15,000 - ₹35,000",
            features: [
              "Luxury car for bride/groom",
              "Bus for guest transfers",
              "Vehicle decorations included",
              "On-call coordination support",
            ],
          },
          {
            name: "Royal Wedding Fleet",
            price: "₹40,000 - ₹70,000",
            features: [
              "Bridal vintage car + SUV escort",
              "Luxury coaches for 100+ guests",
              "Pan-India coverage",
              "Driver team + coordinator service",
            ],
          },
        ],
      },
      {
        id: "seamless-guest-travel",
        name: "Seamless Guest Travel",
        category: "Transportation",
        rating: 4.9,
        reviews: 134,
        location: "Akbarpur",
        phone: "+91 9123456780",
        email: "travel@seamless.com",
        image:
          "https://www.weddingsbyneerajkamra.com/images/services/logistics.jpg",
        specialties: [
          "Wedding Guest Transport",
          "Luxury Car Rentals",
          "Airport Pickup & Drop",
          "Outstation Trip Packages",
        ],
        description:
          "Seamless Guest Travel Ensure your guests arrive on time and stress-free with our coordinated shuttle services. From hotels to venues and back, we provide comfortable, air-conditioned vehicles and experienced drivers to keep your event flowing smoothly and your guests smiling.",
        experience: "10+ years",
        priceRange: "₹25,000 - ₹70,000",
        availability: "Available daily",
        services: [
          "Luxury Car Hire for Weddings",
          "Bus & Tempo Traveller Rentals",
          "Airport Transfers",
          "Outstation and City Tours",
          "Chauffeur-Driven Packages",
        ],
        portfolio: [
          "https://drivenglobalusa.com/wp-content/uploads/2019/06/wedding-transportation-service-Raleigh-Durham-Morrisville-Cary-Chapel-Hill-Wake-Forest-Nort-Hills-Smithfield-Clayton-Garner-Angier-Goldsboro-Fuquay-Varina-Carrboro-RDU.jpg",
          "https://taxiinpushkar.com/imgs/3.jpg",
          "https://cdn0.weddingwire.in/vendor/4855/3_2/640/jpg/wedding-transportation-ashwini-tours-and-travels-bus-rental-4_15_364855-161623272838975.jpeg",
          "https://www.shivmohanband.com/blog/wp-content/uploads/2022/09/vintage-car-weeding.jpg",
        ],
        testimonials: [
          {
            name: "Aman Tiwari",
            event: "Wedding Guest Transport",
            rating: 5,
            comment:
              "Superb coordination and comfortable rides for all guests. Highly recommended!",
            date: "March 2025",
          },
          {
            name: "Sonal Kapoor",
            event: "Bride Entry Car Service",
            rating: 5,
            comment:
              "The vintage car for my wedding entry was stunning and arrived right on time!",
            date: "February 2025",
          },
        ],
        packages: [
          {
            name: "Essential Travel Package",
            price: "₹5,000 - ₹12,000",
            features: [
              "Airport pickup/drop service",
              "A/C Sedan vehicle",
              "Chauffeur included",
              "2-hour local coverage",
            ],
          },
          {
            name: "Wedding Day Transport",
            price: "₹15,000 - ₹35,000",
            features: [
              "Luxury car for bride/groom",
              "Bus for guest transfers",
              "Vehicle decorations included",
              "On-call coordination support",
            ],
          },
          {
            name: "Royal Wedding Fleet",
            price: "₹40,000 - ₹70,000",
            features: [
              "Bridal vintage car + SUV escort",
              "Luxury coaches for 100+ guests",
              "Pan-India coverage",
              "Driver team + coordinator service",
            ],
          },
        ],
      },
    ],
  },
];

const Vendors = () => {
  const [categoriesWithDynamicVendors, setCategoriesWithDynamicVendors] =
    useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const loadVendorsFromLocalStorage = () => {
    const localVendors: LocalVendor[] = JSON.parse(
      localStorage.getItem("vendors") || "[]"
    );
    const removedVendorIds: string[] = JSON.parse(
      localStorage.getItem("removedVendorIds") || "[]"
    );

    const saved: Vendor[] = JSON.parse(localStorage.getItem("vendors") || "[]");

    const newCategories = initialCategories.map((category) => {
      const baseVendors = category.vendors.filter(
        (v) => !removedVendorIds.includes(v.id)
      );
      return {
        ...category,
        vendors: baseVendors,
      };
    });

    localVendors.forEach((vendor: LocalVendor) => {
      const categoryMatch = newCategories.find((cat) =>
        cat.name.toLowerCase().includes(vendor.vendorType.toLowerCase())
      );

      if (categoryMatch) {
        const fullVendor = saved.find((v) => v.email === vendor.email);

        const newVendor: Vendor = {
          id: vendor.id.toString(),
          name: vendor.shopName || vendor.name,
          category: categoryMatch.name,
          rating: vendor.rating || 0,
          reviews: vendor.reviews || 0,
          location: vendor.location || "Unknown",
          phone: vendor.phone || "",
          email: vendor.email,
          image:
            fullVendor?.portfolio?.[0] ||
            "https://via.placeholder.com/300x200?text=Vendor",
          specialties: fullVendor?.specialties || [],
          description: fullVendor?.description || "Newly added vendor",
          experience: fullVendor?.experience || "",
          priceRange: fullVendor?.priceRange || "",
          availability: fullVendor?.availability || "",
          portfolio: fullVendor?.portfolio || [],
          services: fullVendor?.services || [],
          testimonials: fullVendor?.testimonials || [],
          packages: fullVendor?.packages || [],
        };

        if (!removedVendorIds.includes(newVendor.id)) {
          categoryMatch.vendors.push(newVendor);
        }
      }
    });

    setCategoriesWithDynamicVendors(newCategories);
  };

  useEffect(() => {
    loadVendorsFromLocalStorage();
  }, []);

  const handleRemoveVendor = (vendorId: string | number) => {
    if (!selectedCategory || !isAdmin) return;

    const all = JSON.parse(localStorage.getItem("vendors") || "[]");
    const updatedStorage = all.filter((v: Vendor) => v.id !== vendorId);
    localStorage.setItem("vendors", JSON.stringify(updatedStorage));

    const removed = JSON.parse(
      localStorage.getItem("removedVendorIds") || "[]"
    );
    if (!removed.includes(vendorId)) {
      removed.push(vendorId);
      localStorage.setItem("removedVendorIds", JSON.stringify(removed));
    }

    loadVendorsFromLocalStorage();
    setSelectedCategory(null);
  };

  return (
  <section className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
    <h2 className="text-4xl font-bold text-center text-zinc-800 dark:text-white mb-10">
      Explore Vendors
    </h2>

    {!selectedCategory ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categoriesWithDynamicVendors.map((category) => (
          <div
            key={category.id}
            // data-aos="fade-up"
            className="cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            onClick={() => setSelectedCategory(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Users className="h-4 w-4 mr-1" /> {category.vendors.length} vendors
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-6 text-purple-600 hover:underline text-sm"
        >
          ← Back to categories
        </button>

        <h3 className="text-3xl font-bold text-zinc-800 dark:text-white mb-6">
          {selectedCategory.name} Vendors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory.vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              // data-aos="fade-up"
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h4 className="text-xl font-bold text-zinc-800 dark:text-white mb-1">{vendor.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{vendor.category}</p>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {vendor.rating} ({vendor.reviews} reviews)
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {vendor.location}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{vendor.description}</p>

                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <p><strong>Experience:</strong> {vendor.experience || "Not specified"}</p>
                  <p><strong>Price Range:</strong> {vendor.priceRange || "Not specified"}</p>
                  <p><strong>Availability:</strong> {vendor.availability || "Not specified"}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={`/vendors/${vendor.id}`}
                    state={{ vendor }}
                    className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white hover:opacity-90 transition shadow"
                  >
                    View Details
                  </Link>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleRemoveVendor(vendor.id)}
                        className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white hover:opacity-90 transition shadow"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/admin/edit-vendor/${vendor.id}`}
                        className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90 transition shadow"
                      >
                        Edit
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);
};

export default Vendors;
