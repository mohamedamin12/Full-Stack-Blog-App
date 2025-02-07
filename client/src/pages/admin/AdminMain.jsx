/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { FaUser, FaFileAlt, FaTags, FaComments } from 'react-icons/fa';
import AddCategoryForm from './AddCategoryForm';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from '../../redux/apiCalls/profileApiCalls';
import { getPostsCount } from '../../redux/apiCalls/postApiCall';
import { fetchAllComments } from '../../redux/apiCalls/commentApiCall';

function AdminMain() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { usersCount } = useSelector(state => state.profile);
  const { postsCount } = useSelector(state => state.post);
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
   }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-gray-800">Users</h5>
            <FaUser className="text-blue-500 text-3xl" />
          </div>
          <div className="text-3xl font-semibold text-gray-600 mt-4">
            {usersCount}
          </div>
          <Link
            to="/admin-dashboard/users-table"
            className="mt-4 block text-blue-600 hover:underline"
          >
            See all users
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-gray-800">Posts</h5>
            <FaFileAlt className="text-green-500 text-3xl" />
          </div>
          <div className="text-3xl font-semibold text-gray-600 mt-4">
              {postsCount}
          </div>
          <Link
            to="/admin-dashboard/posts-table"
            className="mt-4 block text-blue-600 hover:underline"
          >
            See all posts
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-gray-800">Categories</h5>
            <FaTags className="text-yellow-500 text-3xl" />
          </div>
          <div className="text-3xl font-semibold text-gray-600 mt-4">
            {categories.length}
          </div>
          <Link
            to="/admin-dashboard/categories-table"
            className="mt-4 block text-blue-600 hover:underline"
          >
            See all categories
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-gray-800">Comments</h5>
            <FaComments className="text-red-500 text-3xl" />
          </div>
          <div className="text-3xl font-semibold text-gray-600 mt-4">
            {comments.length}
          </div>
          <Link
            to="/admin-dashboard/comments-table"
            className="mt-4 block text-blue-600 hover:underline"
          >
            See all comments
          </Link>
        </div>
      </div>
    

      <div className="mt-8">
        <AddCategoryForm />
      </div>
    </div>
  );
}

export default AdminMain
