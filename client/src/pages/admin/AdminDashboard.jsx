import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminMain from './AdminMain';

const AdminDashboard = () => {
  const location = useLocation();

  const isDashboardPage = location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/';
  return (
    <section className="flex h-screen">
      <div className="w-1/4 bg-gray-800">
        <AdminSidebar />
      </div>
      <div className="w-3/4 bg-gray-100 p-6">
      {isDashboardPage && <AdminMain />}
        <Outlet /> 
      </div>
    </section>
  );
};

export default AdminDashboard;
