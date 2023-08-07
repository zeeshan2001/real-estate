import React, { useEffect, useState } from "react";
import { Button, Divider, Dropdown, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/logo.svg";
import DashboardIcon from "../../assets/icons/ico-dash.svg";
import DashboardIconActive from "../../assets/icons/ico-dash-active.svg";
import MastersheetIcon from "../../assets/icons/ico-sheet.svg";
import MastersheetIconActive from "../../assets/icons/ico-sheet-active.svg";
import IntakeFormIcon from "../../assets/icons/ico-form.svg";
import IntakeFormIconActive from "../../assets/icons/ico-form-active.svg";
import "./Header.css";
import { UserOutlined } from "@ant-design/icons";
import { logoutUser } from "../../redux/actions/authActions";
import { openNotification } from "../../utils/ui";

const Header = () => {
  const { user, newUser } = useSelector((state) => state.auth);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const route = currentPath.substring(1);
    setActiveMenu(route);
  }, [window.location.pathname]);

  const handleAddUser = () => {
    navigate("/users");
  };

  useEffect(() => {
    if (newUser) {
      openNotification("success", "User added successfully!");
    }
  }, [newUser]);

  let items = [];

  if (user?.role === "admin") {
    items = [
      {
        label: <span onClick={handleAddUser}>Manage Users</span>,
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: <span onClick={handleLogout}>Logout</span>,
        key: "1",
      },
    ];
  } else {
    items = [
      {
        label: <span onClick={handleLogout}>Logout</span>,
        key: "0",
      },
    ];
  }

  return (
    <header className="header">
      <Row align="middle" justify="space-between">
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <div className="header-left">
            <img src={logo} alt="Logo" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="header-center">
            <nav className="menu">
              <Link
                to="/dashboard"
                className={`menu-item ${
                  activeMenu === "dashboard" ? "active" : ""
                }`}
              >
                <button
                  className={`${
                    activeMenu === "dashboard"
                      ? "active-button-prefix"
                      : "button-prefix"
                  }`}
                  onClick={() => setActiveMenu("dashboard")}
                >
                  <img
                    src={`${
                      activeMenu === "dashboard"
                        ? DashboardIconActive
                        : DashboardIcon
                    }`}
                    alt="Dashboard"
                  />
                  <span>Dashboard</span>
                </button>
              </Link>
              <Link
                to="/mastersheet"
                className={`menu-item ${
                  activeMenu === "mastersheet" ? "active" : ""
                }`}
              >
                <button
                  className={`${
                    activeMenu === "mastersheet"
                      ? "active-button-prefix"
                      : "button-prefix"
                  }`}
                  onClick={() => setActiveMenu("mastersheet")}
                >
                  <img
                    src={`${
                      activeMenu === "mastersheet"
                        ? MastersheetIconActive
                        : MastersheetIcon
                    }`}
                    alt="Mastersheet"
                  />
                  <span>Master Sheet</span>
                </button>
              </Link>
              <Link
                to="/intake-form"
                className={`menu-item ${
                  activeMenu === "intake-form" ? "active" : ""
                }`}
              >
                <button
                  className={`${
                    activeMenu === "intake-form"
                      ? "active-button-prefix"
                      : "button-prefix"
                  }`}
                  onClick={() => setActiveMenu("intake-form")}
                >
                  <img
                    src={`${
                      activeMenu === "intake-form"
                        ? IntakeFormIconActive
                        : IntakeFormIcon
                    }`}
                    alt="Create New"
                  />
                  <span>Create New</span>
                </button>
              </Link>
            </nav>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <div className="header-right">
            <div className="user">
              <span className="role">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <Divider type="vertical" />
              <Dropdown menu={{ items }}>
                <Button>
                  <UserOutlined /> {user.username}
                </Button>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
