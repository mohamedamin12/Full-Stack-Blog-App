/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddComments from "../../components/comments/AddComments";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import { FaImage, FaThumbsUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const handleCloseModal = () => {
    setUpdatePost(false);
  };

  const navigate = useNavigate();

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details p-4 bg-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto my-8">
      <div className="post-details-image-wrapper mb-6">
        <img
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt="Post Image"
          className="post-details-image w-full object-cover rounded-lg aspect-[16/9] md:aspect-[4/3]"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form mt-4 flex flex-col items-center"
          >
            <label
              htmlFor="file"
              className="update-post-label flex items-center cursor-pointer text-blue-600 hover:text-blue-800"
            >
              <FaImage className="mr-2" />
              Select new image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Upload
            </button>
          </form>
        )}
      </div>

      <h1 className="post-details-title text-3xl font-bold mb-4 text-gray-800">
        {post?.title}
      </h1>

      <div className="post-details-user-info flex items-center mb-6">
        <div className="post-details-user text-sm text-gray-600">
          <strong className="text-gray-900">
            <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
          </strong>
          <span className="block">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </div>

      <p className="post-details-description text-gray-700 leading-relaxed mb-6">
        {post?.description}
      </p>

      <div className="post-details-icon-wrapper flex justify-between items-center mb-6">
        <div className="flex items-center">
          {user && (
            <FaThumbsUp
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={`mr-2 cursor-pointer ${
                post?.likes?.includes(user?._id)
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
          )}
          <small className="text-gray-600">{post?.likes?.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div className="flex items-center space-x-4">
            <FaPencilAlt
              onClick={() => setUpdatePost(true)}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            />
            <FaTrash
              onClick={deletePostHandler}
              className="text-red-500 cursor-pointer hover:text-red-700"
            />
          </div>
        )}
      </div>

      {user ? (
        <AddComments postId={post?._id} />
      ) : (
        <p className="post-details-info-write text-sm text-red-600">
          To write a comment, you should login first
        </p>
      )}

      <CommentList comments={post?.comments} />

      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} handleCloseModal={handleCloseModal} />
      )}
    </section>
  );
};

export default PostDetails;
