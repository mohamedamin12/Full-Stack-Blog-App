import  { useState } from 'react';
import NavTitle from './NavTitle';
import NavLinks from './NavLinks';
import NavButtons from './NavButtons';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md py-4 px-6 flex justify-between items-center relative">
      <NavTitle />
      <div className="md:flex hidden flex-1 justify-center">
        <NavLinks closeMenu={closeMenu} />
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4">
          <NavLinks closeMenu={closeMenu} />
          <NavButtons closeMenu={closeMenu} />
        </div>
      )}
      <div className="md:flex hidden">
        <NavButtons />
      </div>
    </nav>
  );
};

export default Navbar;


