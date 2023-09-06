import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";

export const fetchListCourses = () => {
  return (dispatch) => {
    dispatch(actListCoursesRequest());

    api
      .get("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09")
      .then((result) => {
        console.log(result);
        dispatch(actListCoursesSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actListCoursesFail(error));
      });
  };
};

const actListCoursesRequest = () => ({
  type: actionTypes.LIST_COURSES_REQUEST,
});

const actListCoursesSuccess = (data) => ({
  type: actionTypes.LIST_COURSES_SUCCESS,
  payload: data,
});

const actListCoursesFail = (error) => ({
  type: actionTypes.LIST_COURSES_FAIL,
  payload: error,
});
