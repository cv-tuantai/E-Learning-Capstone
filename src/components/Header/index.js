import React from "react";

export default function Header() {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <a href="index.html">E-Learning</a>
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
              <a href="about.html">Khóa học</a>
            </li>
            <li>
              <a href="courses.html">Blog</a>
            </li>
            <li>
              <a href="trainers.html">Thông tin</a>
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
