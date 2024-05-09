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

interface SequencerModalProps {
  setSequencers: (sequencers: []) => void;
  setFilteredSequencers: (sequencers: []) => void;
  idsequencer: string;
}

const ModalGenres: React.FC<SequencerModalProps> = ({ idsequencer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedgenres, setSelectedGenres] = useState<string[]>([]);

  const navigate = useNavigate();

  const fetchGenres = async () => {
    const response = await axios.get(`https://localhost:7262/Tracks/genres`);
    setGenres(response.data);
  };

  const postGenre = async () => {
    const formData = new FormData();

    selectedgenres.forEach((genre) => formData.append("genres", genre));
    formData.append("idsequencer", "9dcbe82d-cfc0-4198-9962-b05050f45218");
    const response = await axios.post(
      "https://localhost:7262/Tracks/seq-genre",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    await postGenre();
    setIsLoading(false);
    setIsModalOpen(false);
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
