import { toast } from "react-toastify";
import request from "../../utils/request";
import {authActions} from "../slices/authSlice";


// ** login user **
export function loginUser(user){
  return async (dispatch)=>{
    try {
        const {data} = await request.post('/auth/login' , user)
        dispatch(authActions.login(data))
        localStorage.setItem('userInfo', JSON.stringify(data))  
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// ** register user **
export function registerUser(user){
  return async (dispatch)=>{
    try {
        const {data} = await request.post('/auth/register' , user)
        dispatch(authActions.register(data.message))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// ** logout user **
export function logoutUser(){
  return  (dispatch)=>{
    dispatch(authActions.logout());
    localStorage.removeItem('userInfo');
  }

}


//**  Verify Email **
export function verifyEmail(userId,token) {
  return async (dispatch) => {
    try {
      await request.get(`/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  }
}

