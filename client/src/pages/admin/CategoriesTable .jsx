import { FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Count</th>
            <th className="border px-4 py-2 text-center">Category Name</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={item.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 text-center">
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash onClick={()=>deleteCategoryHandler(item._id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
