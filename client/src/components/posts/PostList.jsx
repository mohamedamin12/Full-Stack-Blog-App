/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link  to={`/posts/${post._id}`} key={post._id} >
              <PostItem post={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;




