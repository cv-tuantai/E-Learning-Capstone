import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getCourseConfirm = (taiKhoan) => {
  return (dispatch) => {
    dispatch(courseConfirmRequest());

    api
      .post("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", taiKhoan)
      .then((result) => {
        dispatch(courseConfirmSuccess(result.data));
      })
      .catch((error) => {
        dispatch(courseConfirmFail(error));
      });
  };
};

const courseConfirmRequest = () => ({
  type: actionTypes.COURSES_CONFIRM_REQUEST,
});

const courseConfirmSuccess = (data) => ({
  type: actionTypes.COURSES_CONFIRM_SUCCESS,
  payload: data,
});

const courseConfirmFail = (error) => ({
  type: actionTypes.COURSES_CONFIRM_FAIL,
  payload: error,
});
