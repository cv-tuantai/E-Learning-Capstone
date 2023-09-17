import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";

export const updateCourse = (formData) => {
  return (dispatch) => {
    dispatch(updateCourseRequest());

    api
      .post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
      .then((result) => {
        dispatch(updateCourseSuccess(result.data));
        Swal.fire("Thành công", "Cập nhật khóa học thành công", "success");
      })
      .catch((error) => {
        dispatch(updateCourseFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

export const updateCourseNoImage = (values) => {
  return (dispatch) => {
    dispatch(updateCourseRequest());

    api
      .put("QuanLyKhoaHoc/CapNhatKhoaHoc", values)
      .then((result) => {
        dispatch(updateCourseSuccess(result.data));
        Swal.fire("Thành công", "Cập nhật khóa học thành công", "success").then(
          () => window.location.reload(),
        );
      })
      .catch((error) => {
        dispatch(updateCourseFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

const updateCourseRequest = () => ({ type: actionTypes.UPDATE_COURSE_REQUEST });

const updateCourseSuccess = (data) => ({
  type: actionTypes.UPDATE_COURSE_SUCCESS,
  payload: data,
});

const updateCourseFail = (error) => ({
  type: actionTypes.UPDATE_COURSE_FAIL,
  payload: error,
});
