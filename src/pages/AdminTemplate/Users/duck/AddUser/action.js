import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getListUsers } from "../ListUsers/actions";

export const addUser = (data) => {
  return (dispatch) => {
    dispatch(addUserRequest());

    api
      .post("QuanLyNguoiDung/ThemNguoiDung", data)
      .then((result) => {
        dispatch(addUserSuccess(result.data));
        dispatch(getListUsers());
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm người dùng thành công",
        }).then(() => window.location.reload());
      })
      .catch((error) => {
        dispatch(addUserFail(error));
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: error.response?.data,
        });
      });
  };
};

const addUserRequest = () => ({ type: actionTypes.ADD_USER_REQUEST });

const addUserSuccess = (data) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload: data,
});

const addUserFail = (error) => ({
  type: actionTypes.ADD_USER_FAIL,
  payload: error,
});
