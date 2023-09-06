import React from "react";

export default function CourseItem(props) {
  const { course } = props;

  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch pb-4">
      <div className="course-item">
        <img
          src={course.hinhAnh}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt="img"
        />
        <div className="course-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h4>
            <p className="price">$169</p>
          </div>
          <h3>
            <a href="course-details.html">{course.tenKhoaHoc}</a>
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
