import * as actionTypes from "./constants";
import api from "../../../../utils/apiUtil";

export const fetchCoursesByCate = (cate) => {
  return (dispatch) => {
    dispatch(actCourseByCateRequest());

    api
      .get(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${cate}&MaNhom=GP09`)
      .then((result) => {
        console.log(result);
        dispatch(actCourseByCateSuccess(result.data));
      })
      .catch((error) => dispatch(actCourseByCateFail(error)));
  };
};

const actCourseByCateRequest = () => ({
  type: actionTypes.GET_COURSES_BY_CATE_REQUEST,
});

const actCourseByCateSuccess = (data) => ({
  type: actionTypes.GET_COURSES_BY_CATE_SUCCESS,
  payload: data,
});

const actCourseByCateFail = (error) => ({
  type: actionTypes.GET_COURSES_BY_CATE_FAIL,
  payload: error,
});
