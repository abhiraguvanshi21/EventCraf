import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Vendor {
  id: number | string;
  name: string;
  email: string;
  shopName?: string;
  vendorType?: string;
  location?: string;
  phone?: string;
  website?: string;
  description?: string;
  longDescription?: string;
  experience?: string;
  priceRange?: string;
  availability?: string;
  services?: string[];
  portfolio?: string[];
  packages?: {
    name: string;
    price: string;
    features: string[];
  }[];
}

const AdminVendorEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [packagesInput, setPackagesInput] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');

  useEffect(() => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const match = vendors.find((v: Vendor) => v.id.toString() === id);
    if (!match) return alert('Vendor not found.');
    setVendor(match);

    setServicesInput(match.services?.join(', ') || '');
    setPortfolioInput(match.portfolio?.join(', ') || '');
    setPackagesInput(
      (match.packages || [])
        .map((pkg: { name: string; price: string; features: string[] }) => `${pkg.name}\n${pkg.price}\n${pkg.features.join('\n')}`)
        .join('\n\n')
    );
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!vendor) return;
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!vendor) return;

    const services = servicesInput.split(',').map(s => s.trim()).filter(Boolean);
    const portfolio = portfolioInput.split(',').map(p => p.trim()).filter(Boolean);

    const packages = packagesInput
      .split('\n\n')
      .map(block => {
        const lines = block.trim().split('\n');
        if (lines.length < 3) return null;
        const [name, price, ...features] = lines;
        return { name, price, features };
      })
      .filter(Boolean) as Vendor['packages'];

    const updatedVendor = { ...vendor, services, portfolio, packages };

    const all = JSON.parse(localStorage.getItem('vendors') || '[]');
    const updated = all.map((v: Vendor) => v.id === vendor.id ? updatedVendor : v);
    localStorage.setItem('vendors', JSON.stringify(updated));
    alert('Vendor updated');
    navigate('/vendors');
  };

  if (!vendor) return <div className="p-6">Loading vendor data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Edit Vendor</h2>
      <div className="space-y-4">
        <input type="text" name="shopName" value={vendor.shopName || ''} onChange={handleChange} placeholder="Shop Name" className="w-full border p-2 rounded" />
        <input type="text" name="vendorType" value={vendor.vendorType || ''} onChange={handleChange} placeholder="Vendor Type" className="w-full border p-2 rounded" />
        <input type="text" name="location" value={vendor.location || ''} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />
        <input type="text" name="phone" value={vendor.phone || ''} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />
        <input type="text" name="website" value={vendor.website || ''} onChange={handleChange} placeholder="Website" className="w-full border p-2 rounded" />
        <textarea name="description" value={vendor.description || ''} onChange={handleChange} placeholder="Short Description" className="w-full border p-2 rounded" />
        <textarea name="longDescription" value={vendor.longDescription || ''} onChange={handleChange} placeholder="Full Description" className="w-full border p-2 rounded" rows={3} />
        <input type="text" name="experience" value={vendor.experience || ''} onChange={handleChange} placeholder="Experience" className="w-full border p-2 rounded" />
        <input type="text" name="priceRange" value={vendor.priceRange || ''} onChange={handleChange} placeholder="Price Range" className="w-full border p-2 rounded" />
        <input type="text" name="availability" value={vendor.availability || ''} onChange={handleChange} placeholder="Availability" className="w-full border p-2 rounded" />

        <textarea
          value={servicesInput}
          onChange={(e) => setServicesInput(e.target.value)}
          placeholder="Services (comma-separated)"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={portfolioInput}
          onChange={(e) => setPortfolioInput(e.target.value)}
          placeholder="Portfolio image URLs (comma-separated)"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={packagesInput}
          onChange={(e) => setPackagesInput(e.target.value)}
          placeholder={`Packages format:

Basic Tent Package
₹5,000 - ₹15,000
Feature 1
Feature 2

Premium Wedding Package
₹20,000 - ₹35,000
Feature A
Feature B`}
          className="w-full border p-2 rounded"
          rows={6}
        />
      </div>

      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
    </div>
  );
};

export default AdminVendorEditor;
