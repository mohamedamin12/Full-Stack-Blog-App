import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";

// ** get user profile **
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/users/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// ** upload user photo **
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await request.post(
        `/users/uploaded-profile-photo`,
        newPhoto,
        {
          headers: {
            Authorization: `Bearer ${state.auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      // modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// ** updated user profile  **
export function updateUserProfile(userId , profile) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await request.put(
        `/users/${userId}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${state.auth.user.token}`,
          },
        }
      );
      dispatch(profileActions.updateProfile(data.profile));
      dispatch(authActions.setUsername(data.profile));

      // modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//**  Delete Profile (Account) **
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(
        `/users/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

//**  Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/users/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//**  Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/users`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}