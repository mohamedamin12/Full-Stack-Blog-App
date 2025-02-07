/* eslint-disable react/prop-types */
import { FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

function UpdateCommentModal({ handleCloseModal, commentForUpdate }) {
  const dispatch = useDispatch();

  const [text, setText] = useState(commentForUpdate?.text);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text === "") return toast.error("Comment Text is required");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="update-comment-modal bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <abbr title="close" className="absolute top-4 right-4">
          <FaTimesCircle
            onClick={handleCloseModal}
            className="text-red-600 text-2xl cursor-pointer hover:text-red-800 transition duration-300 ease-in-out"
          />
        </abbr>
        <form onSubmit={formSubmitHandler} className="space-y-4">
          <h1 className="update-comment-title text-xl font-bold text-gray-800 text-center">
            Edit Comment
          </h1>
          <input
            type="text"
            className="update-comment-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="update-comment-btn w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Edit Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCommentModal;
