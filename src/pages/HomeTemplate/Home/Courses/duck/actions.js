import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";

export const fetchListCourses = (keyword = "") => {
  return (dispatch) => {
    dispatch(actListCoursesRequest());

    const url = keyword
      ? `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=GP09`
      : "QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09";

    api
      .get(url)
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
