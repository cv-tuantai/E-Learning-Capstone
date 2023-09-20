import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { fetchListCourses } from "../../../../HomeTemplate/Home/Courses/duck/actions";

export const addCourse = (formData) => {
  return (dispatch) => {
    dispatch(addCourseRequest());

    api
      .post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData)
      .then((result) => {
        dispatch(addCourseSuccess(result.data));
        Swal.fire("Thành công", "Thêm khóa học thành công", "success").then(
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
        dispatch(addCourseFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

const addCourseRequest = () => ({ type: actionTypes.ADD_COURSE_REQUEST });

const addCourseSuccess = (data) => ({
  type: actionTypes.ADD_COURSE_SUCCESS,
  payload: data,
});

const addCourseFail = (error) => ({
  type: actionTypes.ADD_COURSE_FAIL,
  payload: error,
});
