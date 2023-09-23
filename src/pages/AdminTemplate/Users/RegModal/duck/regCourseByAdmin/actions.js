import * as actionTypes from "./constants";
import api from "../../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getCourseUnReg } from "../CoursesUnReg/actions";
import { getCourseWaitConfirm } from "../CourseWaitConfirm/actions";
import { getCourseConfirm } from "../CourseConfirmed/actions";
import { getUsersUnreg } from "../../../../Courses/RegModalCourse/duck/UsersUnreg/actions";
import { getUsersWaitConfirm } from "../../../../Courses/RegModalCourse/duck/UsersWaitConfirm/actions";
import { getUsersConfirmed } from "../../../../Courses/RegModalCourse/duck/UsersConfirmed/actions";

export const regCourseByAdmin = (data, pathname, t) => {
  return (dispatch) => {
    dispatch(regCourseByAdminRequest());

    api
      .post("QuanLyKhoaHoc/GhiDanhKhoaHoc", data)
      .then((result) => {
        dispatch(regCourseByAdminSuccess(result.data));
        if (pathname === "/admin/users") {
          dispatch(getCourseUnReg(data.taiKhoan));
          dispatch(getCourseWaitConfirm({ taiKhoan: data.taiKhoan }));
          dispatch(getCourseConfirm({ taiKhoan: data.taiKhoan }));
        } else if (pathname === "/admin/courses") {
          dispatch(getUsersUnreg({ maKhoaHoc: data.maKhoaHoc }));
          dispatch(getUsersWaitConfirm({ maKhoaHoc: data.maKhoaHoc }));
          dispatch(getUsersConfirmed({ maKhoaHoc: data.maKhoaHoc }));
        }
        Swal.fire(t("userModal.success"), t("userModal.regSuccess"), "success");
      })
      .catch((error) => {
        dispatch(regCourseByAdminFail(error));
        Swal.fire(t("userModal.failure"), error.response?.data, "error");
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
