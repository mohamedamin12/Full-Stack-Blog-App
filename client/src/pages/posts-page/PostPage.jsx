/* eslint-disable react-hooks/exhaustive-deps */
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch , useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { fetchPosts , getPostsCount } from "../../redux/apiCalls/postApiCall";

const POSTS_PER_PAGE = 4;

const PostPage = () => {
  const dispatch = useDispatch();
  const { postsCount , posts } = useSelector(state => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(postsCount / POSTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <main className="flex-grow md:w-3/4 lg:w-4/5">
            <PostList posts={posts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>

          {/* Sidebar */}
          <aside className="w-full ml-10 md:w-1/4 lg:w-1/5 mt-8 md:mt-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

