import * as actionTypes from "./constants";
import api from "../../../../../utils/apiUtil";
import Swal from "sweetalert2";
import { getUserDetail } from "../UserDetail/actions";
import { getListUsers } from "../../../../AdminTemplate/Users/duck/ListUsers/actions";

export const updateUser = (data, t) => {
  return (dispatch) => {
    dispatch(updateUserRequest());

    api
      .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
      .then((result) => {
        dispatch(updateUserSuccess(result.data));
        Swal.fire({
          icon: "success",
          title: t("update.success"),
          text: t("update.successText"),
        }).then(() => {
          const closeButton = document.querySelector(".btn-close");
          // sau Swal, đóng modal rồi mới getListUsers để tránh lỗi giao diện
          if (closeButton) {
            closeButton.addEventListener("click", () => {
              dispatch(getListUsers());
            });
            closeButton.click();
          } else {
            dispatch(getUserDetail());
          }
        });
      })
      .catch((error) => {
        dispatch(updateUserFail(error));
        Swal.fire({
          icon: "error",
          title: t("update.failure"),
          text: error.response?.data,
        });
      });
  };
};

const updateUserRequest = () => ({ type: actionTypes.UPDATE_USER_REQUEST });

const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: data,
});

const updateUserFail = (error) => ({
  type: actionTypes.UPDATE_USER_FAIL,
  payload: error,
});
