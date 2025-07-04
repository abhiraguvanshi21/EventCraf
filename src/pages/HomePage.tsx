import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
// import Planning from '../components/Planning'; ❌ Remove this line if not needed anymore
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  useAuth();

  return (
    <div>
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      {/* Planning component removed */}
    </div>
  );
};

export default HomePage;
