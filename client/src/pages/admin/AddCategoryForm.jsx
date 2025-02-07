import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";


function AddCategoryForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
    // Form Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "") return toast.error("Category Title is required");
  
      dispatch(createCategory({ title }));
      setTitle("");
    };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
    <h6 className="text-lg font-bold text-gray-800 mb-4">Add New Category</h6>
    <form onSubmit={formSubmitHandler}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Category Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter Category Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
  )
}

export default AddCategoryForm
