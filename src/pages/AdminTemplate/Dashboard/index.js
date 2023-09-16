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

const items = [
  getItem(
    <Link to="/admin/courses">Quản lý khóa học</Link>,
    "1",
    <PlayCircleOutlined />,
  ),
  getItem(
    <Link to="/admin/users">Quản lý người dùng</Link>,
    "2",
    <PlusCircleOutlined />,
  ),
  getItem(<Link to="/">Về trang chủ</Link>, "3", <HomeOutlined />),
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Bạn cần phải đăng nhập trước.");
    return <Navigate replace to="/login" />;
  }

  if (user.maLoaiNguoiDung !== "GV") {
    alert('Bạn không có quyền "Quản Trị" để truy cập trang này.');
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
              placeholder={`Nhập tên ${
                pathname === "/admin/courses" ? "khóa học" : "người dùng"
              } để tìm kiếm`}
              allowClear
              onSearch={onSearch}
              style={{
                width: "400px",
              }}
            />
          )}
          <div className="btn-group ms-auto">
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
                  Thông tin tài khoản
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
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
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
