import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Planning from '../components/Planning';

const PlanningPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔️ Hide planning page from vendors
  if (user.accountType === 'vendor') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-20">
      <Planning />
    </div>
  );
};

export default PlanningPage;
