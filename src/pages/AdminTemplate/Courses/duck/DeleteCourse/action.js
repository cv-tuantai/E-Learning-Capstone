import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { fetchListCourses } from "../../../../HomeTemplate/Home/Courses/duck/actions";

export const deleteCourse = (maKhoaHoc, t) => {
  return (dispatch) => {
    dispatch(deleteCourseRequest());

    api
      .delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
      .then((result) => {
        dispatch(deleteCourseSuccess(result.data));
        Swal.fire(t("modal.success"), t("modal.delSuccess"), "success").then(
          () => dispatch(fetchListCourses()),
        );
      })
      .catch((error) => {
        dispatch(deleteCourseFail(error));
        Swal.fire(t("modal.failure"), error.response?.data, "error");
      });
  };
};

const deleteCourseRequest = () => ({ type: actionTypes.DELETE_COURSE_REQUEST });

const deleteCourseSuccess = (data) => ({
  type: actionTypes.DELETE_COURSE_SUCCESS,
  payload: data,
});

const deleteCourseFail = (error) => ({
  type: actionTypes.DELETE_COURSE_FAIL,
  payload: error,
});
