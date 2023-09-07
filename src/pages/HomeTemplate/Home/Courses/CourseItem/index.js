import React from "react";
import { Link } from "react-router-dom";

export default function CourseItem(props) {
  const { course } = props;

  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch pb-4">
      <div className="course-item card-container">
        <img
          src={course.hinhAnh}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://canhme.com/wp-content/uploads/2018/09/Nodejs.png";
          }}
          alt="img"
        />
        <div className="course-content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h4>
            <p className="price">$169</p>
          </div>
          <h3>
            <Link to={`/detail-course/${course.maKhoaHoc}`}>
              {course.tenKhoaHoc}
            </Link>
          </h3>
          <p>
            {course.moTa.length > 150
              ? `${course.moTa.slice(0, 150)}...`
              : course.moTa}
          </p>
          <div className="trainer d-flex justify-content-between align-items-center">
            <div className="trainer-profile d-flex align-items-center">
              <span>{course.nguoiTao.hoTen}</span>
            </div>
            <div className="trainer-rank d-flex align-items-center">
              <i className="bi bi-person-circle"></i>
              &nbsp;{course.soLuongHocVien} &nbsp;&nbsp;
              <i className="bi bi-eye"></i>
              &nbsp;{course.luotXem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
