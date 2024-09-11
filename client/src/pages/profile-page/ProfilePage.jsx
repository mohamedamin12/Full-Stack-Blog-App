/* eslint-disable react-hooks/exhaustive-deps */
import { FaEdit, FaCamera, FaUpload, FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCalls";
import { useParams , useNavigate} from "react-router-dom";
import { Oval } from "react-loader-spinner";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const ProfilePage = () => {
  const [file, setFile] = useState();
  const { profile , loading ,isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select a file to upload");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

   // Delete Account Handler
   const deleteSubmitHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  const navigate = useNavigate();
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="grey"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            alt="user avatar"
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
          />

          <h1 className="text-2xl font-bold text-gray-800">
            {profile?.username}
          </h1>
          <p className="text-gray-600 mt-1">{profile?.bio}</p>
          <strong className="text-gray-500 mt-2">
            Joined on : {new Date(profile?.createdAt).toLocaleDateString()}
          </strong>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {user?._id === profile?._id && (
            <form
              onSubmit={formSubmitHandler}
              className="flex items-center space-x-4"
            >
              <label
                htmlFor="file"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition duration-300"
              >
                <FaCamera size={20} />
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
              >
                <FaUpload size={20} />
                <span>Upload</span>
              </button>
            </form>
          )}
        </div>

        {user?._id === profile?._id && (
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
            >
              <FaEdit size={20} />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={deleteSubmitHandler}
              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-2"
            >
              <FaTrash size={20} />
              <span>Delete Account</span>
            </button>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Posts</h2>
          {profile?.posts?.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <UpdateProfileModal
          profile={profile}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProfilePage;
