import React from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import { updateUser } from "../../../UserTemplate/Profile/duck/UpdateUser/actions";
import { addUser } from "../duck/AddUser/action";
import * as yup from "yup";
import "@fortawesome/fontawesome-free/css/all.css";
import { useTranslation } from "react-i18next";

export default function UserModal(props) {
  const dispatch = useDispatch();
  const { dataUser } = props;
  const { t } = useTranslation("userTemplate");

  const userSchema = yup.object().shape({
    taiKhoan: yup
      .string()
      .min(2, t("profile.accTooShort"))
      .max(20, t("profile.accNoMore20"))
      .required(t("profile.accNotBlank")),
    matKhau: yup
      .string()
      .required(t("profile.passNotBlank"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t("profile.special"),
      ),
    hoTen: yup
      .string()
      .required(t("profile.nameNotBlank"))
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
        t("profile.character"),
      ),
    soDT: yup
      .string()
      .required(t("profile.numberNotBlank"))
      .matches(
        /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        t("profile.numberFormat"),
      ),
    email: yup
      .string()
      .required(t("profile.emailNotBlank"))
      .email(t("profile.emailFormat")),
  });

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {dataUser ? t("users.updateUser") : t("users.addUser")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <Formik
              enableReinitialize
              initialValues={{
                taiKhoan: dataUser?.taiKhoan || "",
                matKhau: dataUser?.matKhau || "",
                hoTen: dataUser?.hoTen || "",
                soDT: dataUser?.soDt || "",
                maNhom: "GP09",
                email: dataUser?.email || "",
                maLoaiNguoiDung: dataUser?.maLoaiNguoiDung || "HV",
              }}
              validationSchema={userSchema}
              onSubmit={(values) => {
                Swal.fire({
                  icon: "question",
                  title: t("users.confirm"),
                  text: t("users.AreYouSure"),
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: t("users.agree"),
                  cancelButtonText: t("users.cancel"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dataUser
                      ? dispatch(updateUser(values, t))
                      : dispatch(addUser(values, t));
                  }
                });
              }}
            >
              {() => (
                <Form className="mx-1 mx-md-4">
                  <label className="form-label ms-5">{t("users.acc")}</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        type="text"
                        name="taiKhoan"
                        className="form-control"
                        placeholder={t("users.accInput")}
                        style={{ fontSize: 15 }}
                        disabled={dataUser}
                      />
                      <ErrorMessage
                        name="taiKhoan"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <label className="form-label ms-5">{t("users.pass")}</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        type="password"
                        name="matKhau"
                        className="form-control"
                        placeholder={t("users.passInput")}
                        style={{ fontSize: 15 }}
                      />
                      <ErrorMessage
                        name="matKhau"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <label className="form-label ms-5">{t("users.name")}</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        type="text"
                        className="form-control"
                        name="hoTen"
                        placeholder={t("users.nameInput")}
                        style={{ fontSize: 15 }}
                      />
                      <ErrorMessage
                        name="hoTen"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <label className="form-label ms-5">{t("users.phone")}</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        type="text"
                        name="soDT"
                        className="form-control"
                        placeholder={t("users.phoneInput")}
                        style={{ fontSize: 15 }}
                      />
                      <ErrorMessage
                        name="soDT"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <label className="form-label ms-5">Email</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder={t("users.emailInput")}
                        style={{ fontSize: 15 }}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <label className="form-label ms-5">
                    {t("users.typeUser")}
                  </label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa-solid fa-users fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <Field
                        as="select"
                        name="maLoaiNguoiDung"
                        className="form-control"
                        style={{ fontSize: 15 }}
                      >
                        <option value="HV">{t("users.student")}</option>
                        <option value="GV">{t("users.teacher")}</option>
                      </Field>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      {dataUser ? t("users.up") : t("users.add")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
