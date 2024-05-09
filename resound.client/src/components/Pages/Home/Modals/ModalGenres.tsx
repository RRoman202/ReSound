import { Modal, Button, Form, Input, Checkbox, Spin } from "antd";
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

const ModalGenres: React.FC<UserModalProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedgenres, setSelectedGenres] = useState<string[]>([]);

  const navigate = useNavigate();

  const fetchGenres = async () => {
    const response = await axios.get(`https://localhost:7262/Tracks/genres`);
    setGenres(response.data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeGenres = async (idgenre: string) => {
    let selgen = selectedgenres;
    if (selgen.includes(idgenre)) {
      selgen = selgen.filter((name) => name !== idgenre);
    } else {
      selgen.push(idgenre);
    }

    console.log(selectedgenres);
  };

  return (
    <>
      <Button style={{ marginLeft: "40px" }} type="primary" onClick={showModal}>
        Добавить жанр
      </Button>
      <Modal
        title="Добавление жанров"
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
          genres.map((genre) => (
            <Checkbox
              onChange={(e) => changeGenres(e.target.value)}
              key={genre.idGenre}
              value={genre.idGenre}
            >
              {genre.name}
            </Checkbox>
          ))
        )}
      </Modal>
    </>
  );
};

export default ModalGenres;
