import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";

export const getUserDetail = () => {
  return (dispatch) => {
    dispatch(getUserDetailRequest());

    api
      .post("QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((result) => {
        console.log(result);
        dispatch(getUserDetailSuccess(result.data));
      })
      .catch((error) => dispatch(getUserDetailFail(error)));
  };
};

const getUserDetailRequest = () => ({
  type: actionTypes.GET_USER_DETAIL_REQUEST,
});

const getUserDetailSuccess = (data) => ({
  type: actionTypes.GET_USER_DETAIL_SUCCESS,
  payload: data,
});

const getUserDetailFail = (error) => ({
  type: actionTypes.GET_USER_DETAIL_FAIL,
  payload: error,
});
