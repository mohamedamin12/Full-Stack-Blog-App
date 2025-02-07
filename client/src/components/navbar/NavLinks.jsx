/* eslint-disable react/prop-types */
import {
  BsHouse,
  BsStickies,
  BsJournalPlus,
  BsPersonPlus,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = ({ closeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
      <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center text-lg hover:text-gray-400"
      >
        <BsHouse size={24} className="mr-2" />
        Home
      </Link>
      <Link
        to="/posts"
        onClick={closeMenu}
        className="flex items-center text-lg hover:text-gray-400"
      >
        <BsStickies size={24} className="mr-2" />
        Posts
      </Link>
      
      {user && (
        <Link
          to="posts/create-posts"
          onClick={closeMenu}
          className="flex items-center text-lg hover:text-gray-400"
        >
          <BsJournalPlus size={24} className="mr-2" />
          Create
        </Link>
      )}

      {user?.isAdmin && (
        <Link
          to="/admin-dashboard"
          onClick={closeMenu}
          className="flex items-center text-lg hover:text-gray-400"
        >
          <BsPersonPlus size={24} className="mr-2" />
          Admin Dashboard
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
