import { Modal, Button, Form, Input, Checkbox, Spin } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { hideNav, viewNav } from "../../MainTrack/HiddenNavbar";
import axios from "axios";
import ModalGenres from "./ModalGenres";

type FieldType = {
  name?: string;
  description?: string;
  private?: boolean;
};

interface SequencerModalProps {
  setSequencers: (sequencers: []) => void;
  setFilteredSequencers: (sequencers: []) => void;
}

const ModalChooseSound: React.FC<SequencerModalProps> = ({
  setSequencers,
  setFilteredSequencers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
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

        fetch("https://localhost:7262/api/Sequencers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ ...values, idUser: userId }),
        })
          .then(async (response) => {
            if (response.ok) {
              // Success: Close modal, navigate, and show success message
              setIsModalOpen(false);
              getSequencers();
              const data = await response.json();
              if (values.photo) {
                await changeCover(data.idSequencer);
              }

              // if (values.photo) {
              //   changeCover(response);
              // }

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

  const changeCover = async (idsequencer: string) => {
    const blob = file.slice(0, file.size, file.type);
    console.log(blob);
    const formData = new FormData();
    formData.append("coverFile", blob, file.name);
    formData.append("idsequencer", idsequencer);
    const response = await axios.post(
      "https://localhost:7262/Users/upload-cover",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    window.location.reload();
  };

  const getSequencers = async () => {
    const responseSequencers = await axios.get(
      "https://localhost:7262/api/Sequencers?iduser=" +
        localStorage.getItem("userid")
    );
    console.log(responseSequencers.data);
    setSequencers(responseSequencers.data);
    setFilteredSequencers(responseSequencers.data);
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

            <Form.Item id="photo" name="photo" label="Обложка">
              <Input
                type="file"
                accept=".png"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                value={""}
              ></Input>
            </Form.Item>

            {/* <ModalGenres></ModalGenres> */}

            <Form.Item
              id="private"
              name="private"
              valuePropName="checked"
              initialValue={true}
              wrapperCol={{ offset: 2, span: 16 }}
              hidden
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
