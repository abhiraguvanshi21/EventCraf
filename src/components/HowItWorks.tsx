import { MessageCircle, Palette, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: MessageCircle,
    title: 'Consultation',
    description: 'Tell us about your vision, budget, and requirements. We listen to every detail.',
    step: '01'
  },
  {
    icon: Palette,
    title: 'Design & Planning',
    description: 'Our team creates a custom plan with decoration themes, vendor selection, and timeline.',
    step: '02'
  },
  {
    icon: Calendar,
    title: 'Coordination',
    description: 'We handle all vendor coordination, setup scheduling, and day-of logistics.',
    step: '03'
  },
  {
    icon: CheckCircle,
    title: 'Perfect Execution',
    description: 'Sit back and enjoy your perfect event while we manage every detail flawlessly.',
    step: '04'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-amber-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From initial consultation to perfect execution, we make event planning seamless and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Link
                to={`/how-it-works/${step.title.toLowerCase().replace(/\s+/g, '-')}`}
                key={index}
                className="relative group bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 p-6 text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full shadow-md mb-4 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;