import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getUserDetail } from "../UserDetail/actions";

export const cancelCourse = (data, t) => {
  return (dispatch) => {
    dispatch(actCancelCourseRequest());

    api
      .post("QuanLyKhoaHoc/HuyGhiDanh", data)
      .then((result) => {
        dispatch(actCancelCourseSuccess(result.data));
        dispatch(getUserDetail());
        Swal.fire(
          t("cancelCourse.success"),
          t("cancelCourse.successText"),
          "success",
        );
      })
      .catch((error) => {
        dispatch(actCancelCourseFail(error));
        Swal.fire(t("cancelCourse.failure"), error.response?.data, "error");
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
