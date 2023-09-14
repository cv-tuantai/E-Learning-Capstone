import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getListUsers } from "./duck/ListUsers/actions";
import { deleteUser } from "./duck/DeleteUser/actions";
import Swal from "sweetalert2";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "@fortawesome/fontawesome-free/css/all.css";
import * as yup from "yup";
import { updateUser } from "../../UserTemplate/Profile/duck/UpdateUser/actions";

export default function Users() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listUserReducer);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const editUserSchema = yup.object().shape({
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

  const handleDataUser = (value) => {
    setDataUser(value);
  };

  if (loading) return <Loader />;

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "15%",
    },
    {
      title: "Loại",
      dataIndex: "maLoaiNguoiDung",
      width: "10%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      width: "15%",
    },
    {
      title: "Tác vụ",

      render: (text, user) => {
        return (
          <>
            <span
              type="button"
              key={1}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ fontSize: 25 }}
              onClick={() => handleDataUser(user)}
            >
              <EditOutlined style={{ color: "blue" }} />
            </span>
            {/* Modal */}
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
                      Cập nhật người dùng
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => dispatch(getListUsers())}
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
                        maLoaiNguoiDung: dataUser?.maLoaiNguoiDung || "",
                      }}
                      validationSchema={editUserSchema}
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
                                disabled
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
                                placeholder="Nhập lại mật khẩu"
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
                          <label className="form-label ms-5">
                            Số điện thoại
                          </label>
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
                          <label className="form-label ms-5">
                            Loại người dùng
                          </label>
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
                                <option value="GV">Giáo vụ</option>
                              </Field>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="submit" className="btn btn-success">
                              Cập nhật
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>

            <span
              key={2}
              style={{ cursor: "pointer", fontSize: 25, margin: "0 10px" }}
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  title: "Xác nhận",
                  text: `Bạn có chắc chắn xóa người dùng ${user.taiKhoan}`,
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: "Hủy bỏ",
                  confirmButtonText: "Xác nhận",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteUser(user.taiKhoan));
                  }
                });
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
            <Link
              to={`/admin/showtime/${user.maPhim}`}
              key={3}
              style={{ fontSize: 25 }}
            >
              <CalendarOutlined style={{ color: "green" }} />{" "}
            </Link>
          </>
        );
      },
      width: "20%",
    },
  ];

  return (
    <div>
      <h2 className="text-center">Quản lý người dùng</h2>
      <Link to="/admin/add-user">
        <Button type="primary" danger className="my-3">
          Thêm người dùng
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"taiKhoan"}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
