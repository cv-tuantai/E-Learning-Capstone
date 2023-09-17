import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getUserDetail } from "../UserDetail/actions";

export const updateUser = (data) => {
  return (dispatch) => {
    dispatch(updateUserRequest());

    api
      .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
      .then((result) => {
        dispatch(updateUserSuccess(result.data));
        dispatch(getUserDetail());
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Cập nhật thông tin người dùng thành công",
        });
      })
      .catch((error) => {
        dispatch(updateUserFail(error));
        Swal.fire({
          icon: "error",
          title: error.response?.data,
          text: "Cập nhật thông tin người dùng thât bại",
        });
      });
  };
};

const updateUserRequest = () => ({ type: actionTypes.UPDATE_USER_REQUEST });

const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: data,
});

const updateUserFail = (error) => ({
  type: actionTypes.UPDATE_USER_FAIL,
  payload: error,
});
