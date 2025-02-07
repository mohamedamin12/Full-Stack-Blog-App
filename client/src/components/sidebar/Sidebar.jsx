/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall.js";


const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <aside className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-xs">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center">
            <Link 
              to={`/posts/categories/${category.title}`}
              className="flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-200 transition duration-300 w-full"
            >
              <span className="text-gray-800">{category.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;



