import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getUsersConfirmed = (maKhoaHoc) => {
  return (dispatch) => {
    dispatch(getUsersConfirmedRequest());

    api
      .post("QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", maKhoaHoc)
      .then((result) => {
        dispatch(getUsersConfirmedSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getUsersConfirmedFail(error));
      });
  };
};

const getUsersConfirmedRequest = () => ({
  type: actionTypes.USERS_CONFIRMED_REQUEST,
});

const getUsersConfirmedSuccess = (data) => ({
  type: actionTypes.USERS_CONFIRMED_SUCCESS,
  payload: data,
});

const getUsersConfirmedFail = (error) => ({
  type: actionTypes.USERS_CONFIRMED_FAIL,
  payload: error,
});
