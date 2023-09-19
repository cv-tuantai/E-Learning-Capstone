import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getUsersWaitConfirm = (maKhoaHoc) => {
  return (dispatch) => {
    dispatch(usersWaitConfirmRequest());

    api
      .post("QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", maKhoaHoc)
      .then((result) => {
        dispatch(usersWaitConfirmSuccess(result.data));
      })
      .catch((error) => {
        dispatch(usersWaitConfirmFail(error));
      });
  };
};

const usersWaitConfirmRequest = () => ({
  type: actionTypes.USERS_WAIT_CONFIRM_REQUEST,
});

const usersWaitConfirmSuccess = (data) => ({
  type: actionTypes.USERS_WAIT_CONFIRM_SUCCESS,
  payload: data,
});

const usersWaitConfirmFail = (error) => ({
  type: actionTypes.USERS_WAIT_CONFIRM_FAIL,
  payload: error,
});
