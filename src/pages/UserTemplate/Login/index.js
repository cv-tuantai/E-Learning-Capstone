import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import imgLogin from "../../../assets/images/login.jpeg";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { actLogin } from "./duck/actions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSchema = yup.object().shape({
    taiKhoan: yup.string().required("* Tài khoản không được bỏ trống!"),
    matKhau: yup.string().required("* Mật khẩu không được bỏ trống!"),
  });

  if (localStorage.getItem("user")) {
    return <Navigate replace to="/user/profile" />;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imgLogin}
                    alt="login form"
                    className="img-fluid"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Formik
                      initialValues={{
                        taiKhoan: "",
                        matKhau: "",
                      }}
                      validationSchema={LoginSchema}
                      onSubmit={(values) => {
                        dispatch(actLogin(values, navigate));
                      }}
                    >
                      {() => (
                        <Form>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <span className="h1 fw-bold mb-0">E-Learning</span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Đăng nhập vào tài khoản của bạn
                          </h5>
                          <div className="form-outline mb-4">
                            <label className="form-label">Tài khoản</label>
                            <Field
                              type="text"
                              name="taiKhoan"
                              className="form-control form-control-lg"
                              style={{ fontSize: 15 }}
                              placeholder="Nhập tài khoản của bạn"
                            />
                            <ErrorMessage
                              component="div"
                              name="taiKhoan"
                              style={{ color: "red" }}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label">Mật khẩu</label>
                            <Field
                              type="password"
                              name="matKhau"
                              className="form-control form-control-lg"
                              style={{ fontSize: 15 }}
                              placeholder="Nhập mật khẩu của bạn"
                            />
                            <ErrorMessage
                              component="div"
                              name="matKhau"
                              style={{ color: "red" }}
                            />
                          </div>
                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg"
                              style={{ width: "100%" }}
                              type="submit"
                            >
                              Đăng nhập
                            </button>
                          </div>
                          <div className="text-center">
                            <a className="small text-muted" href="#!">
                              Quên mật khẩu?
                            </a>
                          </div>
                          <p
                            className="my-4 pb-lg-2 text-center"
                            style={{ color: "#393f81" }}
                          >
                            Chưa có tài khoản?{" "}
                            <Link
                              to="/user/register"
                              style={{ color: "#393f81" }}
                            >
                              <span className="text-danger">Đăng ký</span>
                            </Link>
                            {" - "}
                            <Link to="/">Trang chủ</Link>
                          </p>
                        </Form>
                      )}
                    </Formik>
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
