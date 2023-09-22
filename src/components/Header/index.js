import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchCoursesCate } from "./duck/actions";
import { Input } from "antd";
import { actLogout } from "../../pages/UserTemplate/Login/duck/actions";
import { useTranslation } from "react-i18next";
import flagEn from "../../assets/images/united-kingdom.png";
import flagVn from "../../assets/images/vietnam.png";

const { Search } = Input;

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.courseCategoryReducer);

  const [keyword, setKeyword] = useState("");
  const [flag, setFlag] = useState(localStorage.getItem("flag") || flagVn);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchCoursesCate());
  }, []);

  const renderCourseCate = () => {
    return data?.map((cate, index) => {
      return (
        <li key={index}>
          <Link to={`/coursecate/${cate.maDanhMuc}`}>{cate.tenDanhMuc}</Link>
        </li>
      );
    });
  };

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

  const renderSwitchButton = () => {
    return (
      <div className="dropdown">
        <span
          className="dropdown-toggle"
          id="DropdownSwitchLng"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={flag} width={30} alt="..." />
        </span>
        <ul className="dropdown-menu" aria-labelledby="DropdownSwitchLng">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                i18n.changeLanguage("vi");
                setFlag(flagVn);
                localStorage.setItem("flag", flagVn);
                localStorage.setItem("lng", "vi");
              }}
            >
              <img src={flagVn} width={30} alt="..." /> Tiếng Việt
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                i18n.changeLanguage("en");
                setFlag(flagEn);
                localStorage.setItem("flag", flagEn);
                localStorage.setItem("lng", "en");
              }}
            >
              <img src={flagEn} width={30} alt="..." /> English
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const renderLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return (
        <div className="d-flex align-items-center">
          <Link to="/user/login" className="btn">
            {t("header.signIn")}
          </Link>
          <Link to="/user/register" className="get-started-btn me-3">
            {t("header.signUp")}
          </Link>
          {renderSwitchButton()}
        </div>
      );
    } else {
      return (
        <div className="btn-group align-items-center">
          <button
            type="button"
            className="btn btn-success dropdown-toggle me-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user.taiKhoan}
          </button>
          <ul className="dropdown-menu">
            {user.maLoaiNguoiDung === "GV" && (
              <>
                <li>
                  <Link
                    className="dropdown-item"
                    style={{ fontSize: 15 }}
                    to="/admin/courses"
                  >
                    {t("header.goToAdminPage")}
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </>
            )}
            <li>
              <Link
                className="dropdown-item"
                style={{ fontSize: 15 }}
                to="/user/profile"
              >
                {t("header.userInfo")}
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item"
                style={{ fontSize: 15 }}
                onClick={() => dispatch(actLogout(navigate))}
              >
                {t("header.signOut")}
              </button>
            </li>
          </ul>
          {renderSwitchButton()}
        </div>
      );
    }
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <Link to="/">E-Learning</Link>
        </h1>

        <Search
          placeholder={t("header.findCourse")}
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
                <span>{t("header.categories")}</span>{" "}
                <i className="bi bi-chevron-down" />
              </Link>
              <ul>{renderCourseCate()}</ul>
            </li>
            <li>
              <NavLink to="/all-courses">{t("header.courses")}</NavLink>
            </li>
            <li>
              <NavLink to="/info">{t("header.info")}</NavLink>
            </li>
            <li>
              <NavLink to="/contact">{t("header.contact")}</NavLink>
            </li>
          </ul>
          <i
            className="bi bi-list mobile-nav-toggle"
            onClick={handleMobileNavToggle}
          />
        </nav>

        {renderLogin()}
      </div>
    </header>
  );
}
