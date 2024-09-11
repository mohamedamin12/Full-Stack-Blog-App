/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

function UpdatePostModal({ handleCloseModal, post }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") return toast.error("Post Title is required");
    if (description === "") return toast.error("Post description is required");
    if (category === "") return toast.error("Post category is required");

    dispatch(updatePost({ title, category, description }, post?._id));

    handleCloseModal();
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Update Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Post Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Post Details</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-2"
              rows="4"
              placeholder="Enter post details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled value="">
                Select category
              </option>
              {categories.map((category) => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostModal;
