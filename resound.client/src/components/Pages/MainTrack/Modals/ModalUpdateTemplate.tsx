import { Modal, Button, Form, Input, Checkbox, Spin } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
import axios from "axios";
import { Volume } from "tone";

interface Sequencer {
  idtemplate: string;
  idsequencer: string;
  setTemplates: (templates: []) => void;
}

const ModalUpdateTemplate: React.FC<Sequencer> = ({
  setTemplates,
  idtemplate,
  idsequencer,
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
        if (!values.name) {
          setIsLoading(false);
          console.error("Name is required!");
          return;
        }

        fetch("https://localhost:7262/api/Sequencers/template", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            IdTemplate: idtemplate,
            name: values.name,
            Volume: templateData.volume,
            notes: templateData.notes,
            IdSound: templateData.idSound,
          }),
        })
          .then((response) => {
            if (response.ok) {
              setIsModalOpen(false);
              getTemplates();
            } else {
              console.error("Error creating sequencer:", response.statusText);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
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

  const [templateData, setTemplateData] = useState<Template | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await axios.get(
        `https://localhost:7262/api/Sequencers/template?id=${idtemplate}`
      );
      setTemplateData(response.data);
    };

    fetchTemplate();
  }, [idtemplate]);

  if (!templateData) {
    return;
  }

  return (
    <>
      <a type="primary" onClick={showModal}>
        Редактировать
      </a>
      <Modal
        title="Редатирование шаблона"
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
              id="name"
              name="name"
              label="Название"
              initialValue={templateData.name}
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

export default ModalUpdateTemplate;
