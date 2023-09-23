import { Button, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { regCourseByAdmin } from "../../Users/RegModal/duck/regCourseByAdmin/actions";
import { delCourseByAdmin } from "../../Users/RegModal/duck/delCourseByAdmin/actions";
import { useTranslation } from "react-i18next";

export default function RegModalCourse(props) {
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [userCode, setUserCode] = useState("");

  const { t } = useTranslation("adminTemplate");

  const unregisteredUsers = useSelector(
    (state) => state.usersUnregReducer.data,
  );

  const usersWaitConfirm = useSelector(
    (state) => state.usersWaitConfirmReducer.data,
  );

  const usersConfirmed = useSelector((state) => state.usersConfirmReducer.data);

  const renderListUnregisteredUsers = (unregisteredUsers) => {
    if (!unregisteredUsers) return null;

    const filteredItems = unregisteredUsers.filter((user) => {
      const searchTerm = searchUser.trim().toLowerCase();
      const userName = user.hoTen.trim().toLowerCase();
      return searchTerm === "" || userName.includes(searchTerm);
    });

    return filteredItems.map((user, index) => (
      <li
        key={index}
        onClick={() => {
          setUserCode(user.taiKhoan);
          setSearchUser(user.hoTen);
        }}
        className="dropdown-item"
      >
        {user.hoTen}
      </li>
    ));
  };

  const pathname = window.location.pathname;

  const columns = [
    {
      title: t("modal.stt"),
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: t("modal.accName"),
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "25%",
    },
    {
      title: t("modal.student"),
      dataIndex: "hoTen",
      key: "hoTen",
      width: "30%",
    },
    {
      title: t("modal.confirm"),
      width: "35%",
      render: (text, user) => {
        return (
          <>
            <Button
              className="me-2"
              type="primary"
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("courses.confirm"),
                  text: t("modal.confirmReg"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("courses.cancel"),
                  confirmButtonText: t("modal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      regCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                        t,
                      ),
                    );
                  }
                })
              }
            >
              {t("courses.confirm")}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("courses.confirm"),
                  text: t("modal.confirmCancelReg"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("courses.cancel"),
                  confirmButtonText: t("modal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                        t,
                      ),
                    );
                  }
                })
              }
            >
              {t("courses.cancel")}
            </Button>
          </>
        );
      },
    },
  ];

  const columnsConfirmed = [
    {
      title: t("modal.stt"),
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: t("modal.accName"),
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "25%",
    },
    {
      title: t("modal.student"),
      dataIndex: "hoTen",
      key: "hoTen",
      width: "30%",
    },
    {
      title: t("modal.confirm"),
      width: "35%",
      render: (text, user) => {
        return (
          <>
            <Button
              type="primary"
              danger
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("courses.confirm"),
                  text: t("modal.confirmCancelReg"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("courses.cancel"),
                  confirmButtonText: t("modal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                        t,
                      ),
                    );
                  }
                })
              }
            >
              {t("modal.cancelReg")}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div
      className="modal fade"
      id="regModalCourse"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticRegModalCourse"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <div className="row">
                <h5 className="text-left my-1 col-3">
                  {" "}
                  {t("modal.selectUser")}
                </h5>

                <form className="form-group mb-2 col-6">
                  <input
                    onChange={(e) => setSearchUser(e.target.value)}
                    value={searchUser}
                    data-bs-toggle="dropdown"
                    placeholder={t("modal.selectUserPlaceholder")}
                    type="text"
                    className="form-control dropdown-toggle"
                  />

                  <ul
                    className="dropdown-menu"
                    style={{
                      width: "50vh",
                      height: "50vh",
                      overflowY: "scroll",
                    }}
                  >
                    {renderListUnregisteredUsers(unregisteredUsers)}
                  </ul>
                </form>

                <div className="col-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-success me-1"
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: t("courses.confirm"),
                          text: t("modal.confirmReg"),
                          showCancelButton: true,
                          showConfirmButton: true,
                          cancelButtonText: t("courses.cancel"),
                          confirmButtonText: t("modal.agree"),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(
                              regCourseByAdmin(
                                {
                                  taiKhoan: userCode,
                                  maKhoaHoc: props.course.maKhoaHoc,
                                },
                                pathname,
                                t,
                              ),
                            );
                            setSearchUser("");
                          }
                        });
                      }}
                    >
                      {t("modal.register")}
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <h5>{t("modal.studentWaitConfirm")}</h5>
              <Table
                dataSource={usersWaitConfirm}
                columns={columns}
                rowKey="tenKhoaHoc"
                bordered
                pagination={{ pageSize: 3 }}
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <h5>{t("modal.studentJoinCourse")}</h5>
              <Table
                dataSource={usersConfirmed}
                columns={columnsConfirmed}
                rowKey="tenKhoaHoc"
                bordered
                pagination={{ pageSize: 3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
