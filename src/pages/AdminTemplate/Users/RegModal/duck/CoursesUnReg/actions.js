import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";

export const getCourseUnReg = (taiKhoan) => {
  return (dispatch) => {
    dispatch(getCourseUnRegRequest());

    api
      .post(
        `QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
      )
      .then((result) => {
        dispatch(getCourseUnRegSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getCourseUnRegFail(error));
      });
  };
};

const getCourseUnRegRequest = () => ({
  type: actionTypes.COURSES_UNREG_REQUEST,
});

const getCourseUnRegSuccess = (data) => ({
  type: actionTypes.COURSES_UNREG_SUCCESS,
  payload: data,
});

const getCourseUnRegFail = (error) => ({
  type: actionTypes.COURSES_UNREG_FAIL,
  payload: error,
});
