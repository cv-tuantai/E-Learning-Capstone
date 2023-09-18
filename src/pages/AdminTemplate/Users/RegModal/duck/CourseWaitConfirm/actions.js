import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getCourseWaitConfirm = (taiKhoan) => {
  return (dispatch) => {
    dispatch(courseWaitConfirmRequest());

    api
      .post("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", taiKhoan)
      .then((result) => {
        dispatch(courseWaitConfirmSuccess(result.data));
      })
      .catch((error) => {
        dispatch(courseWaitConfirmFail(error));
      });
  };
};

const courseWaitConfirmRequest = () => ({
  type: actionTypes.COURSES_WAIT_CONFIRM_REQUEST,
});

const courseWaitConfirmSuccess = (data) => ({
  type: actionTypes.COURSES_WAIT_CONFIRM_SUCCESS,
  payload: data,
});

const courseWaitConfirmFail = (error) => ({
  type: actionTypes.COURSES_WAIT_CONFIRM_FAIL,
  payload: error,
});
