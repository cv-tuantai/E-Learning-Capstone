import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getCourseUnReg } from "../CoursesUnReg/actions";
import { getCourseWaitConfirm } from "../CourseWaitConfirm/actions";
import { getCourseConfirm } from "../CourseConfirmed/actions";

export const regCourseByAdmin = (data) => {
  return (dispatch) => {
    dispatch(regCourseByAdminRequest());

    api
      .post("QuanLyKhoaHoc/GhiDanhKhoaHoc", data)
      .then((result) => {
        dispatch(regCourseByAdminSuccess(result.data));
        dispatch(getCourseUnReg(data.taiKhoan));
        dispatch(getCourseWaitConfirm({ taiKhoan: data.taiKhoan }));
        dispatch(getCourseConfirm({ taiKhoan: data.taiKhoan }));
        Swal.fire("Thành công", "Ghi danh thành công", "success");
      })
      .catch((error) => {
        dispatch(regCourseByAdminFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

const regCourseByAdminRequest = () => ({
  type: actionTypes.REG_COURSE_BY_ADMIN_REQUEST,
});

const regCourseByAdminSuccess = (data) => ({
  type: actionTypes.REG_COURSE_BY_ADMIN_SUCCESS,
  payload: data,
});

const regCourseByAdminFail = (error) => ({
  type: actionTypes.REG_COURSE_BY_ADMIN_FAIL,
  payload: error,
});
