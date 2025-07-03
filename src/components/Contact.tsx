import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', budget: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.eventType) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Message sent successfully!');
    console.log('Submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-800 dark:text-white mb-4">Let's Plan Your Perfect Event</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Ready to get started? Reach out below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name*"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg" />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email*"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg" />
                <select name="eventType" required value={formData.eventType} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg">
                  <option value="">Select Event Type*</option>
                  <option value="wedding">Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="family">Family</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg" />
                <select name="budget" value={formData.budget} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg">
                  <option value="">Select Budget</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="over-10000">Over $10,000</option>
                </select>
              </div>

              <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your vision"
                className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg" />

              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6">Contact Info</h3>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center"><Phone className="mr-2 text-purple-600" /> +1 (555) 123-4567</div>
                <div className="flex items-center"><Mail className="mr-2 text-purple-600" /> hello@eventcraft.com</div>
                <div className="flex items-center"><MapPin className="mr-2 text-purple-600" /> 123 Event Street, City</div>
                <div className="flex items-center"><Clock className="mr-2 text-purple-600" /> Mon–Sat: 9AM–6PM</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-amber-100 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-6 shadow">
              <h4 className="text-lg font-bold text-zinc-800 dark:text-white mb-2">Free Consultation</h4>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">Let’s chat about your event & bring your vision to life.</p>
              <button className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition">Schedule Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;