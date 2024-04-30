import { Modal, Button, Form, Input, Checkbox, Spin } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
import axios from "axios";

type FieldType = {
  name?: string;
  description?: string;
  private?: boolean;
};

interface SequencerModalProps {
  setSequencers: (sequencers: []) => void;
}

const ModalChooseSound: React.FC<SequencerModalProps> = ({ setSequencers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        // Get user ID from localStorage
        const userId = localStorage.getItem("userid");

        // Check if name is filled
        if (!values.name) {
          setIsLoading(false);
          // Display error message to the user
          console.error("Name is required!");
          return;
        }

        // Create sequencer with user ID
        fetch("https://localhost:7262/api/Sequencers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, idUser: userId }),
        })
          .then((response) => {
            if (response.ok) {
              // Success: Close modal, navigate, and show success message
              setIsModalOpen(false);
              getSequencers();

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

  const getSequencers = async () => {
    const responseSequencers = await axios.get(
      "https://localhost:7262/api/Sequencers?iduser=" +
        localStorage.getItem("userid")
    );
    console.log(responseSequencers.data);
    setSequencers(responseSequencers.data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
      ></Button>
      <Modal
        title="Создание проекта"
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

            <Form.Item
              name="description"
              id="description"
              label="Описание"
              rules={[{ required: false }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              id="private"
              name="private"
              valuePropName="checked"
              wrapperCol={{ offset: 2, span: 16 }}
            >
              <Checkbox>Приватность</Checkbox>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ModalChooseSound;
