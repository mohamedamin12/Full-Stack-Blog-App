import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/category");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//**  Create Category
export function createCategory(newCategory) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/category", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("category created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//**  Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}