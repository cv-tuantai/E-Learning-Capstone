import * as actionTypes from "./constants";
import api from "../../../../utils/apiUtil";
import Swal from "sweetalert2";

const TIME_EXPIRE = 60 * 60 * 1000;

export const actLogin = (data, navigate, t) => {
  return (dispatch) => {
    dispatch(actLoginRequest());

    api
      .post("QuanLyNguoiDung/DangNhap", data)
      .then((result) => {
        dispatch(actLoginSuccess(result.data));
        localStorage.setItem("user", JSON.stringify(result.data));

        // Tự động đăng xuất khi đến hạn (1 giờ)
        const time = new Date().getTime();
        const expire = time + TIME_EXPIRE;
        localStorage.setItem("expire", expire);
        dispatch(actTimeoutLogout(navigate, TIME_EXPIRE));

        Swal.fire({
          icon: "success",
          title: t("login.success"),
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/", { replace: true }));
      })
      .catch((error) => {
        dispatch(actLoginFail(error));
        Swal.fire({
          icon: "error",
          title: t("login.failure"),
          text: error.response?.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
};

export const actLogout = (navigate) => {
  localStorage.removeItem("user");
  localStorage.removeItem("expire");
  navigate("/user/login", { replace: true });
  return {
    type: actionTypes.LOGIN_CLEAN,
  };
};

const actTimeoutLogout = (navigate, expire) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(navigate));
    }, expire);
  };
};

export const actTryLogout = (navigate) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const expire = localStorage.getItem("expire");
    const time = new Date().getTime();
    if (time > expire) {
      dispatch(actLogout(navigate));
      return;
    }
    dispatch(actTimeoutLogout(navigate, expire - time));
    dispatch(actLoginSuccess(user));
  };
};

const actLoginRequest = () => ({ type: actionTypes.LOGIN_REQUEST });

const actLoginSuccess = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data,
});

const actLoginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: error,
});
