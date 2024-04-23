import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Space, Spin, message } from "antd";
import { Form, Input } from "antd";
import { useStore } from "zustand";
import RegisterModal from "./RegisterModal";
import { getUser } from "../FetchData/GetUser";
import App from "../../../App";

interface AuthModalProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const rootElement = document.getElementById("root");

const AuthModal: React.FC<AuthModalProps> = ({ setIsLoggedIn }) => {
  const url = "https://localhost:7262/Users/login";
  const [spinning, setSpinning] = React.useState(false);
  const [isVisible, onCancel] = useState(false);
  const navigate = useNavigate();

  const addUser = async () => {
    setSpinning(true);
    const nameUser = document.querySelector("#logname").value;
    const passwordUser = document.querySelector("#logpassword").value;

    const newUser: { login: string; password: string } = {
      login: nameUser,
      password: passwordUser,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newUser),
    };
    const result = await fetch(url, options);

    if (result.ok) {
      const token = await result.text();
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", newUser.login);
      localStorage.setItem("userfull", JSON.stringify(newUser));
      setAuthModal(false);
      setIsLoggedIn(true);

      await getUser(token);

      navigate("/home");
    } else {
      const errorResponse = await result.text();
      error(errorResponse);
    }
    setSpinning(false);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const error = (error_text: string) => {
    messageApi.open({
      type: "error",
      content: error_text,
    });
  };

  const [isAuthModal, setAuthModal] = useState(isVisible);

  const showAuthModal = () => {
    setAuthModal(true);
  };

  const handleCancel = () => {
    setAuthModal(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" className="auth-button" onClick={showAuthModal}>
        Войти
      </Button>
      <Modal
        title="Вход"
        open={isAuthModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Form
            onFinish={addUser}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Логин"
              name="logname"
              rules={[
                {
                  required: true,
                  message: "Введите логин",
                },
              ]}
            >
              <Input id="logname" placeholder="Логин"></Input>
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="logpassword"
              rules={[
                {
                  required: true,
                  message: "Введите пароль",
                },
              ]}
            >
              <Input.Password id="logpassword" placeholder="Пароль" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Space wrap>
                <Button type="primary" htmlType="submit">
                  Войти
                </Button>
                <Spin spinning={spinning} />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
