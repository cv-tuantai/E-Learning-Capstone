import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "./duck/actions";
import { useParams } from "react-router-dom";
import img1 from "../../../assets/images/hero-flex.png";
import img2 from "../../../assets/images/olstudy.png";
import img3 from "../../../assets/images/education-hero.png";

export default function DetailCourse() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.detailCourseReducer);
  const { maKhoaHoc } = useParams();

  useEffect(() => {
    dispatch(getDetailCourse(maKhoaHoc));
  }, []);

  return (
    <>
      <section id="course-details" className="course-details mt-5">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-8">
              <img
                src={data?.hinhAnh}
                width="100%"
                alt="..."
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://canhme.com/wp-content/uploads/2018/09/Nodejs.png";
                }}
              />
              <h3>{data?.tenKhoaHoc}</h3>
              <p>{data?.moTa}</p>
            </div>
            <div className="col-lg-4">
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>Tên khóa học</h5>
                <p>{data?.tenKhoaHoc}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>Lĩnh vực</h5>
                <p>{data?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>Giảng viên</h5>
                <p>{data?.nguoiTao.hoTen}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>Giá</h5>
                <p>$169</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>Số học viên</h5>
                <p>{data?.soLuongHocVien}</p>
              </div>
              <div className="text-center">
                <button className="btn btn-success" style={{ width: "200px" }}>
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cource-details-tabs" className="cource-details-tabs">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link active show"
                    data-bs-toggle="tab"
                    href="#tab-1"
                  >
                    Chương 1: Giới thiệu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                    Chương 2: Kiến thức căn bản
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                    Chương 3: Kiến thức chuyên sâu
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>Các khái niệm về React Component</li>
                        <li>Thiết lập môi trường cho Windows</li>
                        <li>Tạo ứng dụng React - React-Scripts</li>
                        <li>
                          Ghi chú nhanh về dấu ngoặc kép cho string
                          interpolation
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img1} alt="..." height={200} />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-2">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>Trang chủ và thành phần thư mục</li>
                        <li>Hướng dẫn khóa học + Liên kết Github</li>
                        <li>Trang chủ thương mại điện tử + thiết lập SASS</li>
                        <li>Tệp CSS và SCSS</li>
                        <li>
                          React 17: Cập nhật các gói + Phiên bản React mới nhất
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img2} alt="..." height={200} />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-3">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>connect() and mapStateToProps</li>
                        <li>Trạng thái thư mục vào Redux</li>
                        <li>Thành phần Tổng quan về Bộ sưu tập</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img3} alt="..." height={200} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
