/* eslint-disable react/prop-types */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCalls";




function UpdateProfileModal({handleCloseModal , profile}) {

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();

    const updateUser = {username , bio}

    if (password.trim() !== ""){
        updateUser.password = password
    }
    
    dispatch(updateUserProfile(profile?._id, updateUser))
    
    handleCloseModal()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter username"
            value={username} 
            onChange={(e)=> setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="Enter password"
          value={password} 
          onChange={(e)=> setPassword(e.target.value)}
        />
      </div>
  
    
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-2"
            rows="4"
            placeholder="Enter bio description"
            value={bio} 
            onChange={(e)=> setBio(e.target.value)}
          ></textarea>
        </div>


        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default UpdateProfileModal
