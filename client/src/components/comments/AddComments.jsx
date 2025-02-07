/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";
import { useState } from "react";
import { toast } from "react-toastify";

const AddComments = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    dispatch(createComment({ text, postId }));
    setText("");
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      className="add-comment flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4"
    >
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input w-full sm:w-auto flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="add-comment-btn bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
      >
       Add Comment
      </button>
    </form>
  );
};

export default AddComments;
