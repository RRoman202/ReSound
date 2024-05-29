import { Modal, Button, Form, Input, Checkbox, Spin, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
import axios from "axios";

interface Sequencer {
  idsequencer: string;
  setTemplates: (templates: []) => void;
}

const ModalCreateTemplate: React.FC<Sequencer> = ({
  idsequencer,
  setTemplates,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        // Get user ID from localStorage

        // Check if name is filled
        if (!values.name) {
          setIsLoading(false);
          // Display error message to the user
          console.error("Name is required!");
          error();
          return;
        }

        // Create sequencer with user ID
        fetch("https://localhost:7262/api/Sequencers/templates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ ...values, idSequencer: idsequencer }),
        })
          .then((response) => {
            if (response.ok) {
              // Success: Close modal, navigate, and show success message
              setIsModalOpen(false);
              getTemplates();

              // Add success message here (e.g., using a notification or toast)
            } else {
              // Error: Handle API error
              console.error("Error creating sequencer:", response.statusText);
              // Display error message to the user
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
        // Display validation errors to the user
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getTemplates = async () => {
    const response = await axios.get(
      `https://localhost:7262/api/Sequencers/templates?idsequencer=` +
        idsequencer
    );
    setTemplates(response.data);
  };

  const [mes, contextHolder] = message.useMessage();

  const error = () => {
    mes.open({
      type: "error",
      content: "Заполните все необходимые поля",
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Создать шаблон
      </Button>
      <Modal
        title="Создание шаблона"
        open={isModalOpen}
        okText="Создать"
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
              id="name"
              name="name"
              label="Название"
              rules={[{ required: true, message: "Введите название проекта!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ModalCreateTemplate;
