import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchCoursesCate } from "./duck/actions";
import { Input } from "antd";

const { Search } = Input;

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.courseCategoryReducer);

  const [keyword, setKeyword] = useState("");

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

  const onSearch = (keyword) => {
    if (keyword) {
      navigate(`/seach/${keyword}`, { replace: true });
      setKeyword("");
    }
  };

  const handleMobileNavToggle = () => {
    const navbar = document.querySelector("#navbar");
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    navbar.classList.toggle("navbar-mobile");
    mobileNavToggle.classList.toggle("bi-list");
    mobileNavToggle.classList.toggle("bi-x");
  };

  const handleDropdownClick = (e) => {
    const navbar = document.querySelector("#navbar");
    const dropdown = e.currentTarget.nextElementSibling;
    if (navbar.classList.contains("navbar-mobile")) {
      e.preventDefault();
      dropdown.classList.toggle("dropdown-active");
    }
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container-fluid container-lg d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <Link to="/">E-Learning</Link>
        </h1>

        <Search
          placeholder="Tìm khóa học"
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={onSearch}
          value={keyword}
          style={{
            width: 200,
          }}
        />

        <nav id="navbar" className="navbar order-last order-xl-0">
          <ul>
            <li className="dropdown">
              <Link to="/" onClick={handleDropdownClick}>
                <span>Danh mục</span> <i className="bi bi-chevron-down" />
              </Link>
              <ul>{renderCourseCate()}</ul>
            </li>
            <li>
              <NavLink to="all-courses">Khóa học</NavLink>
            </li>
            <li>
              <NavLink to="/info">Thông tin</NavLink>
            </li>
            <li>
              <NavLink to="contact">Liên hệ</NavLink>
            </li>
          </ul>
          <i
            className="bi bi-list mobile-nav-toggle"
            onClick={handleMobileNavToggle}
          />
        </nav>

        <div>
          <Link to="/login" className="btn">
            Đăng nhập
          </Link>
          <Link to="/register" className="get-started-btn">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
