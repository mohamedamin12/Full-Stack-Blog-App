/* eslint-disable react-hooks/exhaustive-deps */
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row p-8 space-y-8 md:space-y-0">
        <main className="flex-grow md:w-3/4 lg:w-4/5">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Welcome to <span className="text-blue-600">Blog App</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-4">
                Create, share, and explore the latest articles from around the
                world. Join our community today and start your blogging journey!
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="src/images/home-page.png"
                alt="Blogging illustration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-12">
            <PostList posts={posts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
