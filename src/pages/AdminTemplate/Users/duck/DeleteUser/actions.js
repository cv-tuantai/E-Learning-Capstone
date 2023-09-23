import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getListUsers } from "../ListUsers/actions";

export const deleteUser = (user, t) => {
  return (dispatch) => {
    dispatch(deleteUserRequest());

    api
      .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
      .then((result) => {
        dispatch(deleteUserSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: t("userModal.success"),
          text: t("userModal.delSuccess"),
        }).then(() => dispatch(getListUsers()));
      })
      .catch((error) => {
        dispatch(deleteUserFail(error));
        Swal.fire({
          icon: "error",
          title: t("userModal.failure"),
          text: error.response?.data,
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
