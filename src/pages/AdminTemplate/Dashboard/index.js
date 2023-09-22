import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  HomeOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { actLogout } from "../../UserTemplate/Login/duck/actions";
import logoCyber from "../../../assets/images/logoCyber.png";
import { fetchListCourses } from "../../HomeTemplate/Home/Courses/duck/actions";
import { getListUsers } from "../Users/duck/ListUsers/actions";
import flagEn from "../../../assets/images/united-kingdom.png";
import flagVn from "../../../assets/images/vietnam.png";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(localStorage.getItem("flag") || flagVn);
  const { t, i18n } = useTranslation("adminTemplate");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert(t("dashboard.needLogin"));
    return <Navigate replace to="/login" />;
  }

  if (user.maLoaiNguoiDung !== "GV") {
    alert(t("dashboard.permission"));
    return <Navigate replace to="/" />;
  }

  const pathname = window.location.pathname;
  const isVisible =
    pathname === "/admin/courses" || pathname === "/admin/users";

  const onSearch = (value) => {
    if (pathname === "/admin/courses") {
      dispatch(fetchListCourses(value));
    } else if (pathname === "/admin/users") {
      dispatch(getListUsers(value));
    }
  };

  const items = [
    getItem(
      <Link to="/admin/courses">{t("dashboard.courseManagement")}</Link>,
      "1",
      <PlayCircleOutlined />,
    ),
    getItem(
      <Link to="/admin/users">{t("dashboard.userManagement")}</Link>,
      "2",
      <PlusCircleOutlined />,
    ),
    getItem(<Link to="/">{t("dashboard.home")}</Link>, "3", <HomeOutlined />),
  ];

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
              style={{ lineHeight: "25px" }}
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
              style={{ lineHeight: "25px" }}
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

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Link
          to="/"
          className="d-flex align-items-center justify-content-center py-2"
        >
          <img src={logoCyber} width={50} alt="Cybersoft Logo" />
          <span className="ms-1" style={{ fontSize: 20 }} hidden={collapsed}>
            E-Learning
          </span>
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{ width: "auto" }}>
        <Header
          className="d-flex align-items-center"
          style={{ backgroundColor: "gainsboro" }}
        >
          {isVisible && (
            <Search
              placeholder={`${
                pathname === "/admin/courses"
                  ? t("dashboard.findCourse")
                  : t("dashboard.findUser")
              }`}
              allowClear
              onSearch={onSearch}
              style={{
                width: "400px",
              }}
            />
          )}
          <div className="btn-group ms-auto me-2">
            <button
              type="button"
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.taiKhoan}
            </button>
            <ul className="dropdown-menu">
              <li style={{ lineHeight: "25px" }}>
                <Link
                  className="dropdown-item"
                  style={{ fontSize: 15 }}
                  to="/user/profile"
                >
                  {t("dashboard.userInfo")}
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li style={{ lineHeight: "25px" }}>
                <button
                  className="dropdown-item"
                  style={{ fontSize: 15 }}
                  onClick={() => dispatch(actLogout(navigate))}
                >
                  {t("dashboard.signOut")}
                </button>
              </li>
            </ul>
          </div>
          {renderSwitchButton()}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">
          E-Learning ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
