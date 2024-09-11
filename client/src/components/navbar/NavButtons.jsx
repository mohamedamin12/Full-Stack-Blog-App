/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsBoxArrowInRight, BsPerson, BsPersonPlus , BsBoxArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";




const NavButtons = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    closeMenu();
  };
  const {user} = useSelector((state) => state.auth);
  return (
    <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
    {user ? (
      <div className="relative">
        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
          <img
            src={user?.profilePhoto.url} 
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-lg hover:text-gray-400">{user.username}</span> 
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link
              to={`/profile/${user._id}`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu();
              }}
            >
              <BsPerson size={20} className="inline mr-2" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
            <BsBoxArrowRight size={20} className="inline mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <>
        <Link
          to="/login"
          onClick={closeMenu}
          className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          <BsBoxArrowInRight size={20} className="mr-2" />
          Login
        </Link>
        <Link
          to="/register"
          onClick={closeMenu}
          className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          <BsPersonPlus size={20} className="mr-2" />
          Register
        </Link>
      </>
    )}
  </div>
  );
};

export default NavButtons;
