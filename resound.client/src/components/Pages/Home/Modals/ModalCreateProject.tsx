import { Modal, Button, Form, Input, Checkbox, Spin } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
const { TextArea } = Input;

type FieldType = {
  name?: string;
  description?: string;
  isprivate?: boolean;
};

function ModalChooseSound() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    setIsModalOpen(false);
    hideNav();
    navigate("/main");
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
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Название"
              name="name"
              rules={[{ required: true, message: "Введите название проекта!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Описание"
              name="description"
              rules={[{ required: false }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item<FieldType>
              name="isprivate"
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
}

export default ModalChooseSound;
