import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getCourseUnReg } from "../CoursesUnReg/actions";
import { getCourseWaitConfirm } from "../CourseWaitConfirm/actions";
import { getCourseConfirm } from "../CourseConfirmed/actions";

export const delCourseByAdmin = (data) => {
  return (dispatch) => {
    dispatch(delCourseByAdminRequest());

    api
      .post("QuanLyKhoaHoc/HuyGhiDanh", data)
      .then((result) => {
        dispatch(delCourseByAdminSuccess(result.data));
        dispatch(getCourseUnReg(data.taiKhoan));
        dispatch(getCourseWaitConfirm({ taiKhoan: data.taiKhoan }));
        dispatch(getCourseConfirm({ taiKhoan: data.taiKhoan }));
        Swal.fire("Thành công", "Hủy ghi danh thành công", "success");
      })
      .catch((error) => {
        dispatch(delCourseByAdminFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

const delCourseByAdminRequest = () => ({
  type: actionTypes.DEL_COURSE_BY_ADMIN_REQUEST,
});

const delCourseByAdminSuccess = (data) => ({
  type: actionTypes.DEL_COURSE_BY_ADMIN_SUCCESS,
  payload: data,
});

const delCourseByAdminFail = (error) => ({
  type: actionTypes.DEL_COURSE_BY_ADMIN_FAIL,
  payload: error,
});
