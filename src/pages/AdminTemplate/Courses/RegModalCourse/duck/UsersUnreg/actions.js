import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getUsersUnreg = (maKhoaHoc) => {
  return (dispatch) => {
    dispatch(getUsersUnregRequest());

    api
      .post("QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", maKhoaHoc)
      .then((result) => {
        dispatch(getUsersUnregSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getUsersUnregFail(error));
      });
  };
};

const getUsersUnregRequest = () => ({
  type: actionTypes.USERS_UNREG_REQUEST,
});

const getUsersUnregSuccess = (data) => ({
  type: actionTypes.USERS_UNREG_SUCCESS,
  payload: data,
});

const getUsersUnregFail = (error) => ({
  type: actionTypes.USERS_UNREG_FAIL,
  payload: error,
});
