import { FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);


  useEffect(() => {
    dispatch(getAllPosts());
   }, []);

   // Delete Post Handler
   const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Title</th>
            <th className="border px-4 py-2 text-center">Category</th>
            <th className="border px-4 py-2 text-center">Date</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item , index)=> (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{item.title}</td>
              <td className="border px-4 py-2 text-center">{item.category}</td>
              <td className="border px-4 py-2 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2 text-center">
                <button className="text-red-600 hover:text-red-800" onClick={() => deletePostHandler(item._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
