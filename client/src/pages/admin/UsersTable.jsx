/* eslint-disable react-hooks/exhaustive-deps */
import {  FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCalls"

const UsersTable = () => {

  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Name</th>
            <th className="border px-4 py-2 text-center">Email</th>
            <th className="border px-4 py-2 text-center">Role</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
        {profiles.map((item , index)=>(
          <tr key={index}>
            <td className="border px-4 py-2 text-center">{item.username}</td>
            <td className="border px-4 py-2 text-center">{item.email}</td>
            <td className="border px-4 py-2 text-center">{item.role}</td>
            <td className="border px-4 py-2 text-center">
              <button className="text-red-600 hover:text-red-800" onClick={()=>deleteUserHandler(item._id)}>
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

export default UsersTable;
