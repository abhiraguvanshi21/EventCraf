import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Planning from '../components/Planning';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const isVendor = user?.accountType === 'vendor';

  return (
    <div>
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      {/* ✅ Show Planning only if user is not a vendor */}
      {user && !isVendor && <Planning />}
    </div>
  );
};

export default HomePage;
