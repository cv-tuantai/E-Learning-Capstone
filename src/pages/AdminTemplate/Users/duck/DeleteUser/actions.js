import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getListUsers } from "../ListUsers/actions";

export const deleteUser = (user) => {
  return (dispatch) => {
    dispatch(deleteUserRequest());

    api
      .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
      .then((result) => {
        dispatch(deleteUserSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Xóa người dùng thành công",
        }).then(() => dispatch(getListUsers()));
      })
      .catch((error) => {
        dispatch(deleteUserFail(error));
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Xóa người dùng thất bại, hãy kiểm tra lại",
        });
      });
  };
};

const deleteUserRequest = () => ({ type: actionTypes.DELETE_USER_REQUEST });

const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  payload: data,
});

const deleteUserFail = (error) => ({
  type: actionTypes.DELETE_USER_FAIL,
  payload: error,
});
