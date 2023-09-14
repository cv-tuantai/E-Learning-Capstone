import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "./duck/action";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addUserSchema = yup.object().shape({
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

  return (
    <div className="container" style={{ padding: "0 15rem" }}>
      <h2 className="text-center">Thêm người dùng</h2>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          soDT: "",
          maNhom: "GP09",
          email: "",
          maLoaiNguoiDung: "HV",
        }}
        validationSchema={addUserSchema}
        onSubmit={(values) => {
          dispatch(addUser(values, navigate));
        }}
      >
        {() => (
          <Form className="mx-1 mx-md-4">
            <label className="form-label ms-5">Tài khoản</label>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw" />
              <div className="form-outline flex-fill mb-0">
                <Field
                  type="text"
                  name="taiKhoan"
                  className="form-control"
                  placeholder="Nhập tài khoản của bạn"
                  style={{ fontSize: 15 }}
                />
                <ErrorMessage
                  name="taiKhoan"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            <label className="form-label ms-5">Mật khẩu</label>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw" />
              <div className="form-outline flex-fill mb-0">
                <Field
                  type="password"
                  name="matKhau"
                  className="form-control"
                  placeholder="Nhập mật khẩu của bạn"
                  style={{ fontSize: 15 }}
                />
                <ErrorMessage
                  name="matKhau"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            <label className="form-label ms-5">Họ tên</label>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw" />
              <div className="form-outline flex-fill mb-0">
                <Field
                  type="text"
                  className="form-control"
                  name="hoTen"
                  placeholder="Nhập tên của bạn"
                  style={{ fontSize: 15 }}
                />
                <ErrorMessage
                  name="hoTen"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            <label className="form-label ms-5">Số điện thoại</label>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <Field
                  type="text"
                  name="soDT"
                  className="form-control"
                  placeholder="Nhập số điện thoại của bạn"
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
                  placeholder="Nhập email của bạn"
                  style={{ fontSize: 15 }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            <label className="form-label ms-5">Loại người dùng</label>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa-solid fa-users fa-lg me-3 fa-fw" />
              <div className="form-outline flex-fill mb-0">
                <Field
                  as="select"
                  name="maLoaiNguoiDung"
                  className="form-control"
                  placeholder="Nhập email của bạn"
                  style={{ fontSize: 15 }}
                >
                  <option value="HV">Học viên</option>
                  <option value="GV">Giảng viên</option>
                </Field>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddUser;
