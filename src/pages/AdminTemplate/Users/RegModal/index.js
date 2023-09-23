import { Button, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regCourseByAdmin } from "./duck/regCourseByAdmin/actions";
import { delCourseByAdmin } from "./duck/delCourseByAdmin/actions";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function RegModal(props) {
  const dispatch = useDispatch();
  const [searchCourse, setSearchCourse] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const { t } = useTranslation("adminTemplate");

  const unRegisteredCourse = useSelector(
    (state) => state.courseUnRegReducer.data,
  );

  const courseWaitConfirm = useSelector(
    (state) => state.courseWaitConfirmReducer.data,
  );

  const courseConfirmed = useSelector(
    (state) => state.courseConfirmReducer.data,
  );

  const renderListUnregisteredCourse = (unRegisteredCourse) => {
    if (!unRegisteredCourse) return null;

    const filteredItems = unRegisteredCourse.filter((item) => {
      const searchTerm = searchCourse.trim().toLowerCase();
      const courseName = item.tenKhoaHoc.trim().toLowerCase();
      return searchTerm === "" || courseName.includes(searchTerm);
    });

    return filteredItems.map((item, index) => (
      <li
        key={index}
        onClick={() => {
          setCourseCode(item.maKhoaHoc);
          setSearchCourse(item.tenKhoaHoc);
        }}
        className="dropdown-item"
      >
        {item.tenKhoaHoc}
      </li>
    ));
  };

  const pathname = window.location.pathname;

  const columns = [
    {
      title: t("userModal.stt"),
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: t("userModal.courseName"),
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      width: "55%",
    },
    {
      title: t("userModal.waitConfirm"),
      width: "35%",
      render: (text, course) => {
        return (
          <>
            <Button
              className="me-2"
              type="primary"
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("userModal.confirm"),
                  text: t("userModal.regConfirm"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("userModal.cancel"),
                  confirmButtonText: t("userModal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      regCourseByAdmin(
                        {
                          taiKhoan: props.user.taiKhoan,
                          maKhoaHoc: course.maKhoaHoc,
                        },
                        pathname,
                        t,
                      ),
                    );
                  }
                })
              }
            >
              {t("userModal.confirm")}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("userModal.confirm"),
                  text: t("userModal.cancelConfirm"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("userModal.cancel"),
                  confirmButtonText: t("userModal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: props.user.taiKhoan,
                          maKhoaHoc: course.maKhoaHoc,
                        },
                        pathname,
                        t,
                      ),
                    );
                  }
                })
              }
            >
              {t("userModal.cancel")}
            </Button>
          </>
        );
      },
    },
  ];

  const columnsConfirmed = [
    {
      title: t("userModal.stt"),
      key: "index",
      render: (text, record, index) => index + 1,
      width: "15%",
    },
    {
      title: t("userModal.courseName"),
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      width: "55%",
    },
    {
      title: t("userModal.waitConfirm"),
      width: "35%",
      render: (text, course) => {
        return (
          <>
            <Button
              type="primary"
              danger
              onClick={() =>
                Swal.fire({
                  icon: "question",
                  title: t("userModal.confirm"),
                  text: t("userModal.cancelConfirm"),
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: t("userModal.cancel"),
                  confirmButtonText: t("userModal.agree"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      delCourseByAdmin(
                        {
                          taiKhoan: props.user.taiKhoan,
                          maKhoaHoc: course.maKhoaHoc,
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
      id="regModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticRegModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <div className="row">
                <h5 className="text-left my-1 col-3">
                  {" "}
                  {t("userModal.selectCourse")}
                </h5>

                <form className="form-group mb-2 col-6">
                  <input
                    onChange={(e) => setSearchCourse(e.target.value)}
                    value={searchCourse}
                    data-bs-toggle="dropdown"
                    placeholder={t("userModal.selectCoursePlaceholder")}
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
                    {renderListUnregisteredCourse(unRegisteredCourse)}
                  </ul>
                </form>

                <div className="col-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-success me-1"
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: t("userModal.confirm"),
                          text: t("userModal.regConfirm"),
                          showCancelButton: true,
                          showConfirmButton: true,
                          cancelButtonText: t("userModal.cancel"),
                          confirmButtonText: t("userModal.agree"),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(
                              regCourseByAdmin(
                                {
                                  taiKhoan: props.user.taiKhoan,
                                  maKhoaHoc: courseCode,
                                },
                                pathname,
                                t,
                              ),
                            );
                            setSearchCourse("");
                          }
                        });
                      }}
                    >
                      {t("userModal.reg")}
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
              <h5>{t("userModal.courseWaitConfirm")}</h5>
              <Table
                dataSource={courseWaitConfirm}
                columns={columns}
                rowKey="tenKhoaHoc"
                bordered
                pagination={{ pageSize: 3 }}
              />
            </div>
          </div>
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <h5>{t("userModal.enrolledCourse")}</h5>
              <Table
                dataSource={courseConfirmed}
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
