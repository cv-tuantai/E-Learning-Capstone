import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";

export const getListUsers = (keyword = "") => {
  return (dispatch) => {
    dispatch(getListUsersRequest());

    const url = keyword
      ? `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09&tuKhoa=${keyword}`
      : "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09";

    api
      .get(url)
      .then((result) => {
        console.log(result);
        dispatch(getListUsersSuccess(result.data));
      })
      .catch((error) => dispatch(getListUsersFail(error)));
  };
};

const getListUsersRequest = () => ({ type: actionTypes.GET_LIST_USER_REQUEST });

const getListUsersSuccess = (data) => ({
  type: actionTypes.GET_LIST_USER_SUCCESS,
  payload: data,
});

const getListUsersFail = (error) => ({
  type: actionTypes.GET_LIST_USER_FAIL,
  payload: error,
});
