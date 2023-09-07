import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchCoursesCate } from "./duck/actions";

export default function Header() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.courseCategoryReducer);

  const renderCourseCate = () => {
    return data?.map((cate, index) => {
      return (
        <li key={index}>
          <Link to={`/coursecate/${cate.maDanhMuc}`}>{cate.tenDanhMuc}</Link>
        </li>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchCoursesCate());
  }, []);

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <Link to="/">E-Learning</Link>
        </h1>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown">
              <Link to="/">
                <span>Danh mục</span> <i className="bi bi-chevron-down" />
              </Link>
              <ul>{renderCourseCate()}</ul>
            </li>
            <li>
              <a href="about.html">Khóa học</a>
            </li>
            <li>
              <NavLink to="/info">Thông tin</NavLink>
            </li>
            <li>
              <NavLink to="contact">Liên hệ</NavLink>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>

        <div>
          <a href="courses.html" className="btn">
            Đăng nhập
          </a>
          <a href="courses.html" className="get-started-btn">
            Đăng ký
          </a>
        </div>
      </div>
    </header>
  );
}
