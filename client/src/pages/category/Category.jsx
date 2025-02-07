/* eslint-disable react-hooks/exhaustive-deps */
import PostList from "../../components/posts/PostList";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";
import { useEffect } from "react";




function Category() {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            Posts with <span className="text-blue-600">{category}</span>
            category not found
          </h1>
          <Link
            to="/posts"
            className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Go to posts page
          </Link>
        </div>

        <div>
      {<h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Posts based on <span className="text-blue-600">{category}</span>
          </h1>}
          <PostList posts={postsCate} />
        </div>
    </section>
  );
}

export default Category;
