import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import VendorsPage from './pages/VendorsPage';
import VendorDetailPage from './pages/VendorDetailPage';
import VendorProfileEditor from './vendor-profile/edit';
import GalleryPage from './pages/GalleryPage';
import PlanningPage from './pages/PlanningPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingPage from './pages/BookingPage';
import AdminVendorEditor from './pages/AdminVendorEditor';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="/vendor-profile/edit" element={<VendorProfileEditor />} />
            <Route path="vendors/:vendorId" element={<VendorDetailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="planning" element={<PlanningPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="/admin/edit-vendor/:id" element={<AdminVendorEditor />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;