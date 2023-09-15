import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getUserDetail } from "../UserDetail/actions";

export const cancelCourse = (data) => {
  return (dispatch) => {
    dispatch(actCancelCourseRequest());

    api
      .post("QuanLyKhoaHoc/HuyGhiDanh", data)
      .then((result) => {
        dispatch(actCancelCourseSuccess(result.data));
        dispatch(getUserDetail());
        Swal.fire("Thành công", "Hủy đăng ký khóa học thành công", "success");
      })
      .catch((error) => {
        dispatch(actCancelCourseFail(error));
        Swal.fire("Thất bại", error.response?.data, "error");
      });
  };
};

const actCancelCourseRequest = () => ({
  type: actionTypes.CANCEL_COURSE_REQUEST,
});

const actCancelCourseSuccess = (data) => ({
  type: actionTypes.CANCEL_COURSE_SUCCESS,
  payload: data,
});

const actCancelCourseFail = (error) => ({
  type: actionTypes.CANCEL_COURSE_FAIL,
  payload: error,
});
