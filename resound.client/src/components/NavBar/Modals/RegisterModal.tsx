import React, { useState } from "react";
import { Modal, Button, Space, Spin, message } from "antd";
import { Form, Input } from "antd";
import { getUser } from "../FetchData/GetUser";

interface AuthModalProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const RegisterModal: React.FC<AuthModalProps> = ({ setIsLoggedIn }) => {
  const url = "https://localhost:7262/Users/register";
  const urlLogin = "https://localhost:7262/Users/login";
  const [spinning, setSpinning] = React.useState(false);
  const [isVisible, onCancel] = useState(false);

  const addUser = async () => {
    setSpinning(true);
    const nameUser = document.querySelector("#regname")!.value;
    const emailUser = document.querySelector("#regemail")!.value;
    const passwordUser = document.querySelector("#regpassword")!.value;

    const newUser = {
      login: nameUser,
      email: emailUser,
      password: passwordUser,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newUser),
    };
    const result = await fetch(url, options);

    if (result.ok) {
      setAuthModal(false);
    } else {
      const errorResponse = await result.text();
      error(errorResponse);
    }

    const loginUser = {
      login: nameUser,
      password: passwordUser,
    };

    const headersLogin = new Headers();
    headersLogin.set("Content-Type", "application/json");

    const optionsLogin = {
      method: "POST",
      headers: headersLogin,
      body: JSON.stringify(loginUser),
    };
    const resultLogin = await fetch(urlLogin, optionsLogin);

    if (resultLogin.ok) {
      const token = await resultLogin.text();
      localStorage.setItem("user", loginUser.login);

      console.log(token);
      localStorage.setItem("token", token);
      setAuthModal(false);
      setIsLoggedIn(true);

      await getUser(token);
    }
    setSpinning(false);
  };

  const [isAuthModal, setAuthModal] = useState(isVisible);

  const showAuthModal = () => {
    setAuthModal(true);
  };

  const handleCancel = () => {
    setAuthModal(false);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const error = (error_text: string) => {
    messageApi.open({
      type: "error",
      content: error_text,
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={showAuthModal}>Зарегистрироваться</Button>
      <Modal
        title="Регистрация"
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
              name="regname"
              rules={[
                {
                  required: true,
                  message: "Введите логин",
                },
              ]}
            >
              <Input id="regname" placeholder="Логин"></Input>
            </Form.Item>
            <Form.Item
              label="Email"
              name="regemail"
              rules={[
                {
                  required: true,
                  message: "Введите email",
                },
              ]}
            >
              <Input id="regemail" placeholder="Email"></Input>
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="regpassword"
              rules={[
                {
                  required: true,
                  message: "Введите пароль",
                },
              ]}
            >
              <Input.Password id="regpassword" placeholder="Пароль" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Space wrap>
                <Button type="primary" htmlType="submit">
                  Зарегистрироваться
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

export default RegisterModal;
