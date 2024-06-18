import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Space, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import changeTheme from "./changeTheme";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";
import RegisterModal from "./Modals/RegisterModal";
import AuthModal from "./Modals/AuthModal";

interface NavBarProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
}

export default function NavBar({ setIsLoggedIn, isLoggedIn }: NavBarProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userfull");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    navigate("/");
    setIsLoggedIn(false);
  };

  const LandingPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/home")}
        >
          Профиль
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/publictracks")}
        >
          Опубликованные
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/favorite")}
        >
          Избранные
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/statistic")}
        >
          Статистика
        </a>
      ),
    },
    {
      key: "5",
      danger: true,
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          Выход
        </a>
      ),
    },
  ];

  return (
    <nav className="navbar-container" id="navbar">
      <div className="nav-menu">
        <img src={logo} alt="Логотип" className="logo" onClick={LandingPage} />

        <div className="divMenu">
          {isLoggedIn ? (
            <>
              <NavLink to="/home" className="navbar-link">
                Профиль
              </NavLink>
              <NavLink to="/feed" className="navbar-link">
                Треки
              </NavLink>
              <NavLink to="/composers" className="navbar-link">
                Пользователи
              </NavLink>
              <NavLink to="/about" className="navbar-link">
                О нас
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/about" className="navbar-link">
                О нас
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="nav-btn">
        <Space wrap>
          {/* <Button shape="circle" onClick={changeTheme} id="themeButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
            </svg>
          </Button> */}
          {isLoggedIn ? (
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  type="primary"
                  icon={
                    <Avatar
                      src={
                        `https://localhost:7262/Files/avatar?iduser=` +
                        localStorage.getItem("userid")
                      }
                      size={25}
                      icon={<UserOutlined />}
                      style={{ marginBottom: "5px" }}
                    />
                  }
                >
                  {localStorage.getItem("user")}
                </Button>
              </a>
            </Dropdown>
          ) : (
            <>
              <AuthModal setIsLoggedIn={setIsLoggedIn}></AuthModal>
              <RegisterModal setIsLoggedIn={setIsLoggedIn}></RegisterModal>
            </>
          )}
        </Space>
      </div>
    </nav>
  );
}
