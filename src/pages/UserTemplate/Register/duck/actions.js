import * as actionTypes from "./constants";
import api from "../../../../utils/apiUtil";
import Swal from "sweetalert2";

export const actRegister = (data, navigate) => {
  return (dispatch) => {
    dispatch(actRegisterRequest());

    api
      .post("QuanLyNguoiDung/DangKy", data)
      .then((result) => {
        dispatch(actRegisterSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/user/login", { replace: true });
        });
      })
      .catch((error) => {
        dispatch(actRegisterFail(error));
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại!",
          text: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
};

const actRegisterRequest = () => ({ type: actionTypes.REGISTER_REQUEST });

const actRegisterSuccess = (data) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: data,
});

const actRegisterFail = (error) => ({
  type: actionTypes.REGISTER_FAIL,
  payload: error,
});
