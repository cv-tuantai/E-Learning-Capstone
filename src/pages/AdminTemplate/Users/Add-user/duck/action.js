import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";

export const addUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(addUserRequest());

    api
      .post("QuanLyNguoiDung/ThemNguoiDung", data)
      .then((result) => {
        console.log(result);
        dispatch(addUserSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm người dùng thành công",
        }).then(() => navigate("/admin/users", { replace: true }));
      })
      .catch((error) => {
        dispatch(addUserFail(error));
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Thông tin người dùng đã tồn tại",
        });
      });
  };
};

const addUserRequest = () => ({ type: actionTypes.ADD_USER_REQUEST });

const addUserSuccess = (data) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload: data,
});

const addUserFail = (error) => ({
  type: actionTypes.ADD_USER_FAIL,
  payload: error,
});
