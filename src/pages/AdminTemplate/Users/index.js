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
import { useTranslation } from "react-i18next";

export default function Users() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listUserReducer);
  const [dataUser, setDataUser] = useState(null);
  const { t } = useTranslation("adminTemplate");

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const handleDataUser = (value) => {
    setDataUser(value);
  };

  if (loading) return <Loader />;

  const columns = [
    {
      title: t("users.acc"),
      dataIndex: "taiKhoan",
      width: "15%",
    },
    {
      title: t("users.type"),
      dataIndex: "maLoaiNguoiDung",
      width: "10%",
    },
    {
      title: t("users.name"),
      dataIndex: "hoTen",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: t("users.phone"),
      dataIndex: "soDt",
      width: "15%",
    },
    {
      title: t("users.action"),
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
                  title: t("courses.confirm"),
                  text: `${t("users.confirmDelUser")} ${user.taiKhoan}`,
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("courses.cancel"),
                  confirmButtonText: t("modal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteUser(user.taiKhoan, t));
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
      <h2 className="text-center">{t("users.userManagement")}</h2>
      <Button
        type="primary"
        danger
        className="my-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => handleDataUser(null)}
      >
        {t("users.addUser")}
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
