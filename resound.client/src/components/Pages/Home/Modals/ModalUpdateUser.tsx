import { Modal, Button, Form, Input, Checkbox, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
import axios from "axios";
import { getUser } from "../../../NavBar/FetchData/GetUser";

type FieldType = {
  name?: string;
  description?: string;
  private?: boolean;
};

interface UserModalProps {
  userlogin: string;
}

const ModalUpdateUser: React.FC<UserModalProps> = ({ userlogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const changeAvatar = async () => {
    const blob = file.slice(0, file.size, file.type);
    console.log(blob);
    const formData = new FormData();
    formData.append("avatarFile", blob, file.name);
    formData.append("iduser", localStorage.getItem("userid")!);
    const response = await axios.post(
      "https://localhost:7262/Users/upload-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleOk = async () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (!values.login) {
          setIsLoading(false);
          console.error("Name is required!");
          error();
          return;
        }
        if (values.photo) {
          await changeAvatar();
        }

        const response = await fetch("https://localhost:7262/Users/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...values,
            idUser: localStorage.getItem("userid"),
          }),
        });

        if (response.ok) {
          setIsModalOpen(false);
          getUser(localStorage.getItem("token")!);
        } else {
          console.error("Error creating sequencer:", response.statusText);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const [mes, contextHolder] = message.useMessage();

  const error = () => {
    mes.open({
      type: "error",
      content: "Заполните все необходимые поля",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <a type="primary" onClick={showModal}>
        Редактировать
      </a>
      <Modal
        title="Редактирование профиля"
        open={isModalOpen}
        okText="Применить"
        cancelText="Отмена"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              id="login"
              name="login"
              label="Логин"
              initialValue={userlogin}
              rules={[{ required: true, message: "Введите логин!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item id="photo" name="photo" label="Аватар">
              <Input
                type="file"
                accept=".png"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              ></Input>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
