import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getCourseUnReg } from "../CoursesUnReg/actions";
import { getCourseWaitConfirm } from "../CourseWaitConfirm/actions";
import { getCourseConfirm } from "../CourseConfirmed/actions";
import { getUsersUnreg } from "../../../../Courses/RegModalCourse/duck/UsersUnreg/actions";
import { getUsersWaitConfirm } from "../../../../Courses/RegModalCourse/duck/UsersWaitConfirm/actions";
import { getUsersConfirmed } from "../../../../Courses/RegModalCourse/duck/UsersConfirmed/actions";

export const delCourseByAdmin = (data, pathname) => {
  return (dispatch) => {
    dispatch(delCourseByAdminRequest());

    api
      .post("QuanLyKhoaHoc/HuyGhiDanh", data)
      .then((result) => {
        dispatch(delCourseByAdminSuccess(result.data));
        if (pathname === "/admin/users") {
          dispatch(getCourseUnReg(data.taiKhoan));
          dispatch(getCourseWaitConfirm({ taiKhoan: data.taiKhoan }));
          dispatch(getCourseConfirm({ taiKhoan: data.taiKhoan }));
        } else if (pathname === "/admin/courses") {
          dispatch(getUsersUnreg({ maKhoaHoc: data.maKhoaHoc }));
          dispatch(getUsersWaitConfirm({ maKhoaHoc: data.maKhoaHoc }));
          dispatch(getUsersConfirmed({ maKhoaHoc: data.maKhoaHoc }));
        }
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
