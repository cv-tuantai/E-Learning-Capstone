import React, { useEffect } from "react";
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
// import { actDeleteUser } from "../../../redux/actions/DeleteUserAction";

export default function Users() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listUserReducer);

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

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
      dataIndex: "taiKhoan",
      render: (text, user) => {
        return (
          <>
            <Link
              to={`/admin/edit-user/${user.taiKhoan}`}
              key={1}
              style={{ fontSize: 25 }}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </Link>
            <span
              key={2}
              style={{ cursor: "pointer", fontSize: 25 }}
              className="text-2xl"
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc là muốn xóa người dùng " + user.taiKhoan,
                  )
                ) {
                  // dispatch(actDeleteUser(user.taiKhoan));
                }
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
      <h2 className="text-2xl font-semibold text-center">Quản lý người dùng</h2>
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
