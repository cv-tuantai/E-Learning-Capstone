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
import { fetchListCourses } from "../../HomeTemplate/Home/Courses/duck/actions";
// import { actDeleteFilm } from "../../../redux/actions/DeleteFilmAction";

export default function Courses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);

  useEffect(() => {
    dispatch(fetchListCourses());
  }, []);

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
      dataIndex: "maKhoaHoc",
      render: (text, course) => {
        return (
          <>
            <Link
              to={`/admin/edit-film/${course.maPhim}`}
              key={1}
              style={{ fontSize: 25 }}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </Link>
            <span
              key={2}
              style={{ cursor: "pointer", margin: "0 10px", fontSize: 25 }}
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc là muốn xóa phim " + course.tenPhim,
                  )
                ) {
                  //   dispatch(actDeleteFilm(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
            <Link
              to={`/admin/showtime/${course.maPhim}`}
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
      <h2 className="text-center">Quản lý khóa học</h2>
      <Link to="/admin/add-course">
        <Button type="primary" danger className="my-3">
          Thêm khóa học
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"maKhoaHoc"}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
