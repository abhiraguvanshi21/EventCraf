import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialCategories } from './vendorData';
import { Star, MapPin, Phone, Mail, Globe } from 'lucide-react';

interface Vendor {
  id: string | number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  website?: string;
  image: string;
  specialties: string[];
  description: string;
  longDescription?: string;
  experience: string;
  priceRange: string;
  availability: string;
  portfolio: string[];
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

const VendorDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [vendor, setVendor] = useState<Vendor | null>(location.state?.vendor || null);

  useEffect(() => {
    document.body.classList.add('no-navbar');
    return () => document.body.classList.remove('no-navbar');
  }, []);

  useEffect(() => {
    if (!vendor && id) {
      const localVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      const allHardcodedVendors = initialCategories.flatMap((cat: { vendors?: Vendor[] }) => cat.vendors || []);
      const combinedVendors = [...allHardcodedVendors, ...localVendors];

      const baseMatch = combinedVendors.find((v: Vendor) => v.id?.toString() === id);

      if (baseMatch) {
        const updated = localVendors.find((v: Vendor) => v.email === baseMatch.email);
        setVendor(updated ? { ...baseMatch, ...updated } : baseMatch);
      }
    }
  }, [id, vendor]);

  if (!vendor) return <div className="p-6 text-center text-gray-600">Loading vendor details...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fadeIn">
      <div className="fixed top-0 left-0 right-0 bg-white shadow z-50 p-3 flex justify-between items-center">
        <Link to="/vendors" className="text-purple-600 font-semibold hover:underline">← Back</Link>
        <span className="text-gray-800 font-semibold">{vendor.name}</span>
      </div>
      <div className="pt-20">
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">
          <img src={vendor.image} alt={vendor.name} className="w-full h-64 object-cover" />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-6 py-3 w-full">
            <h1 className="text-2xl font-bold">{vendor.name}</h1>
            <p className="text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {vendor.category} • {vendor.location}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-yellow-500 font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" /> {vendor.rating} ({vendor.reviews} reviews)
          </p>
          <p className="text-gray-700 mt-2">{vendor.description}</p>
        </div>

        {vendor.longDescription && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{vendor.longDescription}</p>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Vendor Info</h2>
          <div className="space-y-1 text-gray-700">
            <p><Phone className="inline w-4 h-4 mr-1" /> {vendor.phone}</p>
            <p><Mail className="inline w-4 h-4 mr-1" /> {vendor.email}</p>
            {vendor.website && (
              <p>
                <Globe className="inline w-4 h-4 mr-1" />
                <a href={`https://${vendor.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {vendor.website}
                </a>
              </p>
            )}
            <p><strong>Experience:</strong> {vendor.experience}</p>
            <p><strong>Price Range:</strong> {vendor.priceRange}</p>
            <p><strong>Availability:</strong> {vendor.availability}</p>
          </div>
        </section>

        {vendor.specialties?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {vendor.specialties.map((spec, i) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{spec}</span>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(vendor.services) && vendor.services.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Services Offered</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {vendor.services.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </section>
        )}

        {Array.isArray(vendor.packages) && vendor.packages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Packages</h2>
            <div className="space-y-4">
              {vendor.packages.map((pkg, i) => (
                <div key={i} className="border p-4 rounded-xl bg-gray-50">
                  <h3 className="text-lg font-semibold text-purple-700">{pkg.name}</h3>
                  <p className="text-gray-600">{pkg.price}</p>
                  <ul className="list-disc pl-6 text-sm text-gray-700 mt-2">
                    {pkg.features.map((feat, j) => (
                      <li key={j}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(vendor.testimonials) && vendor.testimonials.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Testimonials</h2>
            <div className="space-y-4">
              {vendor.testimonials.map((t, i) => (
                <blockquote key={i} className="border-l-4 pl-4 italic text-gray-600">
                  <p>“{t.comment}”</p>
                  <footer className="mt-1 text-sm font-medium text-gray-800">— {t.name}, {t.event}, {t.date}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {vendor.portfolio?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-2">Portfolio</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {vendor.portfolio.map((img, i) => (
                <img key={i} src={img} alt={`portfolio-${i}`} className="rounded-lg object-cover w-full h-32 hover:scale-105 transition" />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Location</h2>
          <iframe
            className="w-full rounded-xl h-64 border"
            src={`https://www.google.com/maps?q=${encodeURIComponent(vendor.location)}&output=embed`}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>

        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          <a
            href={`tel:${vendor.phone}`}
            className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
            title="Call Now"
          >📞</a>
          <a
            href={`https://wa.me/${vendor.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
            title="WhatsApp"
          >💬</a>
          <a
            href={`mailto:${vendor.email}`}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
            title="Send Email"
          >✉️</a>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
