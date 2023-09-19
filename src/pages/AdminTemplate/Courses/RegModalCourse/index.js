import { Button, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { regCourseByAdmin } from "../../Users/RegModal/duck/regCourseByAdmin/actions";
import { delCourseByAdmin } from "../../Users/RegModal/duck/delCourseByAdmin/actions";

export default function RegModalCourse(props) {
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [userCode, setUserCode] = useState("");

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
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "25%",
    },
    {
      title: "Học viên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "30%",
    },
    {
      title: "Chờ xác nhận",
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
                  title: "Xác nhận",
                  text: "Bạn có chắc chắn ghi danh?",
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: "Hủy bỏ",
                  confirmButtonText: "Đồng ý",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      regCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                      ),
                    );
                  }
                })
              }
            >
              Xác nhận
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: "Xác nhận",
                  text: "Bạn có chắc chắn hủy ghi danh?",
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: "Hủy bỏ",
                  confirmButtonText: "Đồng ý",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                      ),
                    );
                  }
                })
              }
            >
              Hủy bỏ
            </Button>
          </>
        );
      },
    },
  ];

  const columnsConfirmed = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "25%",
    },
    {
      title: "Học viên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "30%",
    },
    {
      title: "Chờ xác nhận",
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
                  title: "Xác nhận",
                  text: "Bạn có chắc chắn hủy ghi danh?",
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: "Hủy bỏ",
                  confirmButtonText: "Đồng ý",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: user.taiKhoan,
                          maKhoaHoc: props.course.maKhoaHoc,
                        },
                        pathname,
                      ),
                    );
                  }
                })
              }
            >
              Hủy ghi danh
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
                <h5 className="text-left my-1 col-3"> Chọn người dùng</h5>

                <form className="form-group mb-2 col-6">
                  <input
                    onChange={(e) => setSearchUser(e.target.value)}
                    value={searchUser}
                    data-bs-toggle="dropdown"
                    placeholder="Nhập hoặc chọn người dùng"
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
                          title: "Xác nhận",
                          text: "Bạn có chắc chắn ghi danh?",
                          showCancelButton: true,
                          showConfirmButton: true,
                          cancelButtonText: "Hủy bỏ",
                          confirmButtonText: "Đồng ý",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(
                              regCourseByAdmin(
                                {
                                  taiKhoan: userCode,
                                  maKhoaHoc: props.course.maKhoaHoc,
                                },
                                pathname,
                              ),
                            );
                            setSearchUser("");
                          }
                        });
                      }}
                    >
                      Ghi danh
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
              <h5>Học viên chờ xác thực</h5>
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
              <h5>Học viên đã tham gia khóa học</h5>
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
