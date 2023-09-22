import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";

export const registerCourse = (data, t) => {
  return (dispatch) => {
    dispatch(actRegisterCourseRequest());

    api
      .post("QuanLyKhoaHoc/DangKyKhoaHoc", data)
      .then((result) => {
        dispatch(actRegisterCourseSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: t("registerCourse.success"),
          text: t("registerCourse.successText"),
        });
      })
      .catch((error) => {
        dispatch(actRegisterCourseFail(error));
        Swal.fire({
          icon: "error",
          title: t("registerCourse.failure"),
          text: error.response?.data,
        });
      });
  };
};

const actRegisterCourseRequest = () => ({
  type: actionTypes.REGISTER_COURSE_REQUEST,
});

const actRegisterCourseSuccess = (data) => ({
  type: actionTypes.REGISTER_COURSE_REQUEST,
  payload: data,
});

const actRegisterCourseFail = (error) => ({
  type: actionTypes.REGISTER_COURSE_FAIL,
  payload: error,
});
