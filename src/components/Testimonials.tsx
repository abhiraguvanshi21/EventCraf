import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah & Michael Johnson',
    event: 'Dream Wedding',
    rating: 5,
    text: "EventCraft made our wedding day absolutely perfect! Every detail was flawlessly executed, and their vendor network is incredible. We couldn't have asked for a better experience.",
    image: 'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'June 2024'
  },
  {
    name: 'Priya Sharma',
    event: 'Engagement Ceremony',
    rating: 5,
    text: 'The attention to detail and cultural sensitivity for our traditional engagement was outstanding. They understood our vision perfectly and brought it to life beautifully.',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'May 2024'
  },
  {
    name: 'David Chen',
    event: 'Corporate Launch',
    rating: 5,
    text: 'Professional, efficient, and creative. EventCraft handled our product launch event with such professionalism. The setup was stunning and everything ran smoothly.',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'April 2024'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-amber-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Happy Clients</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients say about their experiences with EventCraft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 relative"
            >
              <Quote className="h-8 w-8 text-purple-200 mb-4" />
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="h-5 w-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">{testimonial.event}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
