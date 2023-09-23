import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { fetchListCourses } from "../../../../HomeTemplate/Home/Courses/duck/actions";

export const updateCourse = (formData, t) => {
  return (dispatch) => {
    dispatch(updateCourseRequest());

    api
      .post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
      .then((result) => {
        dispatch(updateCourseSuccess(result.data));
        Swal.fire(t("modal.success"), t("modal.updateSuccess"), "success").then(
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
        Swal.fire(t("modal.failure"), error.response?.data, "error");
      });
  };
};

export const updateCourseNoImage = (values, t) => {
  return (dispatch) => {
    dispatch(updateCourseRequest());

    api
      .put("QuanLyKhoaHoc/CapNhatKhoaHoc", values)
      .then((result) => {
        dispatch(updateCourseSuccess(result.data));
        Swal.fire(t("modal.success"), t("modal.updateSuccess"), "success").then(
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
        Swal.fire(t("modal.failure"), error.response?.data, "error");
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
