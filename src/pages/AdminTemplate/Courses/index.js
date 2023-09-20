import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "@fortawesome/fontawesome-free/css/all.css";
import { fetchListCourses } from "../../HomeTemplate/Home/Courses/duck/actions";
import { fetchCoursesCate } from "../../../components/Header/duck/actions";
import Swal from "sweetalert2";
import { deleteCourse } from "./duck/DeleteCourse/action";
import { getListUsers } from "../Users/duck/ListUsers/actions";
import RegModalCourse from "./RegModalCourse";
import { getUsersUnreg } from "./RegModalCourse/duck/UsersUnreg/actions";
import { getUsersWaitConfirm } from "./RegModalCourse/duck/UsersWaitConfirm/actions";
import { getUsersConfirmed } from "./RegModalCourse/duck/UsersConfirmed/actions";
import CourseModal from "./CourseModal";

export default function Courses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);

  const [dataCourse, setDataCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchListCourses());
    dispatch(fetchCoursesCate());
    dispatch(getListUsers());
  }, []);

  const handleDataCourse = (data) => {
    setDataCourse(data);
  };

  if (loading) return <Loader />;

  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      sorter: (a, b) => a.maKhoaHoc - b.maKhoaHoc,
      sortDirections: ["descend"],
      width: "15%",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      width: "20%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, img) => (
        <img src={img.hinhAnh} alt={img.maPhim} width={200} />
      ),
      width: "20%",
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      width: "10%",
    },
    {
      title: "Người tạo",
      dataIndex: ["nguoiTao", "hoTen"],
      width: "15%",
    },
    {
      title: "Tác vụ",
      render: (text, course) => {
        return (
          <>
            {/* edit course */}
            <span
              type="button"
              key={1}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ fontSize: 25 }}
              onClick={() => {
                handleDataCourse(course);
              }}
            >
              <EditOutlined style={{ color: "blue" }} />
            </span>

            {/* delete course */}
            <span
              key={2}
              style={{ cursor: "pointer", fontSize: 25, margin: "0 10px" }}
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  title: "Xác nhận",
                  text: `Bạn có chắc chắn xóa khóa học ${course.tenKhoaHoc}`,
                  showCancelButton: true,
                  showConfirmButton: true,
                  cancelButtonText: "Hủy bỏ",
                  confirmButtonText: "Xác nhận",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteCourse(course.maKhoaHoc));
                  }
                });
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>

            {/* register */}
            <span
              type="button"
              key={3}
              data-bs-toggle="modal"
              data-bs-target="#regModalCourse"
              style={{ fontSize: 25 }}
              onClick={() => {
                handleDataCourse(course);
                dispatch(getUsersUnreg({ maKhoaHoc: course.maKhoaHoc }));
                dispatch(getUsersWaitConfirm({ maKhoaHoc: course.maKhoaHoc }));
                dispatch(getUsersConfirmed({ maKhoaHoc: course.maKhoaHoc }));
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
      <h2 className="text-center">Quản lý khóa học</h2>
      <Button
        type="primary"
        danger
        className="my-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => {
          handleDataCourse(null);
        }}
      >
        Thêm khóa học
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"maKhoaHoc"}
        pagination={{ pageSize: 5 }}
      />
      <CourseModal dataCourse={dataCourse} />
      <RegModalCourse course={dataCourse} />
    </div>
  );
}
