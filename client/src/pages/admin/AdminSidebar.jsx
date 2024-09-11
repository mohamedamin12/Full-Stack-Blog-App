import { Link } from "react-router-dom";
import { FaColumns, FaUser, FaFileAlt, FaTags, FaComments } from "react-icons/fa"; // استبدال React Icons

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full p-6 space-y-4">
      <Link to="/admin-dashboard" className="flex items-center space-x-2 text-xl font-bold hover:text-gray-300 transition duration-300">
        <FaColumns />
        <span>Dashboard</span>
      </Link>
      <ul className="space-y-4">
        <Link to="/admin-dashboard/users-table" className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
          <FaUser />
          <span>Users</span>
        </Link>
        <Link to="/admin-dashboard/posts-table" className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
          <FaFileAlt />
          <span>Posts</span>
        </Link>
        <Link to="/admin-dashboard/categories-table" className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
          <FaTags />
          <span>Categories</span>
        </Link>
        <Link to="/admin-dashboard/comments-table" className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
          <FaComments />
          <span>Comments</span>
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
