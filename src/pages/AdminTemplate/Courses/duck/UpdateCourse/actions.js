import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { fetchListCourses } from "../../../../HomeTemplate/Home/Courses/duck/actions";

export const updateCourse = (formData) => {
  return (dispatch) => {
    dispatch(updateCourseRequest());

    api
      .post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
      .then((result) => {
        dispatch(updateCourseSuccess(result.data));
        Swal.fire("Thành công", "Cập nhật khóa học thành công", "success").then(
          () => {
            const closeButton = document.querySelector(".btn-close");
            // sau Swal, đóng modal rồi mới dispatch để tránh lỗi giao diện
            if (closeButton) {
              closeButton.addEventListener("click", () => {
                dispatch(fetchListCourses());
              });
              closeButton.click();
            }
          },
        );
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
          () => {
            const closeButton = document.querySelector(".btn-close");
            // sau Swal, đóng modal rồi mới dispatch để tránh lỗi giao diện
            if (closeButton) {
              closeButton.addEventListener("click", () => {
                dispatch(fetchListCourses());
              });
              closeButton.click();
            }
          },
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
