import {BsPencil} from "react-icons/bs";
const NavTitle = () => {
  return (
    <div className="flex items-center text-xl font-bold">
      <strong>BLOG</strong>
      <BsPencil size={20} className="ml-2" />
    </div>
  );
};

export default NavTitle;
