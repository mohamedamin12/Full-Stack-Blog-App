/* eslint-disable react/prop-types */

import { FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={post?.image?.url}
          alt={post?.title}
          className="w-full h-64 object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post?.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-ellipsis">
          {post?.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaRegClock className="mr-2" />
            <span>{new Date(post?.createdAt).toDateString()}</span>
          </div>
          <Link to={`/posts/${post?._id}`} className="text-blue-500 hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;




