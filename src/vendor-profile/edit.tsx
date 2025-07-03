// Updated Edit Page for Vendor with full fields and styling
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Vendor {
  email: string;
  shopName?: string;
  vendorType?: string;
  location?: string;
  phone?: string;
  description?: string;
  longDescription?: string;
  website?: string;
  experience?: string;
  priceRange?: string;
  availability?: string;
  specialties?: string[];
  services?: string[];
  portfolio?: string[];
  packages?: {
    name: string;
    price: string;
    features: string[];
  }[];
  testimonials?: {
    name: string;
    event: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  accountType?: string;
}

const VendorProfileEditor = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [specialtiesInput, setSpecialtiesInput] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');
  const [packagesInput, setPackagesInput] = useState('');
  const [testimonialsInput, setTestimonialsInput] = useState('');
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('eventcraft_user') || 'null');
      if (!user || user.accountType !== 'vendor') return;
      const stored: Vendor[] = JSON.parse(localStorage.getItem('vendors') || '[]');
      const match = stored.find((v: Vendor) => v.email === user.email);
      const vendorData = match || user;

      setVendor(vendorData);
      setSpecialtiesInput((vendorData.specialties || []).join(', '));
      setServicesInput((vendorData.services || []).join(', '));
      setPortfolioInput((vendorData.portfolio || []).join(', '));

      if (vendorData.packages?.length) {
        const formatted = vendorData.packages.map((pkg: NonNullable<Vendor['packages']>[number]) => [pkg.name, pkg.price, ...pkg.features].join('\n')).join('\n\n');
        setPackagesInput(formatted);
      }

      if (vendorData.testimonials?.length) {
        const formatted = vendorData.testimonials.map((t: NonNullable<Vendor['testimonials']>[number]) => [t.name, t.event, t.rating, t.comment, t.date].join('\n')).join('\n\n');
        setTestimonialsInput(formatted);
      }
    } catch (err) {
      console.error('Vendor load error:', err);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!vendor) return;
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!vendor) return;

    const specialties = specialtiesInput.split(',').map(s => s.trim()).filter(Boolean);
    const services = servicesInput.split(',').map(s => s.trim()).filter(Boolean);
    const portfolio = portfolioInput.split(',').map(p => p.trim()).filter(Boolean);
    const packages = packagesInput.split('\n\n').map(block => {
      const lines = block.trim().split('\n');
      if (lines.length < 3) return null;
      const [name, price, ...features] = lines;
      return { name, price, features };
    }).filter(Boolean) as Vendor['packages'];

    const testimonials = testimonialsInput.split('\n\n').map(block => {
      const lines = block.trim().split('\n');
      if (lines.length !== 5) return null;
      const [name, event, rating, comment, date] = lines;
      return { name, event, rating: Number(rating), comment, date };
    }).filter(Boolean) as Vendor['testimonials'];

    const updatedVendor: Vendor = {
      ...vendor,
      specialties,
      services,
      portfolio,
      packages,
      testimonials,
    };

    const all: Vendor[] = JSON.parse(localStorage.getItem('vendors') || '[]');
    const index = all.findIndex(v => v.email === vendor.email);
    if (index !== -1) all[index] = updatedVendor;
    else all.push(updatedVendor);

    localStorage.setItem('vendors', JSON.stringify(all));
    localStorage.setItem('eventcraft_user', JSON.stringify(updatedVendor));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      navigate('/vendors');
    }, 1000);
  };

  if (!vendor) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Edit Vendor Profile</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Business Info</h2>
          <input name="shopName" value={vendor.shopName || ''} onChange={handleChange} placeholder="Shop Name" className="w-full border p-2 rounded mb-2" />
          <input name="vendorType" value={vendor.vendorType || ''} onChange={handleChange} placeholder="Vendor Type (e.g. Transportation)" className="w-full border p-2 rounded" />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <input name="location" value={vendor.location || ''} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded mb-2" />
          <input name="phone" value={vendor.phone || ''} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded mb-2" />
          <input name="website" value={vendor.website || ''} onChange={handleChange} placeholder="Website" className="w-full border p-2 rounded" />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Descriptions</h2>
          <textarea name="description" value={vendor.description || ''} onChange={handleChange} placeholder="Short Description" className="w-full border p-2 rounded mb-2" rows={2} />
          <textarea name="longDescription" value={vendor.longDescription || ''} onChange={handleChange} placeholder="Long Description" className="w-full border p-2 rounded" rows={4} />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Experience & Availability</h2>
          <input name="experience" value={vendor.experience || ''} onChange={handleChange} placeholder="Experience (e.g. 10+ years)" className="w-full border p-2 rounded mb-2" />
          <input name="priceRange" value={vendor.priceRange || ''} onChange={handleChange} placeholder="Price Range (e.g. ₹5,000 - ₹50,000)" className="w-full border p-2 rounded mb-2" />
          <input name="availability" value={vendor.availability || ''} onChange={handleChange} placeholder="Availability (e.g. Mon-Sun, 8AM-8PM)" className="w-full border p-2 rounded" />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Specialties</h2>
          <textarea value={specialtiesInput} onChange={(e) => setSpecialtiesInput(e.target.value)} placeholder="Comma-separated specialties" className="w-full border p-2 rounded" rows={2} />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Services</h2>
          <textarea value={servicesInput} onChange={(e) => setServicesInput(e.target.value)} placeholder="Comma-separated services" className="w-full border p-2 rounded" rows={2} />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Portfolio</h2>
          <textarea value={portfolioInput} onChange={(e) => setPortfolioInput(e.target.value)} placeholder="Comma-separated image URLs" className="w-full border p-2 rounded" rows={2} />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Packages</h2>
          <textarea value={packagesInput} onChange={(e) => setPackagesInput(e.target.value)} placeholder={`One package per block:\nName\nPrice\nFeature 1\nFeature 2...`} className="w-full border p-2 rounded" rows={6} />
        </section>

        <section>
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <textarea value={testimonialsInput} onChange={(e) => setTestimonialsInput(e.target.value)} placeholder={`One testimonial per block:\nName\nEvent\nRating\nComment\nDate`} className="w-full border p-2 rounded" rows={6} />
        </section>

        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
            Save Profile
          </button>
        </div>

        {saved && <p className="text-green-600 text-center">✅ Profile saved successfully!</p>}
      </div>
    </div>
  );
};

export default VendorProfileEditor;
