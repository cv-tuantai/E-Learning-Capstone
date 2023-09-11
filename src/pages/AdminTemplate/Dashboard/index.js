import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  HomeOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { actLogout } from "../../UserTemplate/Login/duck/actions";
import logoCyber from "../../../assets/images/logoCyber.png";

const { Header, Content, Footer, Sider } = Layout;

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
    <Link to="/admin">Quản lý khóa học</Link>,
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
          //   style={{ paddingTop: 20 }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ textAlign: "right" }}>
          <div className="btn-group">
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
