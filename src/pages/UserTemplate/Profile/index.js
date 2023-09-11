import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { actTryLogout } from "../Login/duck/actions";
import { getUserDetail } from "./duck/UserDetail/actions";
import { updateUser } from "./duck/UpdateUser/actions";
import avatar from "../../../assets/images/avatar.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Rate } from "antd";
import { cancelCourse } from "./duck/CancelCourse/actions";
import { Input } from "antd";

const { Search } = Input;

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.userReducer);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(actTryLogout(navigate));
  }, []);

  useEffect(() => {
    dispatch(getUserDetail());
  }, []);

  if (!localStorage.getItem("user")) {
    return <Navigate replace to="/user/login" />;
  }

  const validationSchema = yup.object().shape({
    taiKhoan: yup
      .string()
      .min(2, "* Tài khoản quá ngắn")
      .max(20, "* Tài khoản không quá 20 ký tự")
      .required("* Tài khoản không được bỏ trống!"),
    matKhau: yup
      .string()
      .required("* Mật khẩu không được bỏ trống!")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "* Mật khẩu phải ít nhất 8 tự gồm chữ, số, và kí tự đặc biệt.",
      ),
    hoTen: yup
      .string()
      .required("* Họ tên không được bỏ trống!")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
        "* Chỉ nhập kí tự chữ.",
      ),
    soDT: yup
      .string()
      .required("* Số điện thoại không được bỏ trống!")
      .matches(
        /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        "* Số điện thoại chưa đúng định đạng.",
      ),
    email: yup
      .string()
      .required("* Email không được bỏ trống!")
      .email("* Email không đúng định dạng."),
  });

  const renderCourses = () => {
    const filteredCourse = data?.chiTietKhoaHocGhiDanh.filter((course) =>
      course.tenKhoaHoc.toLowerCase().includes(keyword?.toLowerCase()),
    );

    return filteredCourse?.map((course, index) => {
      return (
        <div key={index} className="card mb-3" style={{ border: "none" }}>
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={course.hinhAnh}
                width="100%"
                height="200px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h4 className="card-title">{course.tenKhoaHoc}</h4>
                <p className="card-text">
                  {course.moTa.length > 200
                    ? `${course.moTa.slice(0, 200)}...`
                    : course.moTa}
                </p>
                <Rate allowHalf value={course.danhGia / 2} />
              </div>
            </div>
            <div className="col-md-2 d-flex align-items-center">
              <button
                className="btn btn-danger"
                onClick={() => {
                  Swal.fire({
                    icon: "question",
                    title: "Xác nhận",
                    text: "Bạn có chắc chắn muốn hủy đăng ký",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy bỏ",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(
                        cancelCourse({
                          maKhoaHoc: course.maKhoaHoc,
                          taiKhoan: data.taiKhoan,
                        }),
                      );
                    }
                  });
                }}
              >
                Hủy đăng ký
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleSearchCourse = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="container py-4">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={avatar}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width={110}
                  />
                  <div className="mt-3">
                    <h4>{data?.hoTen}</h4>
                    <p className="text-secondary mb-1">
                      {data?.maLoaiNguoiDung === "HV"
                        ? "Học viên"
                        : "Giảng viên"}
                    </p>
                  </div>
                  <div className="d-flex">
                    <Link to="/">
                      <button className="btn btn-warning mt-3">
                        Quay lại trang chủ
                      </button>
                    </Link>
                    {data?.maLoaiNguoiDung === "GV" && (
                      <Link to="/admin">
                        <button className="btn btn-info mt-3 ms-1">
                          Vào trang quản trị
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github me-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Github
                    </h6>
                    <a href="#!" className="text-secondary">
                      {data?.taiKhoan}
                    </a>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter me-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                      Twitter
                    </h6>
                    <a href="#!" className="text-secondary">
                      {data?.taiKhoan}
                    </a>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram me-2 icon-inline text-danger"
                      >
                        <rect
                          x={2}
                          y={2}
                          width={20}
                          height={20}
                          rx={5}
                          ry={5}
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </h6>
                    <a href="#!" className="text-secondary">
                      {data?.taiKhoan}
                    </a>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook me-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </h6>
                    <a href="#!" className="text-secondary">
                      {data?.taiKhoan}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    hoTen: data?.hoTen || "",
                    taiKhoan: data?.taiKhoan || "",
                    matKhau: data?.matKhau || "",
                    soDT: data?.soDT || "",
                    email: data?.email || "",
                    maLoaiNguoiDung: data?.maLoaiNguoiDung || "",
                    maNhom: data?.maNhom || "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    Swal.fire({
                      icon: "question",
                      title: "Xác nhận",
                      text: "Bạn chắc chắn cập nhật thông tin?",
                      showConfirmButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Đồng ý",
                      cancelButtonText: "Hủy bỏ",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(updateUser(values));
                      }
                    });
                  }}
                >
                  {() => (
                    <Form>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Họ tên</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Field
                            type="text"
                            name="hoTen"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="hoTen"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Tài khoản</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Field
                            type="text"
                            name="taiKhoan"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="taiKhoan"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Mật khẩu</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Field
                            type="password"
                            name="matKhau"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="matKhau"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Số điện thoại</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Field
                            type="text"
                            name="soDT"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="soDT"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <Field
                            type="text"
                            name="email"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3" />
                        <div className="col-sm-9 text-secondary">
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Lưu thay đổi
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="ex1-tab-1"
                          data-bs-toggle="tab"
                          href="#ex1-tabs-1"
                          role="tab"
                          aria-controls="ex1-tabs-1"
                          aria-selected="true"
                        >
                          Khóa học
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="ex1-tab-2"
                          data-bs-toggle="tab"
                          href="#ex1-tabs-2"
                          role="tab"
                          aria-controls="ex1-tabs-2"
                          aria-selected="false"
                        >
                          Kỹ năng
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="ex1-content">
                      <div
                        className="tab-pane fade show active"
                        id="ex1-tabs-1"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-1"
                      >
                        <div
                          style={{ textAlign: "right", paddingBottom: "15px" }}
                        >
                          <Search
                            placeholder="Tìm khóa học"
                            onChange={handleSearchCourse}
                            className="text-right"
                            style={{
                              width: 200,
                            }}
                          />
                        </div>
                        {renderCourses()}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="ex1-tabs-2"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-2"
                      >
                        <p>HTML</p>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p>CSS</p>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{ width: "72%" }}
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p>JS</p>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "89%" }}
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p>ReactJS</p>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "55%" }}
                            aria-valuenow={55}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p>NodeJS</p>
                        <div className="progress" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "66%" }}
                            aria-valuenow={66}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
