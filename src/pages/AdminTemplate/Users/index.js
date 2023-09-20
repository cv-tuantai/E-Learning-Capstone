import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { getListUsers } from "./duck/ListUsers/actions";
import { deleteUser } from "./duck/DeleteUser/actions";
import { getCourseWaitConfirm } from "./RegModal/duck/CourseWaitConfirm/actions";
import { getCourseUnReg } from "./RegModal/duck/CoursesUnReg/actions";
import { getCourseConfirm } from "./RegModal/duck/CourseConfirmed/actions";
import UserModal from "./UserModal";
import RegModal from "./RegModal";

export default function Users() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listUserReducer);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

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
            {/* edit user */}
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

            {/* delete user */}
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

            <span
              type="button"
              key={3}
              data-bs-toggle="modal"
              data-bs-target="#regModal"
              style={{ fontSize: 25 }}
              onClick={() => {
                handleDataUser(user);
                dispatch(getCourseUnReg(user.taiKhoan));
                dispatch(getCourseWaitConfirm({ taiKhoan: user.taiKhoan }));
                dispatch(getCourseConfirm({ taiKhoan: user.taiKhoan }));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </span>
          </>
        );
      },
      width: "20%",
    },
  ];

  return (
    <div>
      <h2 className="text-center">Quản lý người dùng</h2>
      <Button
        type="primary"
        danger
        className="my-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => handleDataUser(null)}
      >
        Thêm người dùng
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"taiKhoan"}
        pagination={{ pageSize: 8 }}
      />
      <UserModal dataUser={dataUser} />
      <RegModal user={dataUser} />
    </div>
  );
}
