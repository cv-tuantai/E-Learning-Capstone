import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <Link to="/">E-Learning</Link>
        </h1>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown">
              <a href="#">
                <span>Danh mục</span> <i className="bi bi-chevron-down" />
              </a>
              <ul>
                <li>
                  <a href="#">Lập trình Frontend</a>
                </li>
                <li>
                  <a href="#">Lập trình Backend</a>
                </li>
                <li>
                  <a href="#">Lập trình Fullstack</a>
                </li>
                <li>
                  <a href="#">Thiết kế web</a>
                </li>
                <li>
                  <a href="#">Lập trình di động</a>
                </li>
                <li>
                  <a href="#">Tư duy lập trình</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/">Trang chủ</NavLink>
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
