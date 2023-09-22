import React, { useState } from "react";
import imgReg from "../../../assets/images/login.webp";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { actRegister } from "./duck/actions";
import { useTranslation } from "react-i18next";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation("userTemplate");

  if (localStorage.getItem("user")) {
    return <Navigate replace to="/user/profile" />;
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const RegisterSchema = yup.object().shape({
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
    <section style={{ backgroundColor: "#eee", paddingTop: 85 }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body px-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mx-1 mx-md-4">
                      {t("login.signUp")}
                    </p>
                    <Formik
                      initialValues={{
                        taiKhoan: "",
                        matKhau: "",
                        hoTen: "",
                        soDT: "",
                        maNhom: "GP09",
                        email: "",
                      }}
                      validationSchema={RegisterSchema}
                      onSubmit={(values) => {
                        dispatch(actRegister(values, navigate, t));
                      }}
                    >
                      {() => (
                        <Form className="mx-1 mx-md-4">
                          <label className="form-label ms-5">
                            {t("profile.name")}
                          </label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                className="form-control"
                                name="hoTen"
                                placeholder={t("signup.nameInput")}
                                style={{ fontSize: 15 }}
                              />
                              <ErrorMessage
                                name="hoTen"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <label className="form-label ms-5">
                            {t("login.acc")}
                          </label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                name="taiKhoan"
                                className="form-control"
                                placeholder={t("login.accInput")}
                                style={{ fontSize: 15 }}
                              />
                              <ErrorMessage
                                name="taiKhoan"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <label className="form-label ms-5">
                            {t("login.pass")}
                          </label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="password"
                                name="matKhau"
                                className="form-control"
                                placeholder={t("login.passInput")}
                                style={{ fontSize: 15 }}
                              />
                              <ErrorMessage
                                name="matKhau"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <label className="form-label ms-5">
                            {t("signup.phoneNumber")}
                          </label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Field
                                type="text"
                                name="soDT"
                                className="form-control"
                                placeholder={t("signup.phoneInput")}
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
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder={t("signup.emailInput")}
                                style={{ fontSize: 15 }}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-3">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheck}
                            />
                            <label className="form-check-label">
                              {t("signup.agree")}{" "}
                              <a href="#!">{t("signup.terms")}</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-warning btn-lg"
                              disabled={!isChecked}
                            >
                              {t("login.signUp")}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>

                    <p
                      className="my-2 pb-lg-2 text-center"
                      style={{ color: "#393f81" }}
                    >
                      {t("signup.alreadyHaveAcc")}{" "}
                      <Link to="/user/login" style={{ color: "#393f81" }}>
                        <span className="text-primary">
                          {t("login.signIn")}
                        </span>
                      </Link>
                      {" - "}
                      <Link to="/" style={{ color: "#393f81" }}>
                        <span className="text-danger">{t("login.home")}</span>
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={imgReg}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
