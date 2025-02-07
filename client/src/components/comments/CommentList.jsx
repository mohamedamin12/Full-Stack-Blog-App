/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import {  useDispatch, useSelector } from "react-redux";
// import { deleteComment } from "../../redux/apiCalls/commentApiCall";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import {BsPencilSquare , BsTrashFill} from "react-icons/bs"
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  const handleCloseModal = () => {
    setUpdateComment(false);
    setCommentForUpdate(null);
  }

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">
        {comments?.length} Comments
      </h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-gray-700">{comment.username}</div>
            <div className="text-sm text-gray-500">
              <p>{formatDistanceToNow(new Date(comment.createdAt))} ago</p>
              ago
            </div>
          </div>
          <p className="text-gray-700 mb-2">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="flex space-x-4">
              <button
                onClick={() => updateCommentHandler(comment)}
                className="text-blue-500 hover:text-blue-700 transition duration-300"
              >
                <BsPencilSquare />
              </button>
              <button
                onClick={() => deleteCommentHandler(comment?._id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <BsTrashFill />
              </button>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CommentList;
