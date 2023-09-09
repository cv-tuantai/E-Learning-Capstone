import * as actionTypes from "./constants";
import api from "../../../utils/apiUtil";

export const fetchCoursesCate = () => {
  return (dispatch) => {
    dispatch(actCoursesCateRequest());

    api
      .get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((result) => {
        dispatch(actCoursesCateSuccess(result.data));
      })
      .catch((error) => dispatch(actCoursesCateFail(error)));
  };
};

const actCoursesCateRequest = () => ({
  type: actionTypes.FETCH_COURSE_CATE_REQUEST,
});

const actCoursesCateSuccess = (data) => ({
  type: actionTypes.FETCH_COURSE_CATE_SUCCESS,
  payload: data,
});

const actCoursesCateFail = (error) => ({
  type: actionTypes.FETCH_COURSE_CATE_FAIL,
  payload: error,
});
