import * as actionTypes from "./constants";
import api from "../../../../utils/apiUtil";

export const getDetailCourse = (maKhoaHoc) => {
  return (dispatch) => {
    dispatch(actDetailCourseRequest());

    api
      .get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
      .then((result) => {
        console.log(result);
        dispatch(actDetailCourseSuccess(result.data));
      })
      .catch((error) => dispatch(actDetailCourseFail(error)));
  };
};

const actDetailCourseRequest = () => ({
  type: actionTypes.GET_DETAIL_COURSE_REQUEST,
});

const actDetailCourseSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_COURSE_SUCCESS,
  payload: data,
});

const actDetailCourseFail = (error) => ({
  type: actionTypes.GET_DETAIL_COURSE_FAIL,
  payload: error,
});
