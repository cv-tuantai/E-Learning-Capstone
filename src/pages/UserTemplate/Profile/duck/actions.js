import * as actionTypes from "./constants";
import api from "../../../../utils/apiUtil";
import Swal from "sweetalert2";

export const getUserDetail = () => {
  return (dispatch) => {
    dispatch(getUserDetailRequest());

    api
      .post("QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((result) => {
        console.log(result);
        dispatch(getUserDetailSuccess(result.data));
      })
      .catch((error) => dispatch(getUserDetailFail(error)));
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    dispatch(updateUserRequest());

    api
      .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
      .then((result) => {
        console.log(result);
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
          title: "Thất bại",
          text: "Cập nhật thông tin người dùng thât bại",
        });
      });
  };
};

const getUserDetailRequest = () => ({
  type: actionTypes.GET_USER_DETAIL_REQUEST,
});

const getUserDetailSuccess = (data) => ({
  type: actionTypes.GET_USER_DETAIL_SUCCESS,
  payload: data,
});

const getUserDetailFail = (error) => ({
  type: actionTypes.GET_USER_DETAIL_FAIL,
  payload: error,
});

const updateUserRequest = () => ({ type: actionTypes.UPDATE_USER_REQUEST });

const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: data,
});

const updateUserFail = (error) => ({
  type: actionTypes.UPDATE_USER_FAIL,
  payload: error,
});
