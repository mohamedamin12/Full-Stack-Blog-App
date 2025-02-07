import {  FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Count</th>
            <th className="border px-4 py-2 text-center">User</th>
            <th className="border px-4 py-2 text-center">Comment</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          comments.map((item , index)=>(
            <tr key={item._id}>
            <td className="border px-4 py-2 text-center">{index + 1}</td>
            <td className="border px-4 py-2 text-center">{item.username}</td>
            <td className="border px-4 py-2 text-center">{item.text}</td>
            <td className="border px-4 py-2 text-center">
              <button className="text-red-600 hover:text-red-800">
                <FaTrash onClick={()=>deleteCommentHandler(item._id)}/>
              </button>
            </td>
          </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
